import { NextRequest, NextResponse } from 'next/server';
import { getSQL } from '@/lib/neon';

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
  const { notes } = body;

  if (typeof notes !== 'string') {
    return NextResponse.json({ error: 'Notes must be a string' }, { status: 400 });
  }

  try {
    await sql`
      INSERT INTO post_state (post_id, notes, updated_at)
      VALUES (${postId}, ${notes}, NOW())
      ON CONFLICT (post_id) DO UPDATE SET
        notes = ${notes},
        updated_at = NOW()
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`PATCH /api/posts/${postId}/notes failed:`, err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
