'use client';

import { Post } from '@/lib/types';
import CopyButton from './CopyButton';

export default function PostDetail({ post }: { post: Post }) {
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
    </div>
  );
}
