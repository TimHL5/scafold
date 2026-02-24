# CLAUDE CODE PROMPT — Scafold Content Hub V3 Upgrade

## CONTEXT

You are upgrading an existing Next.js content dashboard for the Scafold (ONE f, never "Scaffold") marketing campaign. The project is at `/Users/Timmy/Documents/scafold`.

The campaign has been **completely overhauled**. The previous 37 posts are obsolete and must be **removed entirely**:
- **Tim** now posts **daily Instagram Reels** (talking-head format) — he is the Instagram guy
- **Dylan** now posts **daily LinkedIn posts** — he is the LinkedIn guy
- The product is **NOT launched** — this is **waitlist only** at scafold.ai
- Goal: **10,000 waitlist signups by May** for YC S26
- Every post has **2 complete A/B versions** and **3 hook options**
- Tim's Reels have separate **scripts** (what he says on camera) and **captions** (Instagram caption text), plus **audio/song suggestions**

## SOURCE FILES

The new content lives in a markdown file in the project root:

**`Scafold_Campaign_V3.md`** — Contains:
- Tim's daily Instagram Reel scripts (Weeks 1-2 fully scripted with stage directions, audio suggestions, 2 versions each, 3 hooks each)
- Dylan's daily LinkedIn posts (Week 1 fully scripted, 2 versions each, 3 hooks each)
- Weekly theme schedules for Weeks 3-10
- Trending audio reference guide
- Cross-amplification playbook
- Milestone tracking targets

## CRITICAL: REMOVE ALL PREVIOUS POSTS

**DELETE** the following files — they contain the old V1 campaign and are no longer needed:
- `src/data/posts.ts` — Old 37 posts → DELETE THIS FILE
- `src/data/postsVersionB.ts` — Old Version B data → DELETE THIS FILE

**Replace** them with a single new data file containing ONLY the V3 campaign posts.

Also **remove** all references and imports of these old files from:
- `src/app/content/scafold/page.tsx` — Remove `import { ALL_POSTS } from '@/data/posts'` and `import { VERSION_B_DATA } from '@/data/postsVersionB'`
- `src/components/PostCard.tsx` — Remove `import { getVersionB } from '@/data/postsVersionB'`
- Any other file that imports from the old data files

The dashboard should show ONLY V3 posts. Zero legacy content.

## WHAT ALREADY EXISTS (KEEP THE GOOD PARTS)

The app currently has these features that should be **preserved and updated**:
- Working post cards with status tracking (not_started / scheduled / posted)
- A/B version toggle on post cards (Version A = blue badge, Version B = vermillion badge)
- Hook options display (3 hooks per post with labels, text, angle explanations)
- Copy to clipboard (single "Copy" button per post)
- Author tabs (All / Tim / Dylan / Scafold)
- Platform + Status + Week filters
- Search across post content
- Calendar view toggle
- Ideas bank (collapsible)
- Quick reference (collapsible)
- localStorage + Neon postgres for persistence
- Toast notifications
- Dark theme with Scafold brand colors

## WHAT NEEDS TO CHANGE

### 1. REPLACE OLD POSTS WITH V3 POSTS

**Delete** `src/data/posts.ts` and `src/data/postsVersionB.ts`.

**Create** `src/data/posts.ts` (same filename, completely new content) with all V3 campaign posts parsed from `Scafold_Campaign_V3.md`.

Each V3 post object needs these fields (update the Post type accordingly):

```typescript
interface Post {
  // Core fields
  id: number;
  postNumber: number;
  week: string;
  date: string;
  dayOfWeek: string;
  author: string;          // 'Tim' | 'Dylan' | 'Scafold'
  platform: string;        // 'LinkedIn' | 'Instagram'
  postType: string;        // e.g. "The Problem Nobody's Talking About"
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
  format: FormatType;       // 'text_post' | 'reel_talking_head' | 'carousel' | 'story' | 'visual_card'
  caption: string | null;   // Instagram caption (separate from script/body for Reels)
  audio: string | null;     // Song suggestion for Reels (e.g. "Metamorphosis by Interworld")
  estimatedDuration: string | null;  // For reels: "35 seconds"
  crossAmplification: string | null; // Note about which other post to reference
  
  // Version B fields (inline — no separate lookup file)
  bodyB: string | null;     // Version B full body/script
  captionB: string | null;  // Version B caption (Reels)
  audioB: string | null;    // Version B audio suggestion
  hookB: string | null;     // Version B hook text
  
  // Hook options (3 per post)
  hookOptions: HookOption[] | null;
  
  // Winner tracking
  winner: 'a' | 'b' | null;
}

type FormatType = 'text_post' | 'reel_talking_head' | 'carousel' | 'story' | 'visual_card';
```

