'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'scafold-waitlist-count';
const GOAL = 10000;
const WEEKLY_PACE = 715;

export default function WaitlistTracker() {
  const [count, setCount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCount(parseInt(stored, 10) || 0);
    } catch {}
  }, []);

  const saveCount = (n: number) => {
    const val = Math.max(0, Math.min(n, GOAL * 2));
    setCount(val);
    try { localStorage.setItem(STORAGE_KEY, String(val)); } catch {}
  };

  const handleEdit = () => {
    setInputValue(String(count));
    setEditing(true);
  };

  const handleSave = () => {
    const parsed = parseInt(inputValue, 10);
    if (!isNaN(parsed)) saveCount(parsed);
    setEditing(false);
  };

  const pct = Math.min((count / GOAL) * 100, 100);
  const remaining = Math.max(GOAL - count, 0);
  const weeksLeft = remaining > 0 ? Math.ceil(remaining / WEEKLY_PACE) : 0;

  return (
    <div className="bg-card border border-border-subtle rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-text-primary">
          10K Waitlist Goal
        </h3>
        <div className="flex items-center gap-2 text-sm">
          {editing ? (
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
              className="w-20 bg-bg border border-border-subtle rounded px-2 py-0.5 text-sm text-text-primary text-right focus:outline-none focus:border-accent-vermillion/50"
            />
          ) : (
            <button
              onClick={handleEdit}
              className="text-accent-vermillion font-semibold hover:underline tabular-nums"
            >
              {count.toLocaleString()}
            </button>
          )}
          <span className="text-text-tertiary">/ {GOAL.toLocaleString()}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-bg rounded-full overflow-hidden border border-border-subtle">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #E94560 0%, #FF6B6B 100%)',
          }}
        />
      </div>

      {/* Pace info */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-text-tertiary">
        <span>{pct.toFixed(1)}% complete</span>
        <span>Needed pace: {WEEKLY_PACE}/week</span>
        {remaining > 0 && <span>~{weeksLeft} weeks remaining</span>}
        {count >= GOAL && <span className="text-status-posted font-medium">Goal reached!</span>}
      </div>
    </div>
  );
}
