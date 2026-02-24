'use client';

import { AuthorFilter } from '@/lib/types';

const TABS: { value: AuthorFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'Tim', label: 'Tim (IG)' },
  { value: 'Dylan', label: 'Dylan (LI)' },
  { value: 'Scafold', label: 'Scafold' },
];

export default function TabNav({
  active,
  onChange,
}: {
  active: AuthorFilter;
  onChange: (tab: AuthorFilter) => void;
}) {
  return (
    <div className="flex gap-1">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
            active === tab.value
              ? 'text-white border-b-2 border-accent-vermillion bg-white/5'
              : 'text-text-tertiary hover:text-text-secondary hover:bg-white/5'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
