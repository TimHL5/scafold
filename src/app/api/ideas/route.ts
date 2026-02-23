import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const ideas = await prisma.idea.findMany({
    where: { addedToQueue: false },
    orderBy: { id: 'asc' },
  });

  return NextResponse.json(ideas);
}
