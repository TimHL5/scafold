import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const author = searchParams.get('author');

  const where: Record<string, string> = {};
  if (author && author !== 'all') where.author = author;

  const [total, posted, scheduled] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.count({ where: { ...where, status: 'posted' } }),
    prisma.post.count({ where: { ...where, status: 'scheduled' } }),
  ]);

  const nextUp = await prisma.post.findFirst({
    where: { ...where, status: { not: 'posted' } },
    orderBy: { sortOrder: 'asc' },
  });

  return NextResponse.json({
    total,
    posted,
    scheduled,
    notStarted: total - posted - scheduled,
    nextUp,
  });
}
