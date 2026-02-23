import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase() || '';

  if (!q) {
    return NextResponse.json([]);
  }

  const posts = await prisma.post.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  const filtered = posts.filter(
    (p) =>
      p.body.toLowerCase().includes(q) ||
      p.postType.toLowerCase().includes(q) ||
      p.notes.toLowerCase().includes(q) ||
      p.hashtags.toLowerCase().includes(q) ||
      p.cta.toLowerCase().includes(q) ||
      p.hook.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q)
  );

  return NextResponse.json(filtered);
}
