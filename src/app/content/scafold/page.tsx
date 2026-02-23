'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Post, PostStats, StatusType, AuthorFilter, PlatformFilter, WeekFilter } from '@/lib/types';
import { ALL_POSTS } from '@/data/posts';
import { ALL_IDEAS } from '@/data/ideas';
import { hydratePosts, savePostStatus, savePostNotes } from '@/lib/db';
import ProgressBar from '@/components/ProgressBar';
import TabNav from '@/components/TabNav';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import PostCard from '@/components/PostCard';
import CalendarView from '@/components/CalendarView';
import IdeasBank from '@/components/IdeasBank';
import QuickReference from '@/components/QuickReference';
import Toast, { showToast } from '@/components/Toast';

type ViewMode = 'queue' | 'calendar';

function computeStats(posts: Post[], author: AuthorFilter): PostStats {
  const filtered = author === 'all' ? posts : posts.filter((p) => p.author === author);
  const posted = filtered.filter((p) => p.status === 'posted').length;
  const scheduled = filtered.filter((p) => p.status === 'scheduled').length;
  const nextUp = filtered.find((p) => p.status !== 'posted') ?? null;
  return {
    total: filtered.length,
    posted,
    scheduled,
    notStarted: filtered.length - posted - scheduled,
    nextUp,
  };
}

export default function ScafoldContentHub() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<AuthorFilter>('all');
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [weekFilter, setWeekFilter] = useState<WeekFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('queue');
  const [ready, setReady] = useState(false);

  // Hydrate posts from localStorage on mount
  useEffect(() => {
    setPosts(hydratePosts(ALL_POSTS));
    setReady(true);
  }, []);

  // Keyboard shortcut: Escape clears search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchQuery) {
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchQuery]);

  // Filtered + searched posts
  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeTab !== 'all') result = result.filter((p) => p.author === activeTab);
    if (platformFilter !== 'all') result = result.filter((p) => p.platform === platformFilter);
    if (statusFilter !== 'all') result = result.filter((p) => p.status === statusFilter);
    if (weekFilter !== 'all') result = result.filter((p) => p.week === weekFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.body.toLowerCase().includes(q) ||
          p.postType.toLowerCase().includes(q) ||
          p.notes.toLowerCase().includes(q) ||
          p.hashtags.toLowerCase().includes(q) ||
          p.cta.toLowerCase().includes(q) ||
          p.hook.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeTab, platformFilter, statusFilter, weekFilter, searchQuery]);

  const stats = useMemo(() => computeStats(posts, activeTab), [posts, activeTab]);

  const ideas = useMemo(() => ALL_IDEAS.filter((i) => !i.addedToQueue), []);

  const handleStatusChange = useCallback((id: number, status: StatusType) => {
    savePostStatus(id, status);
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              postedAt: status === 'posted'
                ? (p.postedAt ?? new Date().toISOString())
                : p.postedAt,
            }
          : p
      )
    );
    const labels: Record<StatusType, string> = {
      not_started: 'Not Started',
      scheduled: 'Scheduled',
      posted: 'Posted',
    };
    showToast(`Status → ${labels[status]}`, status === 'posted' ? 'success' : 'info');
  }, []);

  const handleNotesChange = useCallback((id: number, notes: string) => {
    savePostNotes(id, notes);
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, notes } : p)));
  }, []);

  const scrollToNextUp = useCallback(() => {
    if (stats.nextUp) {
      document.getElementById(`post-${stats.nextUp.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [stats.nextUp]);

  // Clear all filters helper
  const hasActiveFilters = platformFilter !== 'all' || statusFilter !== 'all' || weekFilter !== 'all' || searchQuery !== '';
  const clearFilters = () => {
    setPlatformFilter('all');
    setStatusFilter('all');
    setWeekFilter('all');
    setSearchQuery('');
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-text-tertiary text-sm">Loading content hub...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <Toast />
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-xl font-semibold tracking-tight">
            <span className="text-accent-vermillion">Scafold</span>{' '}
            <span className="text-text-secondary font-normal">Content Hub</span>
          </h1>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar stats={stats} onNextUpClick={scrollToNextUp} />
        </div>

        {/* Tabs + View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <TabNav active={activeTab} onChange={setActiveTab} />
          <div className="flex gap-1 bg-card rounded-lg p-1 border border-border-subtle">
            <button
              onClick={() => setViewMode('queue')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                viewMode === 'queue'
                  ? 'bg-white/10 text-white'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              Queue
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-white/10 text-white'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              Calendar
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <FilterBar
            platform={platformFilter}
            status={statusFilter}
            week={weekFilter}
            onPlatformChange={setPlatformFilter}
            onStatusChange={setStatusFilter}
            onWeekChange={setWeekFilter}
          />
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-text-tertiary hover:text-accent-vermillion transition-colors whitespace-nowrap"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Results count */}
        {hasActiveFilters && filteredPosts.length > 0 && (
          <p className="text-xs text-text-tertiary mb-3">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
        )}

        {/* Content */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-tertiary text-sm mb-3">
              {searchQuery
                ? `No posts match "${searchQuery}"`
                : 'No posts match the current filters'}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-accent-blue hover:text-white transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : viewMode === 'queue' ? (
          <div className="space-y-3 mb-8">
            {filteredPosts.map((post) => (
              <div key={post.id} id={`post-${post.id}`}>
                <PostCard
                  post={post}
                  onStatusChange={handleStatusChange}
                  onNotesChange={handleNotesChange}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-8">
            <CalendarView posts={filteredPosts} onStatusChange={handleStatusChange} />
          </div>
        )}

        {/* Ideas Bank */}
        <div className="mb-4">
          <IdeasBank ideas={ideas} />
        </div>

        {/* Quick Reference */}
        <div className="mb-8">
          <QuickReference />
        </div>
      </div>
    </div>
  );
}
