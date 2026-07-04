import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const progressInput = z.object({ level: z.number().int().positive() });

export const getLevelProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => progressInput.parse(data))
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("lesson_progress")
      .select("lesson_slug, completed_at, xp_awarded")
      .eq("user_id", context.userId)
      .eq("level", data.level);
    if (error) throw new Error(error.message);
    const map: Record<string, { completed_at: string; xp_awarded: number }> = {};
    for (const r of rows ?? []) {
      map[r.lesson_slug] = { completed_at: r.completed_at, xp_awarded: r.xp_awarded };
    }
    return { progress: map };
  });

const completeInput = z.object({
  level: z.number().int().positive(),
  lessonSlug: z.string().min(1).max(100),
  xp: z.number().int().min(0).max(1000),
});

export const completeLesson = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => completeInput.parse(data))
  .handler(async ({ data, context }) => {
    // Idempotent: if already completed, keep original xp_awarded (don't double-award).
    const { data: existing } = await context.supabase
      .from("lesson_progress")
      .select("id, xp_awarded")
      .eq("user_id", context.userId)
      .eq("level", data.level)
      .eq("lesson_slug", data.lessonSlug)
      .maybeSingle();

    if (existing) {
      return { ok: true, alreadyCompleted: true, xpAwarded: existing.xp_awarded };
    }

    const { error } = await context.supabase.from("lesson_progress").insert({
      user_id: context.userId,
      level: data.level,
      lesson_slug: data.lessonSlug,
      xp_awarded: data.xp,
    });
    if (error) throw new Error(error.message);
    return { ok: true, alreadyCompleted: false, xpAwarded: data.xp };
  });

const attemptInput = z.object({
  level: z.number().int().positive(),
  lessonSlug: z.string().min(1).max(100),
  score: z.number().int().min(0),
  total: z.number().int().min(1),
  passed: z.boolean(),
  answers: z.array(z.number().int().min(-1)).max(50),
});

export const recordQuizAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => attemptInput.parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("quiz_attempts").insert({
      user_id: context.userId,
      level: data.level,
      lesson_slug: data.lessonSlug,
      score: data.score,
      total: data.total,
      passed: data.passed,
      answers: data.answers,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getUserStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: rows, error } = await context.supabase
      .from("lesson_progress")
      .select("level, lesson_slug, completed_at, xp_awarded")
      .eq("user_id", context.userId)
      .order("completed_at", { ascending: false });
    if (error) throw new Error(error.message);

    const completions = rows ?? [];
    const totalXp = completions.reduce((s, r) => s + (r.xp_awarded ?? 0), 0);
    const lessonsCompleted = completions.length;

    // Group completion days (YYYY-MM-DD in UTC) into a set.
    const dayKey = (iso: string) => new Date(iso).toISOString().slice(0, 10);
    const daySet = new Set(completions.map((r) => dayKey(r.completed_at)));

    // Streak: consecutive days ending today or yesterday.
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    let streak = 0;
    const cursor = new Date(today);
    if (!daySet.has(cursor.toISOString().slice(0, 10))) {
      // allow streak to start from yesterday if no activity yet today
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    while (daySet.has(cursor.toISOString().slice(0, 10))) {
      streak += 1;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }

    // Weekly XP: last 7 days including today, oldest first.
    const weekly: { date: string; xp: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setUTCDate(d.getUTCDate() - i);
      const key = d.toISOString().slice(0, 10);
      const xp = completions
        .filter((r) => dayKey(r.completed_at) === key)
        .reduce((s, r) => s + (r.xp_awarded ?? 0), 0);
      weekly.push({ date: key, xp });
    }

    // XP per level for quick access.
    const xpByLevel: Record<number, number> = {};
    const doneByLevel: Record<number, number> = {};
    for (const r of completions) {
      xpByLevel[r.level] = (xpByLevel[r.level] ?? 0) + (r.xp_awarded ?? 0);
      doneByLevel[r.level] = (doneByLevel[r.level] ?? 0) + 1;
    }

    return { totalXp, lessonsCompleted, streak, weekly, xpByLevel, doneByLevel };
  });
