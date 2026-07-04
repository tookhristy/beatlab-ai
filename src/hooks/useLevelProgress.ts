import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { completeLesson, getLevelProgress, recordQuizAttempt } from "@/lib/lesson-progress.functions";

export type LessonProgressMap = Record<string, { completed_at: string; xp_awarded: number }>;

export function levelProgressQueryOptions(level: number) {
  const fetchIt = () => getLevelProgress({ data: { level } });
  return queryOptions({
    queryKey: ["lesson-progress", level] as const,
    queryFn: async () => (await fetchIt()).progress as LessonProgressMap,
    staleTime: 30_000,
  });
}

export function useLevelProgress(level: number) {
  const qc = useQueryClient();
  const fetchIt = useServerFn(getLevelProgress);
  const completeFn = useServerFn(completeLesson);
  const recordFn = useServerFn(recordQuizAttempt);

  const query = useQuery({
    queryKey: ["lesson-progress", level] as const,
    queryFn: async () => (await fetchIt({ data: { level } })).progress as LessonProgressMap,
    staleTime: 30_000,
  });

  const complete = useMutation({
    mutationFn: async (input: { lessonSlug: string; xp: number }) =>
      completeFn({ data: { level, ...input } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lesson-progress", level] }),
  });

  const recordAttempt = useMutation({
    mutationFn: async (input: {
      lessonSlug: string;
      score: number;
      total: number;
      passed: boolean;
      answers: number[];
    }) => recordFn({ data: { level, ...input } }),
  });

  const progress: LessonProgressMap = query.data ?? {};
  const doneCount = Object.keys(progress).length;
  const xpTotal = Object.values(progress).reduce((s, v) => s + v.xp_awarded, 0);
  const isDone = (slug: string) => !!progress[slug];

  return {
    progress,
    doneCount,
    xpTotal,
    isDone,
    isLoading: query.isLoading,
    complete: complete.mutateAsync,
    recordAttempt: recordAttempt.mutateAsync,
  };
}
