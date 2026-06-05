import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { name } = params;
  const blobBaseUrl = 'https://vrkocy2a64g2eeg4.public.blob.vercel-storage.com';

  let realFileName = name;

  if (name.toLowerCase() === 'img_5856.mp4') realFileName = 'IMG_5856.mp4';
  if (name.toLowerCase() === 'img_5712.mp4') realFileName = 'IMG_5712.MP4';
  if (name.toLowerCase() === 'img_6206.mp4') realFileName = 'IMG_6206.mp4';
  if (name.toLowerCase() === 'img_6207.mp4') realFileName = 'IMG_6207.MP4';

  return NextResponse.redirect(`${blobBaseUrl}/${realFileName}`, 307);
}
