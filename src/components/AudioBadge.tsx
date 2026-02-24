'use client';

import CopyButton from './CopyButton';

export default function AudioBadge({ audio }: { audio: string | null }) {
  if (!audio) return null;

  return (
    <div className="flex items-center gap-2 mt-1">
      <span className="text-text-tertiary">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </span>
      <span className="text-xs text-text-tertiary truncate max-w-[250px]">
        {audio}
      </span>
      <CopyButton
        text={audio}
        label="Copy"
        className="!text-[10px] !px-1.5 !py-0.5 shrink-0"
      />
    </div>
  );
}