**IMPORTANT — Tim's Reels have 3 separate copyable pieces:**
- `body` = the full talking-head SCRIPT (includes stage directions in square brackets like `[Lean in slightly]`, `[Quick cut — different angle]`)
- `caption` = the Instagram caption text (shorter, completely different content from the script)
- `audio` = the suggested song/audio (e.g., `"Original audio (Tim talking) — add subtle lo-fi beat at 20% volume"`)

**Dylan's LinkedIn posts:**
- `body` = the full post text
- `caption` = null (LinkedIn doesn't have separate captions)
- `audio` = null

**Parse the following posts from `Scafold_Campaign_V3.md`:**

Tim's Instagram Reels (14 days, each with Version A + B inline):
- Day 1 (Mon Feb 24): "The Problem Nobody's Talking About"
- Day 2 (Tue Feb 25): "The Personal Story"
- Day 3 (Wed Feb 26): "The Contrarian AI Take"
- Day 4 (Thu Feb 27): "The Countdown"
- Day 5 (Fri Feb 28): "The Eve-of-Launch"
- Day 6 (Sat Mar 1): "WAITLIST LAUNCH DAY"
- Day 7 (Sun Mar 2): "The Big Vision"
- Day 8 (Mon Mar 3): "Frustration Spotlight"
- Day 9 (Tue Mar 4): "Founder Vulnerability"
- Day 10 (Wed Mar 5): "Hot Take: AI Validation is Broken"
- Day 11 (Thu Mar 6): "Waitlist Milestone"
- Day 12 (Fri Mar 7): "Challenge: Drop Your Frustration"
- Day 13 (Sat Mar 8): "Behind the Scenes"
- Day 14 (Sun Mar 9): "Vision / Why This Matters"

Dylan's LinkedIn Posts (7 days, each with Version A + B inline):
- Mon Feb 24: Market insight ("$45B blind spot" / "Best founders start with anger")
- Tue Feb 25: Product thesis ("ChatGPT validates everything" / "6 steps")
- Wed Feb 26: Contrarian take ("Most valuable data source" / "We don't want your idea")
- Thu Feb 27: Data hook ("30 billion daily frustrations" / "Next billion-dollar company")
- Fri Feb 28 through Sun Mar 2: Continue per V3 doc

**Total: 21 posts** (14 Tim Reels + 7 Dylan LinkedIn). All with Version A, Version B, and 3 hook options baked in.

### 2. UPDATE TYPES

In `src/lib/types.ts`:

- **Remove** `CampaignVersion` type (no longer needed — only V3 exists)
- **Remove** the old `PostVersionB` interface (Version B is now inline on each post)
- **Remove** `ContentVersion` if it only existed for the old lookup pattern
- **Add** `FormatType` and `FormatFilter`
- **Update** `Post` interface with all new fields listed above
- **Update** `WeekFilter` to include Week 1 through Week 10+
- **Add** `winner` field to Post interface
- **Keep** `HookOption` interface as-is (it's still used)

```typescript
export type FormatType = 'text_post' | 'reel_talking_head' | 'carousel' | 'story' | 'visual_card';
export type FormatFilter = 'all' | FormatType;
export type WeekFilter = 'all' | 'Week 1' | 'Week 2' | 'Week 3' | 'Week 4' | 'Week 5' | 'Week 6' | 'Week 7' | 'Week 8' | 'Week 9' | 'Week 10+';
```

### 3. UPDATE PostCard COMPONENT

The `PostCard.tsx` needs these changes:

**a) Remove old Version B lookup.** Delete `import { getVersionB } from '@/data/postsVersionB'`. Version B data is now inline on the post object (`post.bodyB`, `post.captionB`, etc.).

**b) Format badge:** Show a small badge next to the platform badge:
- "Reel" badge (vermillion, with camera icon) for `reel_talking_head`
- "Text" badge for text_post

**c) Audio suggestion:** For Reels, show a music note icon with the suggested audio name below the title. Small, subtle, with its own copy button.

**d) Separate copy buttons for Reels:** When `format === 'reel_talking_head'`:
- Show TWO primary copy buttons: `[Copy Script]` and `[Copy Caption]`
- "Copy Script" copies the `body` field (the talking-head script)
- "Copy Caption" copies the `caption` field (the Instagram caption)
- Toast: "Script copied" / "Caption copied"

When `format !== 'reel_talking_head'`:
- Show single `[Copy]` button as before

**e) Version toggle update:** The toggle now reads directly from the post object:
- Version A: `post.body`, `post.caption`, `post.audio`, `post.hook`
- Version B: `post.bodyB`, `post.captionB`, `post.audioB`, `post.hookB`
- Copy buttons always copy from the ACTIVE version

