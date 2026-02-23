'use client';

import { PlatformFilter, WeekFilter } from '@/lib/types';

export default function FilterBar({
  platform,
  status,
  week,
  onPlatformChange,
  onStatusChange,
  onWeekChange,
}: {
  platform: PlatformFilter;
  status: string;
  week: WeekFilter;
  onPlatformChange: (v: PlatformFilter) => void;
  onStatusChange: (v: string) => void;
  onWeekChange: (v: WeekFilter) => void;
}) {
  const selectClass =
    'bg-card border border-border-subtle text-sm text-text-secondary rounded px-3 py-1.5 focus:outline-none focus:border-accent-blue/50 cursor-pointer appearance-none';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs text-text-tertiary">Filters:</span>

      <select
        value={platform}
        onChange={(e) => onPlatformChange(e.target.value as PlatformFilter)}
        className={selectClass}
      >
        <option value="all">All Platforms</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="Instagram">Instagram</option>
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className={selectClass}
      >
        <option value="all">All Status</option>
        <option value="not_started">Not Started</option>
        <option value="scheduled">Scheduled</option>
        <option value="posted">Posted</option>
      </select>

      <select
        value={week}
        onChange={(e) => onWeekChange(e.target.value as WeekFilter)}
        className={selectClass}
      >
        <option value="all">All Weeks</option>
        <option value="Week 0">Week 0</option>
        <option value="Week 1">Week 1</option>
        <option value="Week 2">Week 2</option>
        <option value="Week 3-4">Week 3-4</option>
      </select>
    </div>
  );
}
