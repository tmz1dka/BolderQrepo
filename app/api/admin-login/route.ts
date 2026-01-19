import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD &&
    process.env.ADMIN_KEY
  ) {
    return NextResponse.json({ success: true, adminKey: process.env.ADMIN_KEY });
  }

  return NextResponse.json({ success: false, message: "Invalid login" }, { status: 401 });
}
