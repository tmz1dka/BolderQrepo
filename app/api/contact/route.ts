import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
      return NextResponse.json(
        { message: "Email is not configured on the server." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Bålder Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "New Contact Form Submission",
      text: [
        "You received a new message from your website:",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "Message:",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 });
  }
}
