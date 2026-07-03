# Level 1 tutorial: "The FL Studio interface"

Turn the currently static Level 1 card on `/learn` into a real, clickable lesson flow, with content sourced from the official FL Studio online manual (image-line.com/fl-studio-learning/fl-studio-online-manual).

## What the user will experience

1. On `/learn`, clicking **Level 1 → The FL Studio interface** navigates to a new lesson index route.
2. The lesson index shows 9 bite-sized lessons in Duolingo-style vertical steps (Interface Tour, Browser, Channel Rack, Playlist, Piano Roll, Mixer, Transport, Patterns vs Clips, Saving a Project).
3. Clicking a lesson opens the lesson player with:
   - Short explainer (2–4 short paragraphs, learnbeats voice, distilled from the FL manual, with a "Source: FL Studio Manual" link + section anchor).
   - An annotated screenshot / diagram slot (image placeholder for now, alt text ready).
   - A "Try it" checklist (3–5 micro-tasks — e.g. "Open the Channel Rack with the F6 shortcut").
   - A 3-question knowledge check (multiple choice, instant feedback, animated checkmarks, XP counts up on pass).
   - Prev / Next navigation, progress bar across the 9 lessons, and an "Ask the AI Producer" button that deep-links to `/ai-producer` pre-seeded with the lesson topic.
4. Completing all 9 lessons animates the Level 1 badge to "Complete" and unlocks Level 2's CTA state (local state for now).

## Content sourcing approach

- Use Firecrawl (already documented in context) via a server function to scrape the relevant FL Studio manual pages once at build/dev time and cache the distilled outlines under `src/content/fl-manual/level-1/*.json` (title, summary, key points, shortcuts, source URL). No live scrape at request time.
- Lesson copy is our own paraphrase + shortcuts table; we link back to the official manual page for each lesson ("Read the full manual section →"). This keeps us clear of copying manual prose verbatim.
- If Firecrawl isn't connected yet, I'll ship the same JSON files hand-written from the manual's public TOC and wire Firecrawl as an optional refresher step — the UI works either way.

## Routes & files (frontend only, no backend/auth changes)

- `src/routes/learn.$level.tsx` — lesson index for a level (`/learn/1`), reads from content JSON.
- `src/routes/learn.$level.$lesson.tsx` — lesson player (`/learn/1/interface-tour`).
- `src/components/learn/LessonStepList.tsx`, `LessonPlayer.tsx`, `QuizBlock.tsx`, `TryItChecklist.tsx`, `ManualSourceLink.tsx`.
- `src/content/fl-manual/level-1/index.json` + one file per lesson (title, summary, key points, shortcuts, tryIt[], quiz[], sourceUrl, sourceAnchor).
- Update `src/routes/learn.tsx`: Level 1 card becomes a `<Link to="/learn/$level" params={{ level: "1" }}>`; other levels stay locked/static.
- Local progress persisted in `localStorage` under `learnbeats:progress:level-1` (no Cloud needed for this step).

## Technical notes

- Pure TanStack Start route files with `head()` metadata per lesson (title = "Lesson name — Level 1 · learnbeats.app", unique description).
- Framer Motion for checkmark, XP count-up, and lesson-unlock reveal (matches existing microinteractions).
- No new dependencies beyond what's already installed; Firecrawl integration is gated behind a "Refresh from manual" dev-only server function and is optional.
- Attribution: every lesson footer links to the exact manual page and shows "Content adapted from the official FL Studio Manual by Image-Line."

## Out of scope for this step

- Levels 2–8 stay as-is.
- No auth, no DB persistence (localStorage only for now).
- No audio playback of FL Studio inside the lesson.

Confirm and I'll build it.
