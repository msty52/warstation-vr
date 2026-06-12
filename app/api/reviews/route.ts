import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

  const rows = await sql`SELECT name, message, date FROM reviews ORDER BY created_at DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { name, message, date } = await req.json();

  await sql`INSERT INTO reviews (name, message, date) VALUES (${name}, ${message}, ${date})`;
  return NextResponse.json({ success: true });
}
