import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { notes } = await request.json();
  const id = parseInt(params.id);

  const post = await prisma.post.update({
    where: { id },
    data: { notes },
  });

  return NextResponse.json(post);
}
