'use client';

import { useState } from 'react';
import CopyButton from './CopyButton';

const BRAND_VOICES = [
  {
    name: 'Tim',
    voice: 'Narrative-driven. Vulnerable. Real. Focus: personal journey, founder lessons, hard decisions. Avoid: hype, fake confidence, generic advice.',
  },
  {
    name: 'Dylan',
    voice: 'Data-focused. Contrarian. Strategic. Focus: market insights, competitive moats, technical differentiation. Avoid: false humility, trendy takes, oversimplification.',
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
      'Optimal post length: 150-400 words narrative, 200-300 FotD',
      'Post between 7-10 AM ET',
      'Always end with CTA (→ scafold.ai)',
      'Use 2-4 relevant hashtags',
    ],
  },
  {
    platform: 'Instagram',
    rules: [
      'Captions: 100-250 words max',
      'Visual should be clean, minimal, on-brand',
      'Stories for real-time engagement and polls',
      'Post between 9-11 AM or 6-8 PM ET',
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
                      <li key={i} className="text-xs text-text-secondary">· {rule}</li>
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