**f) Estimated duration:** For Reels, show duration next to format badge (e.g., "Reel · 45s")

**g) Winner star:** Small star icon (☆/★) to mark chosen version. Persisted to state.

### 4. UPDATE PostDetail COMPONENT

When expanded (View Full), show additional sections for Reels:

- Two copy buttons at top: "Copy Script" and "Copy Caption"
- Format + Duration display
- Audio suggestion with artist, mood, and usage notes
- SCRIPT section (full talking-head script with stage directions)
- CAPTION section (separate Instagram caption)
- HOOKS section (3 hooks with individual copy buttons)
- Hashtags (individually copyable)
- CTA text
- Word/character count
- Filming/visual notes (if any)
- Cross-amplification notes (if any)
- Editable notes field

### 5. ADD WAITLIST GOAL TRACKER

Add `src/components/WaitlistTracker.tsx`:

- Positioned at the very top of the page, above the progress bar
- Shows: `10K Waitlist Goal: [progress bar] [current]/10,000`
- The current number is editable — click on it to type a new number
- Shows weekly pace: `"This week: +[X] | Needed pace: 715/week"`
- Progress bar fills with vermillion gradient
- Store in localStorage (key: `scafold-waitlist-count`)

### 6. ADD FORMAT FILTER

In `FilterBar.tsx`, add a fourth filter dropdown:
- **Format**: All | Text Post | Reel
- Filters by `post.format`

### 7. ADD TRENDING AUDIO GUIDE

Add collapsible section `src/components/TrendingAudioGuide.tsx` below QuickReference:

Organized by category with copy buttons:
- **Educational / Hot Takes**: Metamorphosis (Interworld), Blade Runner 2049 theme, Industry Baby (Lil Nas X), Original audio
- **Emotional / Vulnerability**: Snowfall (Oneheart x Reidenshi), Outro (M83), Experience (Einaudi), Vienna (Billy Joel), Glimpse of Us (Joji)
- **Day-in-the-Life**: Daylight (David Kushner), golden hour (JVKE), Cupid (FIFTY FIFTY), Sunroof (Nicky Youre)
- **Challenge / Interactive**: Bejeweled (Taylor Swift), Monkeys Spinning Monkeys, Oh No (Kreepa)
- **Hype / Launch**: Money Trees (Kendrick), Rich Flex (Drake), Everybody Wants to Rule the World

Each entry: Song name + Artist + mood tag + [Copy] button

### 8. UPDATE QUICK REFERENCE

In `QuickReference.tsx`, update brand voice for V3:
- **Tim's voice (Instagram):** "Confident but not cocky. Smart friend at a coffee shop. iPhone selfie, natural lighting, casual backgrounds. Fast-paced, direct eye contact."
- **Dylan's voice (LinkedIn):** "Analytical. Contrarian. Data-first. Short paragraphs, strategic white space, framework-driven. 200-400 words."
- **Posting times:** Tim: 11AM-1PM or 6-8PM ET. Dylan: 7:30-8:30AM ET.
- **CTA:** Waitlist-only. "Join the waitlist at scafold.ai" — NOT "go use it"

### 9. UPDATE TAB LABELS

- "Tim" → **"Tim (IG)"**
- "Dylan" → **"Dylan (LI)"**
- "Scafold" stays
- "All" stays

### 10. UPDATE WEEK FILTERS

Campaign runs 10+ weeks (Feb 22 – May):
```
'all' | 'Week 1' | 'Week 2' | 'Week 3' | 'Week 4' | 'Week 5' | 'Week 6' | 'Week 7' | 'Week 8' | 'Week 9' | 'Week 10+'
```

### 11. CLEAN UP main page.tsx

