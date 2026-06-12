import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT name, message, COALESCE(rating, 5) as rating, to_char(created_at, 'DD.MM.YYYY') as date 
      FROM reviews 
      ORDER BY created_at DESC
    `);
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error("Ошибка Neon GET:", error.message);
    return NextResponse.json({ error: `Ошибка БД: ${error.message}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, message, rating } = await request.json();

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
    }

    const cleanRating = Math.max(1, Math.min(5, Number(rating) || 5));

    await pool.query(
      "INSERT INTO reviews (name, message, rating) VALUES ($1, $2, $3)",
      [name.trim(), message.trim(), cleanRating]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error("Ошибка Neon POST:", error.message);
    return NextResponse.json({ error: `Ошибка записи: ${error.message}` }, { status: 500 });
  }
}
