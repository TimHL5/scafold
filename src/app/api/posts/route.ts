import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const author = searchParams.get('author');
  const platform = searchParams.get('platform');
  const status = searchParams.get('status');
  const week = searchParams.get('week');

  const where: Record<string, string> = {};
  if (author && author !== 'all') where.author = author;
  if (platform && platform !== 'all') where.platform = platform;
  if (status && status !== 'all') where.status = status;
  if (week && week !== 'all') where.week = week;

  const posts = await prisma.post.findMany({
    where,
    orderBy: { sortOrder: 'asc' },
  });

  return NextResponse.json(posts);
}
