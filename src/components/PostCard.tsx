'use client';

import { useState } from 'react';
import { Post, StatusType, ContentVersion } from '@/lib/types';
import { getVersionB } from '@/data/postsVersionB';
import StatusBadge from './StatusBadge';
import PlatformBadge from './PlatformBadge';
import CopyButton from './CopyButton';
import PostDetail from './PostDetail';

export default function PostCard({
  post,
  onStatusChange,
  onNotesChange,
}: {
  post: Post;
  onStatusChange: (id: number, status: StatusType) => void;
  onNotesChange: (id: number, notes: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notesValue, setNotesValue] = useState(post.notes);
  const [activeVersion, setActiveVersion] = useState<ContentVersion>('A');

  const versionB = getVersionB(post.id);
  const hasVersionB = versionB && versionB.hasFullBody;

  const isPosted = post.status === 'posted';

  const handleNotesSave = () => {
    if (notesValue !== post.notes) {
      onNotesChange(post.id, notesValue);
    }
  };

  const activeBody = activeVersion === 'B' && hasVersionB
    ? versionB.versionBBody
    : post.body;

  const preview = activeBody.split('\n').filter(Boolean).slice(0, 2).join(' ');
  const truncated = preview.length > 180 ? preview.slice(0, 180) + '...' : preview;

  const hashtagList = post.hashtags
    .split(/\s+/)
    .filter((h) => h.startsWith('#'));

  return (
    <div
      className={`bg-card border border-border-subtle rounded-lg p-5 transition-all ${
        isPosted ? 'opacity-60' : 'hover:bg-card-hover'
      }`}
    >
      {/* Header row */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <StatusBadge
          status={post.status}
          onChange={(s) => onStatusChange(post.id, s)}
        />
        <span className="text-xs text-text-tertiary">{post.week}</span>
        <span className="text-xs text-text-tertiary">·</span>
        <span className="text-xs text-text-tertiary">
          {post.dayOfWeek} {post.date}
        </span>
        <span className="text-xs text-text-tertiary">·</span>
        <PlatformBadge platform={post.platform} />
        {post.postingTime && (
          <>
            <span className="text-xs text-text-tertiary">·</span>
            <span className="text-xs text-text-tertiary">{post.postingTime}</span>
          </>
        )}
        {isPosted && post.postedAt && (
          <span className="text-xs text-status-posted ml-auto">
            Posted {new Date(post.postedAt).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Title + version badge */}
      <h3 className="text-[15px] font-semibold text-text-primary mb-2">
        {post.postType}
        {hasVersionB && (
          <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded font-medium align-middle ${
            activeVersion === 'A'
              ? 'bg-accent-blue/15 text-accent-blue'
              : 'bg-accent-vermillion/15 text-accent-vermillion'
          }`}>
            v{activeVersion}
          </span>
        )}
      </h3>

      {/* Preview */}
      {!expanded && (
        <p className="text-sm text-text-secondary mb-3 leading-relaxed">
          {truncated}
        </p>
      )}

      {/* Expanded detail */}
      {expanded && (
        <PostDetail
          post={post}
          notesValue={notesValue}
          onNotesValueChange={setNotesValue}
          onNotesSave={handleNotesSave}
          activeVersion={activeVersion}
          onVersionChange={setActiveVersion}
          versionB={versionB}
        />
      )}

      {/* Action row */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <CopyButton text={activeBody} label="Copy" className="!px-4 !py-2" />
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {expanded ? (
              <>
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </>
            ) : (
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            )}
          </svg>
          {expanded ? 'Collapse' : 'View Full'}
        </button>
        {!expanded && (
          <button
            onClick={(e) => { e.stopPropagation(); setShowNotes(!showNotes); }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
              showNotes || post.notes
                ? 'text-accent-blue bg-accent-blue/10'
                : 'text-text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Notes{post.notes ? ' *' : ''}
          </button>
        )}
      </div>

      {/* Notes editor (collapsed mode only — in expanded mode, notes are inside PostDetail) */}
      {!expanded && showNotes && (
        <div className="mt-3 pt-3 border-t border-border-subtle">
          <textarea
            value={notesValue}
            onChange={(e) => setNotesValue(e.target.value)}
            onBlur={handleNotesSave}
            placeholder="Add notes..."
            rows={3}
            className="w-full bg-bg border border-border-subtle rounded px-3 py-2 text-sm text-text-primary placeholder-text-tertiary resize-y focus:outline-none focus:border-accent-blue/50"
          />
        </div>
      )}

      {/* Meta row: CTA + individually copyable hashtags (collapsed only) */}
      {!expanded && (post.cta || hashtagList.length > 0) && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 pt-3 border-t border-border-subtle">
          {post.cta && (
            <span className="text-xs text-text-tertiary">
              CTA: {post.cta}
            </span>
          )}
          {hashtagList.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              {hashtagList.map((tag) => (
                <CopyButton
                  key={tag}
                  text={tag}
                  label={tag}
                  className="!text-[10px] !px-1.5 !py-0.5 !bg-white/5 !text-text-tertiary hover:!text-white hover:!bg-white/10"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
