import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { status } = await request.json();
  const id = parseInt(params.id);

  if (!['not_started', 'scheduled', 'posted'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      status,
      postedAt: status === 'posted' ? new Date().toISOString() : null,
    },
  });

  return NextResponse.json(post);
}
