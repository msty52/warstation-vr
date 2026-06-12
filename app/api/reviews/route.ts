import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await sql`SELECT * FROM reviews ORDER BY created_at DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { name, message, date, file_url } = await req.json();
  await sql`INSERT INTO reviews (name, message, date, file_url) VALUES (${name}, ${message}, ${date}, ${file_url})`;
  return NextResponse.json({ success: true });
}
