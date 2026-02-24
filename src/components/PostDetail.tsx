'use client';

import { Post, ContentVersion } from '@/lib/types';
import CopyButton from './CopyButton';
import FormatBadge from './FormatBadge';
import AudioBadge from './AudioBadge';

export default function PostDetail({
  post,
  notesValue,
  onNotesValueChange,
  onNotesSave,
  activeVersion,
  onVersionChange,
}: {
  post: Post;
  notesValue: string;
  onNotesValueChange: (v: string) => void;
  onNotesSave: () => void;
  activeVersion: ContentVersion;
  onVersionChange: (v: ContentVersion) => void;
}) {
  const hasVersionB = !!post.bodyB;
  const isReel = post.format === 'reel_talking_head';

  // Version-aware content
  const activeBody = activeVersion === 'B' && hasVersionB ? post.bodyB! : post.body;
  const activeCaption = activeVersion === 'B' && hasVersionB ? (post.captionB ?? post.caption) : post.caption;
  const activeAudio = activeVersion === 'B' && hasVersionB ? (post.audioB ?? post.audio) : post.audio;

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

      {/* Format + Duration + Audio (Reels) */}
      {isReel && (
        <div className="flex flex-wrap items-center gap-3 p-3 bg-bg rounded-lg border border-border-subtle">
          <FormatBadge format={post.format} duration={post.estimatedDuration} />
          {activeAudio && (
            <AudioBadge audio={activeAudio} />
          )}
        </div>
      )}

      {/* Hook options (all posts, both versions) */}
      {post.hookOptions && post.hookOptions.length > 0 && (
        <div className="bg-bg rounded-lg border border-border-subtle overflow-hidden">
          <h4 className="text-xs font-medium text-text-tertiary px-4 pt-3 pb-2">
            Hook Options
          </h4>
          <div className="divide-y divide-border-subtle">
            {post.hookOptions.map((hook, i) => (
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

      {/* Copy buttons */}
      <div className="flex flex-wrap gap-2">
        {isReel ? (
          <>
            <CopyButton text={activeBody} label="Copy Script" className="!px-5 !py-2.5 !text-sm" />
            {activeCaption && (
              <CopyButton text={activeCaption} label="Copy Caption" className="!px-5 !py-2.5 !text-sm" />
            )}
          </>
        ) : (
          <CopyButton text={activeBody} label="Copy Full Post" className="!px-5 !py-2.5 !text-sm" />
        )}
      </div>

      {/* SCRIPT section (Reels) */}
      {isReel && (
        <div className="bg-bg rounded-lg p-4 border border-border-subtle">
          <h4 className="text-xs font-medium text-accent-vermillion mb-2 uppercase tracking-wider">
            Script
          </h4>
          <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
            {activeBody}
          </pre>
        </div>
      )}

      {/* CAPTION section (Reels) */}
      {isReel && activeCaption && (
        <div className="bg-platform-instagram/5 border border-platform-instagram/20 rounded-lg p-4">
          <h4 className="text-xs font-medium text-platform-instagram mb-2 uppercase tracking-wider">
            Instagram Caption
          </h4>
          <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
            {activeCaption}
          </pre>
        </div>
      )}

      {/* Full post body (non-Reel) */}
      {!isReel && (
        <div className="bg-bg rounded-lg p-4 border border-border-subtle">
          <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
            {activeBody}
          </pre>
        </div>
      )}

      {/* Visual / filming notes */}
      {post.visualDescription && (
        <div className="bg-platform-instagram/5 border border-platform-instagram/20 rounded-lg p-4">
          <h4 className="text-xs font-medium text-platform-instagram mb-2">
            {isReel ? 'Filming Notes' : 'Visual Description'}
          </h4>
          <p className="text-sm text-text-secondary">{post.visualDescription}</p>
        </div>
      )}

      {/* Cross-amplification notes */}
      {post.crossAmplification && (
        <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-lg p-4">
          <h4 className="text-xs font-medium text-accent-blue mb-2">
            Cross-Amplification
          </h4>
          <p className="text-sm text-text-secondary">{post.crossAmplification}</p>
        </div>
      )}

      {/* Posting guidelines */}
      <div className="bg-white/[0.02] border border-border-subtle rounded-lg p-4">
        <h4 className="text-xs font-medium text-text-tertiary mb-2">Posting Guidelines</h4>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-text-secondary">
          {post.platform === 'LinkedIn' ? (
            <>
              <span>Length: 200-400 words</span>
              <span>Time: 7:30-8:30 AM ET</span>
              <span>End with CTA</span>
              <span>2-4 hashtags</span>
            </>
          ) : (
            <>
              <span>Reel: 30-60 seconds</span>
              <span>Time: 11AM-1PM or 6-8PM ET</span>
              <span>iPhone selfie, natural lighting</span>
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
        {post.estimatedDuration && <span>Duration: {post.estimatedDuration}</span>}
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
