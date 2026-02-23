import { NextRequest, NextResponse } from 'next/server';
import { getSQL } from '@/lib/neon';

const VALID_STATUSES = ['not_started', 'scheduled', 'posted'];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sql = getSQL();
  if (!sql) {
    return NextResponse.json({ ok: true, source: 'none' });
  }

  const { id } = await params;
  const postId = parseInt(id);
  if (isNaN(postId)) {
    return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
  }

  const body = await request.json();
  const { status, postedAt } = body;

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    await sql`
      INSERT INTO post_state (post_id, status, posted_at, updated_at)
      VALUES (${postId}, ${status}, ${postedAt ?? null}, NOW())
      ON CONFLICT (post_id) DO UPDATE SET
        status = ${status},
        posted_at = ${postedAt ?? null},
        updated_at = NOW()
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`PATCH /api/posts/${postId}/status failed:`, err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
