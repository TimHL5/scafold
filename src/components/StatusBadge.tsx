'use client';

import { StatusType } from '@/lib/types';

const STATUS_CONFIG: Record<StatusType, { label: string; color: string; bg: string }> = {
  not_started: { label: 'Not Started', color: 'text-status-not-started', bg: 'bg-status-not-started/15' },
  scheduled: { label: 'Scheduled', color: 'text-status-scheduled', bg: 'bg-status-scheduled/15' },
  posted: { label: 'Posted', color: 'text-status-posted', bg: 'bg-status-posted/15' },
};

const STATUS_ORDER: StatusType[] = ['not_started', 'scheduled', 'posted'];

export default function StatusBadge({
  status,
  onChange,
}: {
  status: StatusType;
  onChange: (newStatus: StatusType) => void;
}) {
  const config = STATUS_CONFIG[status];

  const cycleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    const idx = STATUS_ORDER.indexOf(status);
    const next = STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
    onChange(next);
  };

  return (
    <button
      onClick={cycleStatus}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${config.color} ${config.bg} hover:opacity-80`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'not_started' ? 'bg-status-not-started' :
        status === 'scheduled' ? 'bg-status-scheduled' :
        'bg-status-posted'
      }`} />
      {config.label}
    </button>
  );
}
