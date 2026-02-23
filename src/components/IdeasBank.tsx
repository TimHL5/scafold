'use client';

import { useState } from 'react';
import { Idea } from '@/lib/types';
import CopyButton from './CopyButton';

export default function IdeasBank({ ideas }: { ideas: Idea[] }) {
  const [open, setOpen] = useState(false);

  if (ideas.length === 0) return null;

  // Group by author
  const grouped: Record<string, Idea[]> = {};
  ideas.forEach((idea) => {
    if (!grouped[idea.author]) grouped[idea.author] = [];
    grouped[idea.author].push(idea);
  });

  return (
    <div className="bg-card border border-border-subtle rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-[15px] font-semibold text-text-primary">Ideas Bank</h3>
          <span className="text-xs text-text-tertiary">{ideas.length} ideas</span>
        </div>
        <svg
          className={`w-4 h-4 text-text-tertiary transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-6">
          {Object.entries(grouped).map(([author, authorIdeas]) => (
            <div key={author}>
              <h4 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
                {author}
              </h4>
              <div className="space-y-2">
                {authorIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="flex items-start gap-3 p-3 rounded bg-bg border border-border-subtle"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            idea.platform === 'LinkedIn'
                              ? 'bg-platform-linkedin/15 text-platform-linkedin'
                              : 'bg-platform-instagram/15 text-platform-instagram'
                          }`}
                        >
                          {idea.platform}
                        </span>
                        {idea.category && (
                          <span className="text-xs text-text-tertiary">{idea.category}</span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">{idea.concept}</p>
                    </div>
                    {idea.fullDraft && (
                      <CopyButton
                        text={idea.fullDraft}
                        label="Copy"
                        className="shrink-0 !text-xs !px-2 !py-1"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
