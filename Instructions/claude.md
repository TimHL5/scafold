# CLAUDE.MD — Scafold Content Hub

## Project Overview

This is an internal content operations dashboard for the Scafold (one f, not "Scaffold") "What Bugs You?" marketing campaign. Two founders — **Tim Liu** and **Dylan Kim** — plus the **Scafold company brand accounts** each have separate posting schedules across LinkedIn and Instagram. This dashboard makes it dead simple to find today's post, copy the text, and mark it done.

**The #1 use case:** Open the page → find the next post → click Copy → paste into LinkedIn/Instagram → mark as Posted. That's it. Everything else is secondary.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS — minimal, dark theme, no component library bloat
- **Database:** SQLite via better-sqlite3 (or Prisma with SQLite) for status/notes persistence
- **Deployment:** Vercel-ready
- **No auth required** — this is an internal tool for 2 people

## Design System

### Philosophy
Minimalist. Functional. Zero friction. Think Notion's simplicity meets a production content queue. No gradients, no decorative elements, no animations beyond subtle transitions. White space is king.

### Colors
```
Background:        #0A0A0A
Card:              #111111
Card Hover:        #1A1A1A
Border:            rgba(255, 255, 255, 0.06)
Text Primary:      #FFFFFF
Text Secondary:    rgba(255, 255, 255, 0.6)
Text Tertiary:     rgba(255, 255, 255, 0.35)

Status - Not Started:  #666666 (gray)
Status - Scheduled:    #F2C94C (yellow)
Status - Posted:       #6AC670 (green)

Platform - LinkedIn:   #0A66C2
Platform - Instagram:  #E1306C

Accent - Vermillion:   #E94560 (Scafold brand)
Accent - Blue:         #4361EE (Scafold brand)
```

### Typography
- Font: Inter or system sans-serif
- Post titles: semibold, 15px
- Post body/preview: regular, 14px
- Metadata (dates, platforms): 12px, text-secondary
- No uppercase transforms except status badges

### Spacing
- Card padding: 20px
- Card gap: 12px
- Border radius: 8px max (cards), 4px (badges/pills)
- Section spacing: 24px

## Page Structure

### URL
`/content/scafold` (or wherever it fits in existing routing)

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  SCAFOLD CONTENT HUB                           [🔍 Search]     │
├─────────────────────────────────────────────────────────────────┤
│  Campaign Progress Bar                                          │
│  Total: 37  |  Posted: 0  |  Scheduled: 0  |  Remaining: 37   │
│  Next Up: Tim — LinkedIn — Feb 22 — "The Teaser"              │
├─────────────────────────────────────────────────────────────────┤
│  [ Tim ]  [ Dylan ]  [ Scafold ]       [ Queue | Calendar ]    │
├─────────────────────────────────────────────────────────────────┤
│  Filters: [All Platforms ▼] [All Status ▼] [All Weeks ▼]      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌── Post Card ──────────────────────────────────────────────┐ │
│  │  ○ Not Started    Week 0 · Sat Feb 22 · LinkedIn          │ │
│  │  THE TEASER                                                │ │
│  │  "I've spent 3 years helping 500+ students across..."      │ │
│  │  [📋 Copy]  [👁 View Full]  [✏️ Notes]                    │ │
│  │  CTA: More next week  |  #buildinpublic #startups #AI     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌── Post Card ──────────────────────────────────────────────┐ │
│  │  ...next post...                                           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌── Collapsible: Ideas Bank ────────────────────────────────┐ │
│  │  Additional post concepts not yet scheduled                │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌── Collapsible: Quick Reference ───────────────────────────┐ │
│  │  Brand voice, platform rules, hashtags                     │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Core Features (Priority Order)

### 1. Copy to Clipboard (MOST IMPORTANT)
- One click copies the ENTIRE post body to clipboard
- Toast notification: "Copied ✓" (auto-dismiss after 2s)
- Must copy the full post text, not the preview
- Use `navigator.clipboard.writeText()` with fallback
- This is THE feature. If nothing else works, this must.

### 2. Post Cards
Each card shows:
- **Status pill**: clickable, cycles Not Started → Scheduled → Posted (or dropdown)
- **Week label**: "Week 0", "Week 1", "Week 2", "Week 3-4"
- **Date**: "Sat Feb 22"
- **Platform badge**: LinkedIn (blue) or Instagram (pink) with icon
- **Post type/title**: "The Teaser", "Frustration of Day #1", etc.
- **Preview**: First 2 lines of post body, truncated with ellipsis
- **Copy button**: Primary action — big, obvious, always visible
- **View Full button**: Expands to show complete post text + visual description + hashtags + character count + posting time recommendation
- **Notes button**: Opens inline editable text field for personal notes
- **CTA**: The call-to-action from the post
- **Hashtags**: Listed below the preview

When status = "Posted": card dims to ~60% opacity, green checkmark on status pill, optional posted-at timestamp.

### 3. Three Author Tabs
- **Tim**: Shows only Tim's posts (LinkedIn + Instagram)
- **Dylan**: Shows only Dylan's posts (LinkedIn + Instagram)
- **Scafold**: Shows only Scafold brand posts (LinkedIn + Instagram)
- Active tab: white text + bottom border accent
- Inactive: dimmed text, no border
- Stats bar updates to show tab-specific counts
- Add an **All** tab as well to see everything in chronological order

