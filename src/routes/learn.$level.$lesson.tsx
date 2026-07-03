import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles, Keyboard, Target, BookOpen } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, Badge, Progress } from "@/components/ui-kit/primitives";
import { LEVEL_1, type Lesson } from "@/content/fl-manual/level-1";
import { useLevel1Progress } from "@/hooks/useLevel1Progress";
import { QuizBlock } from "@/components/learn/QuizBlock";
import { TryItChecklist } from "@/components/learn/TryItChecklist";

type LoaderData = {
  lesson: Lesson;
  index: number;
  total: number;
  prev: Lesson | null;
  next: Lesson | null;
};

export const Route = createFileRoute("/learn/$level/$lesson")({
  head: ({ params, loaderData }) => {
    const data = loaderData as LoaderData | undefined;
    const title = data?.lesson.title ?? "Lesson";
    const desc = data?.lesson.short ?? "FL Studio lesson on learnbeats.app.";
    return {
      meta: [
        { title: `${title} — Level ${params.level} · learnbeats.app` },
        { name: "description", content: desc },
        { property: "og:title", content: `${title} — Level ${params.level} · learnbeats.app` },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }): LoaderData => {
    if (params.level !== "1") throw notFound();
    const idx = LEVEL_1.lessons.findIndex((l) => l.slug === params.lesson);
    if (idx === -1) throw notFound();
    return {
      lesson: LEVEL_1.lessons[idx],
      index: idx,
      total: LEVEL_1.lessons.length,
      prev: idx > 0 ? LEVEL_1.lessons[idx - 1] : null,
      next: idx < LEVEL_1.lessons.length - 1 ? LEVEL_1.lessons[idx + 1] : null,
    };
  },
  notFoundComponent: LessonNotFound,
  errorComponent: LessonError,
  component: LessonPage,
});

function LessonNotFound() {
  return (
    <AppShell>
      <div className="max-w-lg text-center mx-auto py-16">
        <h2 className="text-2xl font-semibold">Lesson not found</h2>
        <p className="mt-2 text-muted-foreground">
          That lesson doesn't exist yet. Head back to the roadmap.
        </p>
        <Link to="/learn" className="inline-block mt-4 text-brand-purple underline">
          Back to roadmap
        </Link>
      </div>
    </AppShell>
  );
}

function LessonError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <AppShell>
      <div className="max-w-lg text-center mx-auto py-16">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="mt-2 text-muted-foreground text-sm">{error.message}</p>
        <button onClick={reset} className="mt-4 text-brand-purple underline">
          Try again
        </button>
      </div>
    </AppShell>
  );
}

function LessonPage() {
  const { lesson, index, total, prev, next } = Route.useLoaderData();
  const { complete, isDone } = useLevel1Progress();
  const navigate = useNavigate();
  const pct = Math.round(((index + 1) / total) * 100);
  const done = isDone(lesson.slug);

  return (
    <AppShell>
      <Link
        to="/learn/$level"
        params={{ level: "1" }}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Level 1 · The FL Studio interface
      </Link>

      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
        <span>
          Lesson {index + 1} of {total}
        </span>
        {done && <Badge color="green">Completed</Badge>}
      </div>
      <Progress value={pct} color="purple" />

      <div className="mt-6 flex items-start justify-between gap-4 flex-wrap">
        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight max-w-3xl">
          {lesson.title}
        </h1>
        <a
          href={lesson.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition px-3 py-1.5 rounded-lg border border-border"
        >
          <BookOpen className="w-3.5 h-3.5" /> {lesson.sourceLabel} <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <p className="mt-2 text-muted-foreground max-w-2xl">{lesson.short}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold mb-3">What you'll learn</h2>
            <div className="space-y-3 text-[15px] leading-relaxed text-foreground/85">
              {lesson.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 grid gap-2">
              {lesson.keyPoints.map((kp, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-lg bg-white/[0.02] border border-border/60 px-3 py-2 text-sm"
                >
                  <span className="text-brand-purple mt-0.5">•</span>
                  <span>{kp}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-brand-orange" />
              <h2 className="text-lg font-semibold">Try it in FL Studio</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Do each of these in your own FL Studio project. Tick them off as you go.
            </p>
            <TryItChecklist items={lesson.tryIt} />
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-1">Knowledge check</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Get all {lesson.quiz.length} right to earn {lesson.xp} XP and mark the lesson complete.
            </p>
            <QuizBlock
              questions={lesson.quiz}
              xp={lesson.xp}
              onPass={() => complete(lesson.slug)}
            />
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Keyboard className="w-4 h-4 text-brand-blue" />
              <h3 className="font-semibold">Shortcuts</h3>
            </div>
            <ul className="space-y-2">
              {lesson.shortcuts.map((s, i) => (
                <li key={i} className="flex items-center justify-between gap-3 text-sm">
                  <kbd className="px-2 py-0.5 rounded bg-white/[0.06] border border-border font-mono text-xs">
                    {s.keys}
                  </kbd>
                  <span className="text-muted-foreground text-right">{s.does}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-brand-purple" />
              <h3 className="font-semibold">Stuck?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Ask the AI Producer anything about this lesson.
            </p>
            <button
              onClick={() =>
                navigate({
                  to: "/ai-producer",
                  search: { topic: lesson.title } as never,
                })
              }
              className="w-full h-10 rounded-lg bg-brand-purple text-white text-sm font-medium hover:opacity-90 transition"
            >
              Open AI Producer
            </button>
          </Card>
        </aside>
      </div>

      <div className="mt-10 flex items-center justify-between gap-3">
        {prev ? (
          <Link
            to="/learn/$level/$lesson"
            params={{ level: "1", lesson: prev.slug }}
            className="inline-flex items-center gap-2 h-11 px-4 rounded-lg border border-border hover:bg-white/[0.05] transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-muted-foreground">Previous</span>
            <span className="font-medium">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/learn/$level/$lesson"
            params={{ level: "1", lesson: next.slug }}
            className="inline-flex items-center gap-2 h-11 px-4 rounded-lg bg-brand-purple text-white text-sm font-medium hover:opacity-90 transition"
          >
            <span>Next: {next.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            to="/learn/$level"
            params={{ level: "1" }}
            className="inline-flex items-center gap-2 h-11 px-4 rounded-lg bg-brand-green text-black text-sm font-medium hover:opacity-90 transition"
          >
            <span>Finish level</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </AppShell>
  );
}
