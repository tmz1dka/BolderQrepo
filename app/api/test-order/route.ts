import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

const ordersPath = path.join(process.cwd(), "orders.json");

const isAuthorized = (headers: Headers) => {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) return false;
  const bearer = headers.get("authorization") || "";
  const token = bearer.startsWith("Bearer ") ? bearer.slice(7) : bearer;
  return token === adminKey;
};

async function saveOrder(order: any) {
  const existing = await fs.readFile(ordersPath, "utf8").catch(() => "[]");
  const parsed = JSON.parse(existing || "[]");
  parsed.push(order);
  await fs.writeFile(ordersPath, JSON.stringify(parsed, null, 2), "utf8");
}

async function notify(order: any) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const lines = (order.items || [])
    .map((i: any) => `- ${i.name} x${i.quantity || 1} (€${Number(i.amount || 0).toFixed(2)})`)
    .join("\n");

  const text = [
    "Test order (manual trigger):",
    `Id: ${order.id}`,
    `Name: ${order.customer?.name || "N/A"}`,
    `Email: ${order.customer?.email || "N/A"}`,
    `Phone: ${order.customer?.phone || "N/A"}`,
    "Items:",
    lines || "- none",
    `Total: €${Number(order.total || 0).toFixed(2)}`,
  ].join("\n");

  await transporter.sendMail({
    from: `"Bålder Orders" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: "Test order notification",
    text,
  });
}

export async function POST(request: Request) {
  if (!isAuthorized(request.headers)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { customer, items = [], total = 0 } = await request.json();
  const order = {
    id: `test-${Date.now()}`,
    created: new Date().toISOString(),
    customer,
    items,
    total,
  };

  try {
    await saveOrder(order);
    await notify(order);
    return NextResponse.json({ message: "Test order logged and email sent (if configured)", order });
  } catch (err) {
    console.error("Test order failed:", err);
    return NextResponse.json({ message: "Failed to log/send test order" }, { status: 500 });
  }
}
