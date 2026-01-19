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

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAdmin(_request.headers)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const events = await readEvents();
  const next = events.filter((ev) => ev.id !== params.id);

  if (next.length === events.length) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }

  await writeEvents(next);
  return NextResponse.json({ message: "Event deleted" });
}
