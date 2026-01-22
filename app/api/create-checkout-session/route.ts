import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const currency = process.env.CURRENCY || "eur";
const publicUrl = process.env.PUBLIC_URL || "http://localhost:3000";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!stripeSecret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: "2025-11-17.clover" });

  try {
    const { customer, cart } = await request.json();

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const line_items = cart.map((item: any) => ({
      price_data: {
        currency,
        product_data: { name: item.name },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity ? Number(item.quantity) : 1,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "mobilepay", "p24", "eps", "ideal"],
      line_items,
      customer_email: customer?.email || undefined,
      phone_number_collection: { enabled: true },
      metadata: {
        customer_name: customer?.name || "",
        customer_phone: customer?.phone || "",
      },
      success_url: `${publicUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${publicUrl}/cancel`,
      automatic_tax: { enabled: false },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Create session error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
