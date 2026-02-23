import { Post, StatusType } from './types';

const STORAGE_KEY = 'scafold-post-state';

interface PostState {
  status: StatusType;
  postedAt: string | null;
  notes: string;
}

type StoredState = Record<number, PostState>;

const VALID_STATUSES: StatusType[] = ['not_started', 'scheduled', 'posted'];

function isValidStatus(s: string): s is StatusType {
  return VALID_STATUSES.includes(s as StatusType);
}

function getStoredState(): StoredState {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(state: StoredState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable
  }
}

export function hydratePosts(posts: Post[]): Post[] {
  const state = getStoredState();
  return posts.map((post) => {
    const saved = state[post.id];
    if (!saved) return post;
    return {
      ...post,
      status: isValidStatus(saved.status) ? saved.status : post.status,
      postedAt: saved.postedAt,
      notes: saved.notes,
    };
  });
}

export function savePostStatus(id: number, status: StatusType) {
  const state = getStoredState();
  const existing = state[id];
  state[id] = {
    ...existing,
    status,
    postedAt: status === 'posted'
      ? (existing?.postedAt ?? new Date().toISOString())
      : existing?.postedAt ?? null,
    notes: existing?.notes ?? '',
  };
  saveState(state);
}

export function savePostNotes(id: number, notes: string) {
  const state = getStoredState();
  state[id] = {
    ...state[id],
    status: state[id]?.status ?? 'not_started',
    postedAt: state[id]?.postedAt ?? null,
    notes,
  };
  saveState(state);
}

export function getStoredStateForMigration(): StoredState {
  return getStoredState();
}

export function clearStoredState(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
