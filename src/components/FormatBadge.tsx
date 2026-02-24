'use client';

import { FormatType } from '@/lib/types';

export default function FormatBadge({
  format,
  duration,
}: {
  format: FormatType;
  duration?: string | null;
}) {
  if (format === 'reel_talking_head') {
    const durationShort = duration
      ? duration.replace(' seconds', 's').replace(' second', 's')
      : null;

    return (
      <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-medium bg-accent-vermillion/15 text-accent-vermillion">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
        Reel{durationShort ? ` · ${durationShort}` : ''}
      </span>
    );
  }

  if (format === 'text_post') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-medium bg-white/10 text-text-secondary">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        Text
      </span>
    );
  }

  return null;
}
