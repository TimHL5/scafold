'use client';

import { Post } from '@/lib/types';
import CopyButton from './CopyButton';

export default function PostDetail({
  post,
  notesValue,
  onNotesValueChange,
  onNotesSave,
}: {
  post: Post;
  notesValue: string;
  onNotesValueChange: (v: string) => void;
  onNotesSave: () => void;
}) {
  const wordCount = post.body.split(/\s+/).filter(Boolean).length;
  const charCount = post.body.length;
  const hashtags = post.hashtags
    .split(/\s+/)
    .filter((h) => h.startsWith('#'));

  return (
    <div className="space-y-4">
      {/* Full copy button */}
      <CopyButton text={post.body} label="Copy Full Post" className="!px-5 !py-2.5 !text-sm" />

      {/* Full post body */}
      <div className="bg-bg rounded-lg p-4 border border-border-subtle">
        <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
          {post.body}
        </pre>
      </div>

      {/* Visual description (Instagram) */}
      {post.visualDescription && (
        <div className="bg-platform-instagram/5 border border-platform-instagram/20 rounded-lg p-4">
          <h4 className="text-xs font-medium text-platform-instagram mb-2">
            Visual Description
          </h4>
          <p className="text-sm text-text-secondary">{post.visualDescription}</p>
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
