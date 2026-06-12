import { sql } from "./db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rows = await sql`SELECT name, message, date FROM reviews ORDER BY id DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Ошибка чтения из базы данных Neon" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, message, date } = await req.json();
    await sql`INSERT INTO reviews (name, message, date) VALUES (${name}, ${message}, ${date})`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка записи в базу данных Neon" }, { status: 500 });
  }
}
