import { NextResponse } from "next/server";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import mysql from "mysql2/promise";

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

const fileMap: Record<string, string> = {
  "Antonio Vivaldi - La Follia": "la-follia-full-score-and-parts.pdf",
  "Giya Kancheli - Instead of a Tango": "instead-of-a-tango-string-quartet-score.pdf",
  "Astor Piazzolla - Verano Porteño": "verano-score-and-parts.pdf",
  "Astor Piazzolla - Otoño Porteño": "otono-score-and-parts.pdf",
  "Astor Piazzolla - Invierno Porteño": "invierno-score-and-parts.pdf",
  "Astor Piazzolla - Primavera Porteña": "primavera-score-and-parts.pdf",
  "Astor Piazzolla - Las Cuatro Estaciones Porteñas":
    "astor-piazzolla-las-cuatro-estaciones-portenas-score-and-parts.pdf",
  "Test Item (Stripe Live Check)": "test.pdf",
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const itemName = searchParams.get("item");

  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 400 });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT payload_json, expires_at FROM order_tokens WHERE token = ? AND expires_at > NOW() LIMIT 1`,
      [token],
    );

    const record = Array.isArray(rows) && rows.length > 0 ? (rows as any)[0] : null;
    if (!record) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 404 });
    }

    let payload: any = {};
    try {
      if (typeof record.payload_json === "string") {
        payload = JSON.parse(record.payload_json || "{}");
      } else if (record.payload_json) {
        payload = record.payload_json;
      }
    } catch (err) {
      console.error("Failed to parse payload_json:", err);
      return NextResponse.json({ message: "Bad token payload" }, { status: 500 });
    }
    const items = (payload.items || []) as { name: string }[];

    // If no specific item requested, return links for all items
    if (!itemName) {
      const baseUrl = process.env.PUBLIC_URL || "http://localhost:3000";
      const downloads = items.map((i) => ({
        name: i.name,
        url: `${baseUrl}/api/download?token=${encodeURIComponent(token)}&item=${encodeURIComponent(
          i.name,
        )}`,
      }));
      return NextResponse.json({ downloads });
    }

    // Serve specific item
    const match = items.find((i) => i.name === itemName);
    if (!match) {
      return NextResponse.json({ message: "Item not found for this token" }, { status: 404 });
    }

    const filename = fileMap[itemName];
    if (!filename) {
      return NextResponse.json({ message: "File not mapped for this item" }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), "private-scores", filename);
    try {
      await fsp.access(filePath, fs.constants.R_OK);
    } catch {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    const fileStream = fs.createReadStream(filePath);
    return new Response(fileStream as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${path.basename(filePath)}"`,
      },
    });
  } catch (err) {
    console.error("Download token lookup failed:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
