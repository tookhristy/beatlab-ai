
# Connect Level 1 · Lesson 1 to Lovable Cloud

Trial run: wire the first lesson (Interface Tour) end-to-end. If it feels right, we repeat the same pattern for lessons 2–9 in a follow-up.

## Legal note on media (short version)

- **Image-Line's screenshots / manual images / videos**: not safe to copy or hotlink into learnbeats.app. Copyright + trademark risk.
- **Deep-link to their manual page**: fine (already doing it).
- **Embed their official YouTube video** via YouTube's embed player: fine — YouTube's ToS explicitly licenses embedding, and the video stays on their channel.
- **Your own screenshots / short screen recordings of FL Studio**: standard practice for tutorials, generally accepted as fair use for educational commentary. You own those.

So for each lesson we'll ship: (1) an official YouTube embed slot with a curated video ID, (2) an "your own media" gallery slot you can upload into later — no Image-Line assets copied into our app.

## What ships in this step

### 1. Auth gate for Level 1

- Move `src/routes/learn.$level.tsx` and `src/routes/learn.$level.$lesson.tsx` under `src/routes/_authenticated/` (the roadmap `/learn` index stays public so it's still shareable — locked cards show a "Sign in to start" CTA for anonymous visitors).
- Reuse the integration-managed `_authenticated/route.tsx` gate that Lovable Cloud ships (Google + email/password sign-in, per earlier setup).

### 2. Database (Lovable Cloud)

Two tables, RLS scoped to `auth.uid()`. Lesson content stays in `src/content/fl-manual/level-1.ts` — only user progress lives in the DB.

- `lesson_progress` — one row per `(user_id, level, lesson_slug)`. Columns: `id`, `user_id`, `level int`, `lesson_slug text`, `completed_at timestamptz`, `xp_awarded int`, `created_at`, `updated_at`. Unique `(user_id, level, lesson_slug)`.
- `quiz_attempts` — history of every quiz submission. Columns: `id`, `user_id`, `level`, `lesson_slug`, `score int`, `total int`, `passed bool`, `answers jsonb`, `created_at`.

Grants: `authenticated` full CRUD on both, `service_role` ALL, no `anon` access. RLS: users can only read/write their own rows.

### 3. Server functions (TanStack `createServerFn`)

In `src/lib/lesson-progress.functions.ts`, all using `.middleware([requireSupabaseAuth])`:

- `getLevelProgress({ level })` — returns `{ [lessonSlug]: { completed_at, xp_awarded } }` for the current user.
- `completeLesson({ level, lessonSlug, xp })` — upsert on `(user_id, level, lesson_slug)`; idempotent (never double-awards XP).
- `recordQuizAttempt({ level, lessonSlug, score, total, passed, answers })` — insert into `quiz_attempts`.

Called from the lesson page via `useServerFn` + TanStack Query (cache key `["lesson-progress", level]`, invalidate on complete).

### 4. Replace `useLevel1Progress` (localStorage) with the DB-backed hook

- New `useLevelProgress(level)` reads via `useSuspenseQuery` in a loader, exposes `{ isDone, doneCount, complete, xpTotal }`.
- `learn.index.tsx`, `learn.$level.tsx`, `learn.$level.$lesson.tsx` switch to the new hook. Old localStorage hook deleted.
- Loader path: only the `_authenticated/learn.$level.*` loaders call the protected server fn — the public `/learn` index shows anonymous state until sign-in.

### 5. Lesson 1 media (Interface Tour)

Extend the `Lesson` type in `src/content/fl-manual/level-1.ts` with two optional fields:

- `youtubeId?: string` — for lesson 1, seed with Image-Line's official "FL Studio Interface Tour" video ID (I'll pick a current one from their channel during build). Rendered in the lesson header as a responsive 16:9 embed with `youtube-nocookie.com`, `title` attribute, and a small "Video by Image-Line via YouTube" caption.
- `gallery?: { url: string; alt: string; caption?: string }[]` — reserved for your own screenshots/recordings. Uploads are **out of scope for this step**; I'll render an empty state ("Your screenshots will appear here") plus a code comment showing exactly how to add entries.

If you later want an in-app uploader, that's a small follow-up (Lovable Cloud Storage bucket + drag-drop panel on the lesson page).

### 6. UX polish that comes with the switch

- Level 1 card on `/learn` shows real per-user progress and XP total once signed in; shows "Sign in to start Level 1" when signed out.
- Quiz "pass" animation now also awards DB XP; XP counter animates from previous → new total (read from `lesson_progress.xp_awarded` sum).
- Completed lessons persist across devices.

## Technical details

- **New files**: `src/lib/lesson-progress.functions.ts`, `src/hooks/useLevelProgress.ts`, `src/components/learn/LessonVideo.tsx`, `src/components/learn/LessonGallery.tsx`.
- **Moved files**: `learn.$level.tsx` and `learn.$level.$lesson.tsx` → `src/routes/_authenticated/learn.$level.tsx` and `.../learn.$level.$lesson.tsx`. `learn.index.tsx` stays public.
- **Deleted**: `src/hooks/useLevel1Progress.ts` (replaced).
- **Migration**: single SQL migration creating both tables, GRANTs, and RLS policies (`auth.uid() = user_id`).
- **Content**: only `interface-tour` gets a real `youtubeId` in this step; the other 8 lessons keep working exactly as they do today.
- **No new dependencies.**

## Out of scope for this step

- Wiring the other 8 Level-1 lessons to their own YouTube IDs (trivial once you approve the pattern — just fill in `youtubeId` per lesson).
- In-app screenshot/video upload UI + Storage bucket.
- Levels 2–8.
- Migrating any existing localStorage progress into the DB on first sign-in.

Approve and I'll build it.
