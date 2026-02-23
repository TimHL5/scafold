'use client';

import { Post, ContentVersion, PostVersionB } from '@/lib/types';
import CopyButton from './CopyButton';

export default function PostDetail({
  post,
  notesValue,
  onNotesValueChange,
  onNotesSave,
  activeVersion,
  onVersionChange,
  versionB,
}: {
  post: Post;
  notesValue: string;
  onNotesValueChange: (v: string) => void;
  onNotesSave: () => void;
  activeVersion: ContentVersion;
  onVersionChange: (v: ContentVersion) => void;
  versionB: PostVersionB | null;
}) {
  const hasVersionB = versionB && versionB.hasFullBody;
  const activeBody = activeVersion === 'B' && hasVersionB
    ? versionB.versionBBody
    : post.body;
  const activeVisualDescription = activeVersion === 'B' && versionB?.versionBVisualDescription
    ? versionB.versionBVisualDescription
    : post.visualDescription;
  const wordCount = activeBody.split(/\s+/).filter(Boolean).length;
  const charCount = activeBody.length;
  const hashtags = post.hashtags
    .split(/\s+/)
    .filter((h) => h.startsWith('#'));

  return (
    <div className="space-y-4">
      {/* Version A/B toggle */}
      {hasVersionB && (
        <div className="flex items-center gap-1 bg-bg rounded-lg p-1 border border-border-subtle">
          <button
            onClick={() => onVersionChange('A')}
            className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${
              activeVersion === 'A'
                ? 'bg-accent-blue/15 text-accent-blue'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            Version A
          </button>
          <button
            onClick={() => onVersionChange('B')}
            className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${
              activeVersion === 'B'
                ? 'bg-accent-vermillion/15 text-accent-vermillion'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            Version B
          </button>
        </div>
      )}

      {/* Hook options (Version B only) */}
      {activeVersion === 'B' && versionB && versionB.hookOptions.length > 0 && (
        <div className="bg-bg rounded-lg border border-border-subtle overflow-hidden">
          <h4 className="text-xs font-medium text-text-tertiary px-4 pt-3 pb-2">
            Hook Options
          </h4>
          <div className="divide-y divide-border-subtle">
            {versionB.hookOptions.map((hook, i) => (
              <div key={i} className="px-4 py-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <span className="text-sm font-medium text-text-primary">
                      {i + 1}. &ldquo;{hook.label}&rdquo;
                    </span>
                    <span className="text-xs text-text-tertiary ml-2">
                      {hook.category}
                    </span>
                  </div>
                  <CopyButton
                    text={hook.hookText}
                    label="Copy"
                    className="!text-xs !px-2 !py-1 shrink-0"
                  />
                </div>
                <p className="text-sm text-accent-blue/80 italic mb-1.5">
                  &ldquo;{hook.hookText}&rdquo;
                </p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {hook.reasoning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full copy button */}
      <CopyButton text={activeBody} label="Copy Full Post" className="!px-5 !py-2.5 !text-sm" />

      {/* Full post body */}
      <div className="bg-bg rounded-lg p-4 border border-border-subtle">
        <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
          {activeBody}
        </pre>
      </div>

      {/* Visual description (Instagram) */}
      {activeVisualDescription && (
        <div className="bg-platform-instagram/5 border border-platform-instagram/20 rounded-lg p-4">
          <h4 className="text-xs font-medium text-platform-instagram mb-2">
            Visual Description
          </h4>
          <p className="text-sm text-text-secondary">{activeVisualDescription}</p>
        </div>
      )}

      {/* Platform optimization (Version B only) */}
      {activeVersion === 'B' && versionB && (versionB.platformOptimization.linkedin || versionB.platformOptimization.instagram) && (
        <div className="bg-accent-vermillion/5 border border-accent-vermillion/20 rounded-lg p-4">
          <h4 className="text-xs font-medium text-accent-vermillion mb-3">
            Platform Optimization
          </h4>
          <div className="space-y-2">
            {versionB.platformOptimization.linkedin && (
              <div>
                <span className="text-xs font-medium text-platform-linkedin">LinkedIn:</span>
                <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                  {versionB.platformOptimization.linkedin}
                </p>
              </div>
            )}
            {versionB.platformOptimization.instagram && (
              <div>
                <span className="text-xs font-medium text-platform-instagram">Instagram:</span>
                <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                  {versionB.platformOptimization.instagram}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Platform posting rules */}
      <div className="bg-white/[0.02] border border-border-subtle rounded-lg p-4">
        <h4 className="text-xs font-medium text-text-tertiary mb-2">Posting Guidelines</h4>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-text-secondary">
          {post.platform === 'LinkedIn' ? (
            <>
              <span>Length: 150-400 words</span>
              <span>Time: 7-10 AM ET</span>
              <span>End with CTA</span>
              <span>2-4 hashtags</span>
            </>
          ) : (
            <>
              <span>Caption: 100-250 words</span>
              <span>Time: 9-11 AM or 6-8 PM ET</span>
              <span>Clean, minimal visual</span>
              <span>Stories for engagement</span>
            </>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-4 text-xs text-text-tertiary">
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
        {post.postingTime && <span>Post: {post.postingTime}</span>}
        <span>Author: {post.author}</span>
      </div>

      {/* CTA */}
      {post.cta && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-tertiary">CTA:</span>
          <span className="text-sm text-text-secondary">{post.cta}</span>
          <CopyButton text={post.cta} label="Copy" className="!text-xs !px-2 !py-1" />
        </div>
      )}

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <div>
          <span className="text-xs text-text-tertiary block mb-2">Hashtags:</span>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <CopyButton key={tag} text={tag} label={tag} className="!text-xs !px-2 !py-1" />
            ))}
          </div>
        </div>
      )}

      {/* Notes (editable) */}
      <div>
        <span className="text-xs text-text-tertiary block mb-2">Notes:</span>
        <textarea
          value={notesValue}
          onChange={(e) => onNotesValueChange(e.target.value)}
          onBlur={onNotesSave}
          placeholder="Add notes for this post..."
          rows={3}
          className="w-full bg-bg border border-border-subtle rounded px-3 py-2 text-sm text-text-primary placeholder-text-tertiary resize-y focus:outline-none focus:border-accent-blue/50"
        />
      </div>
    </div>
  );
}
