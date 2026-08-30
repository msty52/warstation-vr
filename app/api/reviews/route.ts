import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const url = "https://yandex.ru/maps/org/67834229080/reviews/";
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 86400 }
    });

    const html = await res.text();
    const match = html.match(/<script class="state-view" type="application\/json">(.*?)<\/script>/);

    if (!match) {
      return NextResponse.json({ reviews: [] });
    }

    const state = JSON.parse(match[1]);
    const rawReviews = state?.stack?.[0]?.results?.items?.[0]?.reviews?.items || [];

    const reviews = rawReviews
      .map((r: any) => ({
        id: String(r.id),
        author: String(r.author?.name || 'Посетитель'),
        avatar: r.author?.avatarUrl ? String(r.author.avatarUrl) : null,
        rating: Number(r.rating || 5),
        text: String(r.text || ''),
      }))
      .filter((r: { text: string }) => r.text.trim().length > 0);

    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json({ reviews: [] }, { status: 500 });
  }
}