In `src/app/content/scafold/page.tsx`:
- **Remove** import of `ALL_POSTS` from old `'@/data/posts'`
- **Import** the new `ALL_POSTS` from the new `'@/data/posts'` (same path, new content)
- **Remove** any reference to `postsVersionB` or `getVersionB`
- **Remove** `campaignVersion` filter logic (there's no legacy toggle — only V3 exists)
- **Add** WaitlistTracker component at top
- **Add** format filter handling
- **Update** the stats computation for the new post count (~21 posts instead of 37)

## IMPLEMENTATION ORDER

1. **Delete old data:** Remove `src/data/posts.ts` and `src/data/postsVersionB.ts`
2. **Update types:** `src/lib/types.ts` — new Post interface, remove PostVersionB, add FormatType
3. **Create new posts data:** `src/data/posts.ts` — parse all 21 V3 posts from `Scafold_Campaign_V3.md`
4. **Create WaitlistTracker.tsx**
5. **Create FormatBadge.tsx**
6. **Create AudioBadge.tsx**
7. **Create TrendingAudioGuide.tsx**
8. **Update PostCard.tsx** — remove old Version B lookup, add format badge, audio display, separate Reel copy buttons, duration, winner star, read Version B from inline fields
9. **Update PostDetail.tsx** — add Reel-specific sections (script, caption, audio, filming notes, cross-amplification)
10. **Update FilterBar.tsx** — add format filter, update week options
11. **Update TabNav.tsx** — labels to "Tim (IG)", "Dylan (LI)"
12. **Update QuickReference.tsx** — V3 brand voice
13. **Update page.tsx** — new imports, add waitlist tracker, handle new filters, remove legacy references
14. **Update db.ts** — add winner field to persistence
15. **Clean up** — grep for any remaining imports of old files, verify no broken references
16. **Test:** copy buttons, version toggle, filters, search, status changes, `npm run build`

## CRITICAL RULES

1. **"Scafold" — ONE F.** Never "Scaffold". Check every string. The website is "scafold.ai".
2. **Copy is king.** For Reels: Script and Caption are SEPARATE copy targets. For LinkedIn: single copy.
3. **Version A/B toggle swaps everything** — body, caption, audio, hook. Copy always copies active version.
4. **Reels script ≠ caption.** Script = what Tim says on camera (long, with `[stage directions]`). Caption = short Instagram caption. Different text. Different copy buttons.
5. **Mobile-friendly.** Tim posts from his phone. Large tappable copy buttons. Finger-friendly version toggle.
6. **NO LEGACY POSTS.** The old 37 posts must be completely removed. Only V3 content in the dashboard.
7. **Keep it simple.** No auth, no AI calls, no complex state. localStorage for persistence. Tool for 2 people.
8. **Waitlist-only language.** All CTAs: "Join the waitlist" not "Go use it". Product hasn't launched.

## FILE REFERENCE

New content source: `Scafold_Campaign_V3.md` (project root)

Files to **DELETE**:
- `src/data/posts.ts` (old 37 posts — replace with new V3 posts)
- `src/data/postsVersionB.ts` (old Version B lookup — no longer needed)

Files to **UPDATE**:
- `src/lib/types.ts` — new Post interface
- `src/components/PostCard.tsx` — Reel support, inline Version B
- `src/components/PostDetail.tsx` — Reel-specific sections
- `src/components/FilterBar.tsx` — format filter, week options
- `src/components/TabNav.tsx` — tab labels
- `src/components/QuickReference.tsx` — V3 brand voice
- `src/app/content/scafold/page.tsx` — new imports, waitlist tracker
- `src/lib/db.ts` — winner field persistence

Files to **CREATE**:
- `src/data/posts.ts` (new, V3 content only)
- `src/components/WaitlistTracker.tsx`
- `src/components/FormatBadge.tsx`
- `src/components/AudioBadge.tsx`
- `src/components/TrendingAudioGuide.tsx`

Files to **KEEP AS-IS**:
- `src/data/ideas.ts` — ideas bank still valid
- `src/components/CopyButton.tsx`
- `src/components/StatusBadge.tsx`
- `src/components/PlatformBadge.tsx`
- `src/components/ProgressBar.tsx`
- `src/components/SearchBar.tsx`
- `src/components/CalendarView.tsx`
- `src/components/IdeasBank.tsx`
- `src/components/Toast.tsx`
- `src/lib/api.ts`
- `src/lib/neon.ts`

## DONE WHEN

- [ ] Old 37 posts are completely gone — no trace in data files or UI
- [ ] V3 posts appear in the dashboard (14 Tim Reels + 7 Dylan LinkedIn)
- [ ] Tim's Reels show "Copy Script" and "Copy Caption" as separate buttons
- [ ] Audio suggestions display on Reel cards with copy button
- [ ] Format badges show on cards (Reel / Text)
- [ ] Version A/B toggle works for all posts (swaps body, caption, audio, hook)
- [ ] 3 hook options display per post with individual copy buttons
- [ ] Waitlist goal tracker shows at top of page (editable number, progress bar to 10K)
- [ ] Trending Audio Guide section is accessible
- [ ] Tab labels say "Tim (IG)" and "Dylan (LI)"
- [ ] Format filter works in FilterBar
- [ ] All copy buttons work on mobile
- [ ] No instances of "Scaffold" (wrong spelling) anywhere in the codebase
- [ ] No broken imports — zero references to old `postsVersionB` or old post data
- [ ] `npm run build` succeeds with zero errors
