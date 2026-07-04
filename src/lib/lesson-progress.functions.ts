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
