'use client';

import { Post, StatusType } from '@/lib/types';
import PlatformBadge from './PlatformBadge';
import CopyButton from './CopyButton';
import StatusBadge from './StatusBadge';

interface CalendarDay {
  date: string;
  posts: Post[];
}

function parseDate(dateStr: string): Date | null {
  // Handle "Feb 22", "Mar 1", "Mar 15-28" etc.
  const clean = dateStr.split('-')[0].trim();
  const match = clean.match(/^(\w+)\s+(\d+)$/);
  if (!match) return null;
  const [, month, day] = match;
  const monthMap: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const m = monthMap[month];
  if (m === undefined) return null;
  return new Date(2025, m, parseInt(day));
}

export default function CalendarView({
  posts,
  onStatusChange,
}: {
  posts: Post[];
  onStatusChange: (id: number, status: StatusType) => void;
}) {
  // Group posts by date
  const grouped: Record<string, Post[]> = {};
  posts.forEach((p) => {
    const key = p.date;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  });

  // Sort dates
  const sortedDates = Object.keys(grouped).sort((a, b) => {
    const da = parseDate(a);
    const db = parseDate(b);
    if (!da || !db) return 0;
    return da.getTime() - db.getTime();
  });

  const days: CalendarDay[] = sortedDates.map((date) => ({
    date,
    posts: grouped[date],
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {days.map((day) => (
        <div
          key={day.date}
          className="bg-card border border-border-subtle rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary">{day.date}</h3>
            <div className="flex gap-1">
              {day.posts.map((p) => (
                <span
                  key={p.id}
                  className={`w-2 h-2 rounded-full ${
                    p.platform === 'LinkedIn' ? 'bg-platform-linkedin' : 'bg-platform-instagram'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {day.posts.map((post) => (
              <div
                key={post.id}
                className={`p-3 rounded bg-bg border border-border-subtle ${
                  post.status === 'posted' ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <StatusBadge
                    status={post.status as StatusType}
                    onChange={(s) => onStatusChange(post.id, s)}
                  />
                  <PlatformBadge platform={post.platform} />
                </div>
                <p className="text-xs font-medium text-text-primary mb-1.5">
                  {post.postType}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-text-tertiary">{post.author}</span>
                  <CopyButton text={post.body} label="Copy" className="!text-xs !px-2 !py-0.5 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
