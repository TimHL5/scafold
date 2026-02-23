import { NextResponse } from 'next/server';
import { getSQL } from '@/lib/neon';

export async function GET() {
  const sql = getSQL();
  if (!sql) {
    return NextResponse.json({ states: {}, source: 'none' });
  }

  try {
    const rows = await sql`SELECT post_id, status, posted_at, notes FROM post_state`;
    const states: Record<number, { status: string; postedAt: string | null; notes: string }> = {};
    for (const row of rows) {
      states[row.post_id] = {
        status: row.status,
        postedAt: row.posted_at,
        notes: row.notes,
      };
    }
    return NextResponse.json({ states, source: 'db' });
  } catch (err) {
    console.error('GET /api/posts/state failed:', err);
    return NextResponse.json({ states: {}, source: 'error' }, { status: 500 });
  }
}
