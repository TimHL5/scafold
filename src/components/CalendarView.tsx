'use client';

import { useState } from 'react';
import { Post, StatusType } from '@/lib/types';
import PlatformBadge from './PlatformBadge';
import CopyButton from './CopyButton';
import StatusBadge from './StatusBadge';

function parseDate(dateStr: string): Date | null {
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

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function getMonthKey(date: string): string {
  const parsed = parseDate(date);
  if (!parsed) return '';
  return `${parsed.getFullYear()}-${parsed.getMonth()}`;
}

export default function CalendarView({
  posts,
  onStatusChange,
}: {
  posts: Post[];
  onStatusChange: (id: number, status: StatusType) => void;
}) {
  // Find all months that have posts
  const monthSet = new Set<string>();
  posts.forEach((p) => {
    const key = getMonthKey(p.date);
    if (key) monthSet.add(key);
  });
  const months = Array.from(monthSet).sort();
  const initialMonth = months[0] || '2025-1';

  const [activeMonth, setActiveMonth] = useState(initialMonth);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [yearStr, monthStr] = activeMonth.split('-');
  const year = parseInt(yearStr);
  const month = parseInt(monthStr);
  const cells = getMonthGrid(year, month);

  const currentMonthIdx = months.indexOf(activeMonth);
  const canPrev = currentMonthIdx > 0;
  const canNext = currentMonthIdx < months.length - 1;

  // Group posts by day number for this month
  const postsByDay: Record<number, Post[]> = {};
  posts.forEach((p) => {
    const parsed = parseDate(p.date);
    if (!parsed) return;
    if (parsed.getFullYear() === year && parsed.getMonth() === month) {
      const day = parsed.getDate();
      if (!postsByDay[day]) postsByDay[day] = [];
      postsByDay[day].push(p);
    }
  });

  // For range dates like "Mar 15-28", also parse end and fill in
  posts.forEach((p) => {
    const rangeMatch = p.date.match(/^(\w+)\s+(\d+)-(\d+)$/);
    if (!rangeMatch) return;
    const [, mo, startStr, endStr] = rangeMatch;
    const monthMap: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const m = monthMap[mo];
    if (m !== month) return;
    const start = parseInt(startStr);
    const end = parseInt(endStr);
    // Add to start day only (already handled), skip duplicates
    if (!postsByDay[start]?.includes(p)) {
      if (!postsByDay[start]) postsByDay[start] = [];
      postsByDay[start].push(p);
    }
    // Show indicator dot on end day too
    if (start !== end && !postsByDay[end]?.includes(p)) {
      if (!postsByDay[end]) postsByDay[end] = [];
      postsByDay[end].push(p);
    }
  });

  const dayPosts = selectedDay ? (postsByDay[selectedDay] || []) : [];

  return (
    <div className="space-y-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between bg-card border border-border-subtle rounded-lg px-4 py-3">
        <button
          onClick={() => { if (canPrev) { setActiveMonth(months[currentMonthIdx - 1]); setSelectedDay(null); } }}
          disabled={!canPrev}
          className={`p-1 rounded transition-colors ${canPrev ? 'text-text-secondary hover:text-white hover:bg-white/5' : 'text-text-tertiary/30 cursor-not-allowed'}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h3 className="text-sm font-semibold text-text-primary">
          {MONTH_NAMES[month]} {year}
        </h3>
        <button
          onClick={() => { if (canNext) { setActiveMonth(months[currentMonthIdx + 1]); setSelectedDay(null); } }}
          disabled={!canNext}
          className={`p-1 rounded transition-colors ${canNext ? 'text-text-secondary hover:text-white hover:bg-white/5' : 'text-text-tertiary/30 cursor-not-allowed'}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Calendar grid */}
      <div className="bg-card border border-border-subtle rounded-lg overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-border-subtle">
          {DAY_HEADERS.map((d) => (
            <div key={d} className="text-center text-xs text-text-tertiary py-2 font-medium">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const hasPosts = day !== null && postsByDay[day]?.length > 0;
            const isSelected = day !== null && day === selectedDay;
            const dayPostsList = day !== null ? (postsByDay[day] || []) : [];

            return (
              <button
                key={i}
                onClick={() => hasPosts && setSelectedDay(isSelected ? null : day)}
                disabled={!hasPosts}
                className={`relative min-h-[56px] sm:min-h-[68px] border-b border-r border-border-subtle p-1.5 sm:p-2 text-left transition-colors ${
                  day === null
                    ? 'bg-bg/50'
                    : hasPosts
                      ? isSelected
                        ? 'bg-white/10'
                        : 'hover:bg-white/5 cursor-pointer'
                      : 'cursor-default'
                }`}
              >
                {day !== null && (
                  <>
                    <span className={`text-xs font-medium ${
                      hasPosts ? 'text-text-primary' : 'text-text-tertiary/50'
                    }`}>
                      {day}
                    </span>
                    {hasPosts && (
                      <div className="flex gap-0.5 mt-1 flex-wrap">
                        {dayPostsList.map((p) => (
                          <span
                            key={p.id}
                            className={`w-2 h-2 rounded-full ${
                              p.platform === 'LinkedIn' ? 'bg-platform-linkedin' : 'bg-platform-instagram'
                            } ${p.status === 'posted' ? 'opacity-40' : ''}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-text-tertiary px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-platform-linkedin" />
          LinkedIn
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-platform-instagram" />
          Instagram
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          Posted
        </div>
      </div>

      {/* Selected day detail */}
      {selectedDay !== null && dayPosts.length > 0 && (
        <div className="bg-card border border-border-subtle rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-semibold text-text-primary">
            {MONTH_NAMES[month]} {selectedDay}
            <span className="text-text-tertiary font-normal ml-2">
              {dayPosts.length} post{dayPosts.length !== 1 ? 's' : ''}
            </span>
          </h4>
          {dayPosts.map((post) => (
            <div
              key={post.id}
              className={`p-3 rounded-lg bg-bg border border-border-subtle ${
                post.status === 'posted' ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <StatusBadge
                  status={post.status}
                  onChange={(s) => onStatusChange(post.id, s)}
                />
                <PlatformBadge platform={post.platform} />
                <span className="text-xs text-text-tertiary ml-auto">{post.author}</span>
              </div>
              <p className="text-sm font-medium text-text-primary mb-2">
                {post.postType}
              </p>
              <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                {post.body.split('\n').filter(Boolean).slice(0, 2).join(' ')}
              </p>
              <div className="flex items-center gap-2">
                <CopyButton text={post.body} label="Copy" className="!text-xs !px-2.5 !py-1" />
                {post.postingTime && (
                  <span className="text-xs text-text-tertiary ml-auto">{post.postingTime}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
