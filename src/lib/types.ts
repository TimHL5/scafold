export type StatusType = 'not_started' | 'scheduled' | 'posted';
export type AuthorFilter = 'all' | 'Tim' | 'Dylan' | 'Scafold';
export type PlatformFilter = 'all' | 'LinkedIn' | 'Instagram';
export type WeekFilter = 'all' | 'Week 0' | 'Week 1' | 'Week 2' | 'Week 3-4';

export interface Post {
  id: number;
  postNumber: number;
  week: string;
  date: string;
  dayOfWeek: string;
  author: string;
  platform: string;
  postType: string;
  hook: string;
  body: string;
  visualDescription: string;
  cta: string;
  hashtags: string;
  postingTime: string;
  status: StatusType;
  postedAt: string | null;
  notes: string;
  sortOrder: number;
}

export interface Idea {
  id: number;
  author: string;
  platform: string;
  concept: string;
  fullDraft: string;
  category: string;
  addedToQueue: boolean;
}

export interface PostStats {
  total: number;
  posted: number;
  scheduled: number;
  notStarted: number;
  nextUp: Post | null;
}

export type ContentVersion = 'A' | 'B';

export interface HookOption {
  label: string;
  category: string;
  hookText: string;
  reasoning: string;
}

export interface PlatformOptimization {
  linkedin: string;
  instagram: string;
}

export interface PostVersionB {
  postId: number;
  hookOptions: HookOption[];
  versionBBody: string;
  versionBVisualDescription?: string;
  platformOptimization: PlatformOptimization;
  hasFullBody: boolean;
}
