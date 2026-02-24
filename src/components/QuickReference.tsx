'use client';

import { useState } from 'react';
import CopyButton from './CopyButton';

const BRAND_VOICES = [
  {
    name: 'Tim (Instagram)',
    voice: 'Confident but not cocky. Smart friend at a coffee shop. iPhone selfie, natural lighting, casual backgrounds. Fast-paced, direct eye contact. Talking-head reels, 30-60 seconds.',
  },
  {
    name: 'Dylan (LinkedIn)',
    voice: 'Analytical. Contrarian. Data-first. Short paragraphs, strategic white space, framework-driven. 200-400 words. Original calculations, market reframes, "here\'s what nobody\'s talking about."',
  },
  {
    name: 'Scafold',
    voice: 'Direct. Problem-focused. Action-oriented. Focus: frustration validation, market opportunities, execution clarity. Avoid: cute wordplay, emoji overload, vagueness.',
  },
];

const PLATFORM_RULES = [
  {
    platform: 'LinkedIn',
    rules: [
      'Optimal post length: 200-400 words',
      'Post between 7:30-8:30 AM ET (Tue-Thu strongest)',
      'Always end with CTA: "Join the waitlist at scafold.ai"',
      'Use 2-4 relevant hashtags',
      'Short paragraphs, strategic white space',
    ],
  },
  {
    platform: 'Instagram',
    rules: [
      'Reels: 30-60 seconds, talking-head format',
      'Post between 11AM-1PM or 6-8PM ET',
      'iPhone selfie mode, natural lighting, no ring lights',
      'Hook text on screen for first 2 seconds',
      'Share to Stories with "Link in bio" sticker',
    ],
  },
];

const HASHTAGS = [
  '#WhatBugsYou',
  '#ScafoldThis',
  '#FrustrationOfTheDay',
  '#scafold',
  '#buildinpublic',
  '#startups',
  '#AI',
  '#FrustrationReport',
];

export default function QuickReference() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border border-border-subtle rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <h3 className="text-[15px] font-semibold text-text-primary">Quick Reference</h3>
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
          {/* CTA Reminder */}
          <div className="p-3 rounded bg-accent-vermillion/10 border border-accent-vermillion/20">
            <p className="text-xs font-medium text-accent-vermillion mb-1">Waitlist-Only CTA</p>
            <p className="text-xs text-text-secondary">
              &ldquo;Join the waitlist at scafold.ai&rdquo; — NOT &ldquo;go use it.&rdquo; Product hasn&apos;t launched. First 10,000 get founding member access.
            </p>
          </div>

          {/* Brand Voices */}
          <div>
            <h4 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
              Brand Voices
            </h4>
            <div className="space-y-2">
              {BRAND_VOICES.map((bv) => (
                <div key={bv.name} className="p-3 rounded bg-bg border border-border-subtle">
                  <span className="text-sm font-medium text-text-primary">{bv.name}</span>
                  <p className="text-xs text-text-secondary mt-1">{bv.voice}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Rules */}
          <div>
            <h4 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
              Platform Rules
            </h4>
            <div className="space-y-2">
              {PLATFORM_RULES.map((pr) => (
                <div key={pr.platform} className="p-3 rounded bg-bg border border-border-subtle">
                  <span className={`text-sm font-medium ${
                    pr.platform === 'LinkedIn' ? 'text-platform-linkedin' : 'text-platform-instagram'
                  }`}>
                    {pr.platform}
                  </span>
                  <ul className="mt-1 space-y-0.5">
                    {pr.rules.map((rule, i) => (
                      <li key={i} className="text-xs text-text-secondary">&middot; {rule}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <h4 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
              Hashtags
            </h4>
            <div className="flex flex-wrap gap-2">
              {HASHTAGS.map((tag) => (
                <CopyButton key={tag} text={tag} label={tag} className="!text-xs !px-2 !py-1" />
              ))}
            </div>
          </div>

          {/* Key Links */}
          <div>
            <h4 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
              Key Links
            </h4>
            <CopyButton text="scafold.ai" label="scafold.ai" className="!text-xs !px-2 !py-1" />
          </div>
        </div>
      )}
    </div>
  );
}
