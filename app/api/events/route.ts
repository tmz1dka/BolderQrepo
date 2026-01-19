import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const EVENTS_PATH = path.join(process.cwd(), "events.json");
const isAdmin = (headers: Headers) => {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) return false;
  const bearer = headers.get("authorization") || "";
  const token = bearer.startsWith("Bearer ") ? bearer.slice(7) : headers.get("x-admin-key");
  return token === adminKey;
};

const readEvents = async () => {
  try {
    const raw = await fs.readFile(EVENTS_PATH, "utf8");
    return JSON.parse(raw) as any[];
  } catch {
    return [];
  }
};

const writeEvents = async (events: any[]) => {
  await fs.writeFile(EVENTS_PATH, JSON.stringify(events, null, 2), "utf8");
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const events = await readEvents();
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  if (!isAdmin(request.headers)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, date, time, location, description } = await request.json();
  if (!title || !date || !time || !location || !description) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const events = await readEvents();
  const event = {
    id: Date.now().toString(),
    title,
    date,
    time,
    location,
    description,
  };

  events.push(event);
  await writeEvents(events);

  return NextResponse.json({ message: "Event added", event });
}
