'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Post, Idea, PostStats, StatusType, AuthorFilter, PlatformFilter, WeekFilter } from '@/lib/types';
import ProgressBar from '@/components/ProgressBar';
import TabNav from '@/components/TabNav';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';
import PostCard from '@/components/PostCard';
import CalendarView from '@/components/CalendarView';
import IdeasBank from '@/components/IdeasBank';
import QuickReference from '@/components/QuickReference';

type ViewMode = 'queue' | 'calendar';

export default function ScafoldContentHub() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [stats, setStats] = useState<PostStats>({ total: 0, posted: 0, scheduled: 0, notStarted: 0, nextUp: null });
  const [activeTab, setActiveTab] = useState<AuthorFilter>('all');
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [weekFilter, setWeekFilter] = useState<WeekFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('queue');
  const [loading, setLoading] = useState(true);

  const nextUpRef = useRef<HTMLDivElement>(null);

  const fetchPosts = useCallback(async () => {
    const params = new URLSearchParams();
    if (activeTab !== 'all') params.set('author', activeTab);
    if (platformFilter !== 'all') params.set('platform', platformFilter);
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (weekFilter !== 'all') params.set('week', weekFilter);

    const res = await fetch(`/api/posts?${params}`);
    const data = await res.json();
    setPosts(data);
  }, [activeTab, platformFilter, statusFilter, weekFilter]);

  const fetchStats = useCallback(async () => {
    const params = new URLSearchParams();
    if (activeTab !== 'all') params.set('author', activeTab);
    const res = await fetch(`/api/stats?${params}`);
    const data = await res.json();
    setStats(data);
  }, [activeTab]);

  const fetchIdeas = useCallback(async () => {
    const res = await fetch('/api/ideas');
    const data = await res.json();
    setIdeas(data);
  }, []);

  useEffect(() => {
    Promise.all([fetchPosts(), fetchStats(), fetchIdeas()]).then(() => setLoading(false));
  }, [fetchPosts, fetchStats, fetchIdeas]);

  // Filter by search
  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (p) =>
        p.body.toLowerCase().includes(q) ||
        p.postType.toLowerCase().includes(q) ||
        p.notes.toLowerCase().includes(q) ||
        p.hashtags.toLowerCase().includes(q) ||
        p.cta.toLowerCase().includes(q) ||
        p.hook.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  const handleStatusChange = async (id: number, status: StatusType) => {
    // Optimistic update
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status, postedAt: status === 'posted' ? new Date().toISOString() : null }
          : p
      )
    );

    await fetch(`/api/posts/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    fetchStats();
  };

  const handleNotesChange = async (id: number, notes: string) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, notes } : p)));

    await fetch(`/api/posts/${id}/notes`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes }),
    });
  };

  const scrollToNextUp = () => {
    if (stats.nextUp) {
      const el = document.getElementById(`post-${stats.nextUp.id}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-text-tertiary text-sm">Loading content hub...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
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
        <div className="mb-6">
          <FilterBar
            platform={platformFilter}
            status={statusFilter}
            week={weekFilter}
            onPlatformChange={setPlatformFilter}
            onStatusChange={setStatusFilter}
            onWeekChange={setWeekFilter}
          />
        </div>

        {/* Content */}
        {searchQuery && filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-text-tertiary text-sm">
            No posts match &quot;{searchQuery}&quot;
          </div>
        ) : viewMode === 'queue' ? (
          <div className="space-y-3 mb-8">
            {filteredPosts.map((post) => (
              <div key={post.id} id={`post-${post.id}`} ref={stats.nextUp?.id === post.id ? nextUpRef : undefined}>
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
