export type StatusType = 'not_started' | 'scheduled' | 'posted';
export type AuthorFilter = 'all' | 'Tim' | 'Dylan' | 'Scafold';
export type PlatformFilter = 'all' | 'LinkedIn' | 'Instagram';
export type WeekFilter = 'all' | 'Week 1' | 'Week 2' | 'Week 3' | 'Week 4' | 'Week 5' | 'Week 6' | 'Week 7' | 'Week 8' | 'Week 9' | 'Week 10+';
export type FormatType = 'text_post' | 'reel_talking_head' | 'carousel' | 'story' | 'visual_card';
export type FormatFilter = 'all' | FormatType;
export type ContentVersion = 'A' | 'B';

export interface HookOption {
  label: string;
  category: string;
  hookText: string;
  reasoning: string;
}

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

  // V3 fields
  format: FormatType;
  caption: string | null;
  audio: string | null;
  estimatedDuration: string | null;
  crossAmplification: string | null;

  // Version B fields (inline)
  bodyB: string | null;
  captionB: string | null;
  audioB: string | null;
  hookB: string | null;

  // Hook options (3 per post)
  hookOptions: HookOption[] | null;

  // Winner tracking
  winner: 'a' | 'b' | null;
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
