import { StatusType } from './types';

interface PostStateEntry {
  status: string;
  postedAt: string | null;
  notes: string;
}

export type PostStateMap = Record<number, PostStateEntry>;

interface FetchStateResponse {
  states: PostStateMap;
  source: 'db' | 'none' | 'error';
}

export async function fetchPostStates(): Promise<FetchStateResponse> {
  try {
    const res = await fetch('/api/posts/state');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return { states: {}, source: 'error' };
  }
}

export async function syncStatus(id: number, status: StatusType, postedAt: string | null): Promise<boolean> {
  try {
    const res = await fetch(`/api/posts/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, postedAt }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function syncNotes(id: number, notes: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/posts/${id}/notes`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function migrateLocalState(states: PostStateMap): Promise<boolean> {
  try {
    const res = await fetch('/api/posts/state/migrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ states }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
