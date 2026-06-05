import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { name } = params;
  const blobBaseUrl = 'https://vrkocy2a64g2eeg4.public.blob.vercel-storage.com';

  let response = await fetch(`${blobBaseUrl}/${name}`);

  if (!response.ok && name.endsWith('.mp4')) {
    const uppercaseName = name.replace('.mp4', '.MP4');
    response = await fetch(`${blobBaseUrl}/${uppercaseName}`);
  }

  if (!response.ok && name.endsWith('.mp4')) {
    const movName = name.replace('.mp4', '.MOV');
    response = await fetch(`${blobBaseUrl}/${movName}`);
  }

  if (!response.ok) {
    return new NextResponse('Видео не найдено в Vercel Blob', { status: 404 });
  }

  return new NextResponse(response.body, {
    headers: {
      'Content-Type': 'video/mp4',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
