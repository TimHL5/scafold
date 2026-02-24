'use client';

import { PlatformFilter, WeekFilter, FormatFilter } from '@/lib/types';

export default function FilterBar({
  platform,
  status,
  week,
  format,
  onPlatformChange,
  onStatusChange,
  onWeekChange,
  onFormatChange,
}: {
  platform: PlatformFilter;
  status: string;
  week: WeekFilter;
  format: FormatFilter;
  onPlatformChange: (v: PlatformFilter) => void;
  onStatusChange: (v: string) => void;
  onWeekChange: (v: WeekFilter) => void;
  onFormatChange: (v: FormatFilter) => void;
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
        <option value="Week 1">Week 1</option>
        <option value="Week 2">Week 2</option>
        <option value="Week 3">Week 3</option>
        <option value="Week 4">Week 4</option>
        <option value="Week 5">Week 5</option>
        <option value="Week 6">Week 6</option>
        <option value="Week 7">Week 7</option>
        <option value="Week 8">Week 8</option>
        <option value="Week 9">Week 9</option>
        <option value="Week 10+">Week 10+</option>
      </select>

      <select
        value={format}
        onChange={(e) => onFormatChange(e.target.value as FormatFilter)}
        className={selectClass}
      >
        <option value="all">All Formats</option>
        <option value="text_post">Text Post</option>
        <option value="reel_talking_head">Reel</option>
      </select>
    </div>
  );
}
