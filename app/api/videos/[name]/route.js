import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { name } = params;

  const blobBaseUrl = 'https://vrkocy2a64g2eeg4.public.blob.vercel-storage.com'; 

  try {
    const response = await fetch(`${blobBaseUrl}/${name}`);
    if (!response.ok) return new NextResponse('Видео не найдено', { status: 404 });

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'video/mp4',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('Ошибка сети', { status: 500 });
  }
}