### 4. View Full / Post Detail
When clicking "View Full", expand the card (or slide-over panel) to show:
- Full post body with large "📋 Copy Full Post" button at top
- Visual description (Instagram posts only — what the design should look like)
- Platform posting rules (e.g., "Post between 7-10 AM ET")
- Hashtags (each clickable to copy individually)
- Word count and character count
- CTA text
- Notes field (editable)

### 5. Filters
Top of the card list:
- **Platform filter**: All | LinkedIn | Instagram
- **Status filter**: All | Not Started | Scheduled | Posted
- **Week filter**: All | Week 0 | Week 1 | Week 2 | Week 3-4

### 6. Search
- Search bar at top right of page
- Searches across: post body, post type, notes, hashtags, CTA
- Real-time filtering as user types
- Useful for: "find the therapist post", "which one mentions PwC"

### 7. Campaign Progress Bar
- Shows total posts, posted count, scheduled count, remaining count
- Simple progress bar (% posted)
- "Next Up" indicator: shows next unposted post with author, platform, date, title — clicking scrolls to that card
- Filters to match current tab (Tim/Dylan/Scafold)

### 8. Calendar View Toggle
Toggle between Queue (default, chronological card list) and Calendar (monthly grid):
- Calendar shows dots/pills on each day with posts
- LinkedIn = blue dot, Instagram = pink dot
- Click a day to see posts for that day
- Posts in day view have Copy buttons

### 9. Ideas Bank
Collapsible section below the main card list:
- Shows additional post concepts not on the calendar
- Each idea: Author tag, Platform, Hook/concept text, Copy button
- Optional: "Add to Queue" button to promote an idea to the main calendar with a date

### 10. Quick Reference
Collapsible section with:
- Brand voice summaries (Tim / Dylan / Scafold)
- Platform rules (LinkedIn timing, Instagram specs)
- Hashtag list with individual copy buttons
- Key links (scafold.ai)

## Data Model

### Posts Table
```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  post_number INTEGER,
  week TEXT,
  date TEXT,
  day_of_week TEXT,
  author TEXT,
  platform TEXT,
  post_type TEXT,
  hook TEXT,
  body TEXT,
  visual_description TEXT,
  cta TEXT,
  hashtags TEXT,
  posting_time TEXT,
  status TEXT DEFAULT 'not_started',
  posted_at TEXT,
  notes TEXT DEFAULT '',
  sort_order INTEGER
);
```

### Ideas Bank Table
```sql
CREATE TABLE ideas (
  id INTEGER PRIMARY KEY,
  author TEXT,
  platform TEXT,
  concept TEXT,
  full_draft TEXT,
  category TEXT,
  added_to_queue BOOLEAN DEFAULT FALSE
);
```

## Data Source

All post content comes from the file `Scafold_Master_Marketing_Prompt.md` in the project root. Parse this file to seed the database on first run. The file contains 37 scheduled posts with full body text, additional ideas for the Ideas Bank, brand voice guidelines, platform rules, hashtags and CTAs.

Create a seed script that reads the markdown, parses each `POST #N` entry, extracts all fields, and inserts into the database. Make it idempotent.

## API Routes

```
GET    /api/posts              — List all posts (with filters: author, platform, status, week)
PATCH  /api/posts/:id/status   — Update post status
PATCH  /api/posts/:id/notes    — Update post notes
GET    /api/posts/stats        — Get counts by status
GET    /api/ideas              — List all ideas bank items
GET    /api/search?q=          — Search posts
```

## Key Implementation Notes

1. **Spelling**: It's "Scafold" (one f). Never "Scaffold". The website is "scafold.ai". Check this everywhere in the UI and data.

2. **Copy must be bulletproof**: Test clipboard copy across browsers. Fallback to `document.execCommand('copy')` if needed. The copy button is the entire point of the app.

3. **Responsive**: Must work on mobile. Tim and Dylan will use this on their phones while posting. Stack cards full-width, make Copy button large and tappable.

4. **Persistence**: Status changes and notes must persist immediately. Use optimistic updates.

5. **Performance**: ~50 posts total. No pagination needed. Keep it fast.

6. **No auth**: Internal tool for 2 people. Optional simple password gate via env variable if deploying publicly.

## File Structure
```
/
├── claude.md
├── Scafold_Master_Marketing_Prompt.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── scripts/
│   └── seed.ts
├── prisma/ (or db/)
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── content/
│   │   │   └── scafold/
│   │   │       └── page.tsx
│   │   └── api/
│   │       ├── posts/
│   │       │   ├── route.ts
│   │       │   ├── [id]/
│   │       │   │   ├── status/route.ts
│   │       │   │   └── notes/route.ts
│   │       │   └── stats/route.ts
│   │       ├── ideas/route.ts
│   │       └── search/route.ts
│   ├── components/
│   │   ├── PostCard.tsx
│   │   ├── PostDetail.tsx
│   │   ├── CopyButton.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── PlatformBadge.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── TabNav.tsx
│   │   ├── FilterBar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── CalendarView.tsx
│   │   ├── IdeasBank.tsx
│   │   └── QuickReference.tsx
│   ├── lib/
│   │   ├── db.ts
│   │   └── types.ts
│   └── data/
│       └── posts.ts
└── public/
```

## What NOT to build
- No user authentication system
- No notification system  
- No AI features
- No complex analytics beyond the progress bar
- No dark/light mode toggle (always dark)
- No onboarding, settings, or emoji picker
- No rich text editor for notes (plain text only)
