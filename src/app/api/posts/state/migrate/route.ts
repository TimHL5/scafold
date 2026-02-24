import { NextRequest, NextResponse } from 'next/server';
import { getSQL } from '@/lib/neon';

export async function POST(request: NextRequest) {
  const sql = getSQL();
  if (!sql) {
    return NextResponse.json({ ok: false, reason: 'no database' }, { status: 503 });
  }

  const body = await request.json();
  const { states } = body as {
    states: Record<string, { status: string; postedAt: string | null; notes: string }>;
  };

  if (!states || typeof states !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const VALID_STATUSES = ['not_started', 'scheduled', 'posted'];

  try {
    // Loop runs once per post; acceptable for bounded dataset (~50 posts max)
    for (const [idStr, state] of Object.entries(states)) {
      const postId = parseInt(idStr);
      if (isNaN(postId)) continue;
      if (!VALID_STATUSES.includes(state.status)) continue;
      await sql`
        INSERT INTO post_state (post_id, status, posted_at, notes, updated_at)
        VALUES (${postId}, ${state.status}, ${state.postedAt ?? null}, ${state.notes}, NOW())
        ON CONFLICT (post_id) DO UPDATE SET
          status = EXCLUDED.status,
          posted_at = EXCLUDED.posted_at,
          notes = EXCLUDED.notes,
          updated_at = NOW()
      `;
    }
    return NextResponse.json({ ok: true, migrated: Object.keys(states).length });
  } catch (err) {
    console.error('POST /api/posts/state/migrate failed:', err);
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
  }
}
