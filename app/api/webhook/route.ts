import Stripe from "stripe";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mysql from "mysql2/promise";
import crypto from "crypto";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  // Azure MySQL requires SSL; using permissive verify for now. Switch to CA-based verify in production.
  ssl: { rejectUnauthorized: false },
};

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 5,
});

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function saveOrderToDb(order: {
  sessionId: string;
  customerName?: string | null;
  customerEmail?: string | null;
  customerPhone?: string | null;
  total: number;
  currency: string;
  items: { name: string; quantity: number; amount: number }[];
}) {
  const itemsJson = JSON.stringify(order.items || []);
  await pool.execute(
    `INSERT INTO orders
      (session_id, customer_name, customer_email, customer_phone, total, currency, line_items_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      order.sessionId,
      order.customerName || null,
      order.customerEmail || null,
      order.customerPhone || null,
      order.total,
      order.currency,
      itemsJson,
    ],
  );
}

async function sendOrderEmail(order: {
  sessionId: string;
  customerName?: string | null;
  customerEmail?: string | null;
  customerPhone?: string | null;
  total: number;
  items: { name: string; quantity: number; amount: number }[];
  downloadLinks?: { name: string; url: string }[];
}) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const lines = order.items
    .map((i) => `- ${i.name} x${i.quantity} (€${(i.amount || 0).toFixed(2)})`)
    .join("\n");

  const downloadLines = (order.downloadLinks || [])
    .map((d) => `- ${d.name}: ${d.url}`)
    .join("\n");

  const text = [
    "New order received:",
    `Session: ${order.sessionId}`,
    `Name: ${order.customerName || "N/A"}`,
    `Email: ${order.customerEmail || "N/A"}`,
    `Phone: ${order.customerPhone || "N/A"}`,
    "Items:",
    lines || "- No items found",
    `Total: €${order.total.toFixed(2)}`,
    downloadLines ? "Downloads:\n" + downloadLines : "",
  ].join("\n");

  const recipients = [process.env.EMAIL_TO];
  if (order.customerEmail) {
    recipients.push(order.customerEmail);
  }

  await transporter.sendMail({
    from: `"Bålder Orders" <${process.env.EMAIL_USER}>`,
    to: recipients.join(","),
    subject: "Your score order",
    text,
  });
}

export async function POST(request: Request) {
  if (!stripeSecret || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 500 });
  }

  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  const stripe = new Stripe(stripeSecret, { apiVersion: "2025-11-17.clover" });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items", "line_items.data.price.product"],
      });

      const items =
        fullSession.line_items?.data.map((item) => ({
          name:
            (item.price?.product as Stripe.Product | undefined)?.name ??
            item.description ??
            "Item",
          quantity: item.quantity ?? 1,
          amount: item.amount_total ? item.amount_total / 100 : 0,
        })) ?? [];

      const total = fullSession.amount_total ? fullSession.amount_total / 100 : 0;
      const currency = fullSession.currency || "eur";
      const customerEmail = fullSession.customer_details?.email ?? session.customer_email;
      const customerName = fullSession.customer_details?.name;
      const customerPhone = fullSession.customer_details?.phone;

      const orderRecord = {
        sessionId: session.id,
        customerName,
        customerEmail,
        customerPhone,
        items,
        total,
        currency,
      };

      // Generate a token for downloads (stored and emailed)
      const token = crypto.randomBytes(24).toString("hex");
      const baseUrl = process.env.PUBLIC_URL || "http://localhost:3000";
      const downloadLink = `${baseUrl}/api/download?token=${token}`;
      const downloadLinks = items.map((i) => ({
        name: i.name,
        url: `${baseUrl}/api/download?token=${token}&item=${encodeURIComponent(i.name)}`,
      }));

      try {
        await saveOrderToDb(orderRecord);
        await pool.execute(
          `INSERT INTO order_tokens (session_id, token, payload_json, expires_at, created_at)
           VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 3 DAY), NOW())`,
          [session.id, token, JSON.stringify({ items }),]
        );
      } catch (err) {
        console.error("Failed to write order to MySQL:", err);
      }

      try {
        await sendOrderEmail({ ...orderRecord, downloadLinks });
      } catch (err) {
        console.error("Failed to send order email:", err);
      }

      console.log("✅ Logged order and notified for session:", session.id);
    } catch (err) {
      console.error("Error handling completed session:", err);
    }
  }

  return NextResponse.json({ received: true });
}
