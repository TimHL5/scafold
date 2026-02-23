'use client';

import { PostStats } from '@/lib/types';

export default function ProgressBar({
  stats,
  onNextUpClick,
}: {
  stats: PostStats;
  onNextUpClick?: () => void;
}) {
  const pct = stats.total > 0 ? Math.round((stats.posted / stats.total) * 100) : 0;

  return (
    <div className="bg-card border border-border-subtle rounded-lg p-5">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-white/5 rounded-full mb-3 overflow-hidden">
        <div
          className="h-full bg-status-posted rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className="text-text-secondary">
          Total: <span className="text-text-primary font-medium">{stats.total}</span>
        </span>
        <span className="text-text-secondary">
          Posted: <span className="text-status-posted font-medium">{stats.posted}</span>
        </span>
        <span className="text-text-secondary">
          Scheduled: <span className="text-status-scheduled font-medium">{stats.scheduled}</span>
        </span>
        <span className="text-text-secondary">
          Remaining: <span className="text-text-primary font-medium">{stats.notStarted}</span>
        </span>
        <span className="text-text-tertiary text-xs ml-auto">{pct}% complete</span>
      </div>

      {/* Next Up */}
      {stats.nextUp && (
        <button
          onClick={onNextUpClick}
          className="mt-3 pt-3 border-t border-border-subtle w-full text-left group"
        >
          <span className="text-xs text-text-tertiary">Next Up: </span>
          <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
            {stats.nextUp.author} — {stats.nextUp.platform} — {stats.nextUp.date} — &quot;{stats.nextUp.postType}&quot;
          </span>
        </button>
      )}
    </div>
  );
}
