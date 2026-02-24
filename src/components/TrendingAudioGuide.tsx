'use client';

import { useState } from 'react';
import CopyButton from './CopyButton';

interface AudioEntry {
  song: string;
  artist: string;
  mood: string;
}

const CATEGORIES: { name: string; entries: AudioEntry[] }[] = [
  {
    name: 'Educational / Hot Takes',
    entries: [
      { song: 'Metamorphosis', artist: 'Interworld', mood: 'intense buildup' },
      { song: 'Blade Runner 2049 theme', artist: 'Hans Zimmer', mood: 'cinematic tension' },
      { song: 'Industry Baby', artist: 'Lil Nas X', mood: 'confident energy' },
      { song: 'Original audio', artist: 'Tim talking', mood: 'best for educational/founder content' },
    ],
  },
  {
    name: 'Emotional / Vulnerability',
    entries: [
      { song: 'Snowfall', artist: 'Øneheart × Reidenshi', mood: 'ambient/reflective' },
      { song: 'Outro', artist: 'M83', mood: 'epic emotional swell' },
      { song: 'Experience', artist: 'Einaudi', mood: 'piano, growth/reflection' },
      { song: 'Vienna', artist: 'Billy Joel', mood: 'life-at-a-crossroads' },
      { song: 'Glimpse of Us', artist: 'Joji', mood: 'emotional, introspective' },
    ],
  },
  {
    name: 'Day-in-the-Life',
    entries: [
      { song: 'Daylight', artist: 'David Kushner', mood: '#1 DITL audio' },
      { song: 'golden hour', artist: 'JVKE', mood: 'warm, cinematic daily routine' },
      { song: 'Cupid', artist: 'FIFTY FIFTY', mood: 'upbeat montage' },
      { song: 'Sunroof', artist: 'Nicky Youre', mood: 'positive/energetic' },
    ],
  },
  {
    name: 'Challenge / Interactive',
    entries: [
      { song: 'Bejeweled', artist: 'Taylor Swift', mood: 'playful challenge' },
      { song: 'Monkeys Spinning Monkeys', artist: 'Kevin MacLeod', mood: 'ironic/humorous' },
      { song: 'Oh No', artist: 'Kreepa', mood: 'realization/reaction' },
    ],
  },
  {
    name: 'Hype / Launch',
    entries: [
      { song: 'Money Trees', artist: 'Kendrick Lamar', mood: 'hustle energy' },
      { song: 'Rich Flex', artist: 'Drake & 21 Savage', mood: 'confident flex' },
      { song: 'Everybody Wants to Rule the World', artist: 'Tears for Fears', mood: 'epic moment' },
    ],
  },
];

export default function TrendingAudioGuide() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border border-border-subtle rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <h3 className="text-[15px] font-semibold text-text-primary flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-vermillion">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          Trending Audio Guide
        </h3>
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
        <div className="px-5 pb-5 space-y-4">
          <p className="text-xs text-text-tertiary">
            Check Instagram&apos;s Reels audio library before posting. Audios with an upward arrow get algorithm boosts.
          </p>
          {CATEGORIES.map((cat) => (
            <div key={cat.name}>
              <h4 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
                {cat.name}
              </h4>
              <div className="space-y-1">
                {cat.entries.map((entry) => (
                  <div
                    key={entry.song}
                    className="flex items-center justify-between gap-2 p-2 rounded bg-bg border border-border-subtle"
                  >
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-text-primary">
                        {entry.song}
                      </span>
                      <span className="text-xs text-text-tertiary ml-2">
                        {entry.artist}
                      </span>
                      <span className="text-[10px] text-text-tertiary ml-2 italic">
                        {entry.mood}
                      </span>
                    </div>
                    <CopyButton
                      text={`${entry.song} — ${entry.artist}`}
                      label="Copy"
                      className="!text-[10px] !px-1.5 !py-0.5 shrink-0"
                    />
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
