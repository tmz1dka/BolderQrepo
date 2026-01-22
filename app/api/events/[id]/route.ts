import { NextResponse } from "next/server";

// Editing/deleting events is disabled; respond with 405 Method Not Allowed.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function DELETE() {
  return NextResponse.json({ message: "Event editing is disabled" }, { status: 405 });
}
