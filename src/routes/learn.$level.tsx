import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Clock, Zap, ArrowLeft, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, Badge, Progress } from "@/components/ui-kit/primitives";
import { LEVEL_1, type Lesson } from "@/content/fl-manual/level-1";
import { useLevel1Progress } from "@/hooks/useLevel1Progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn/$level")({
  head: ({ params }) => ({
    meta: [
      { title: `Level ${params.level}: ${LEVEL_1.title} — learnbeats.app` },
      {
        name: "description",
        content:
          "Bite-sized, interactive lessons on FL Studio's interface — Browser, Channel Rack, Playlist, Piano Roll, Mixer. Adapted from the official FL Studio Manual.",
      },
      { property: "og:title", content: `Level ${params.level}: ${LEVEL_1.title} — learnbeats.app` },
      {
        property: "og:description",
        content: "Interactive FL Studio lessons — learn like a producer's sitting next to you.",
      },
    ],
  }),
  loader: ({ params }) => {
    if (params.level !== "1") throw notFound();
    return { level: LEVEL_1 };
  },
  component: LevelPage,
});

function LevelPage() {
  const level = LEVEL_1;
  const lessons: Lesson[] = level.lessons;
  const { isDone, doneCount, reset } = useLevel1Progress();
  const total = level.lessons.length;
  const pct = Math.round((doneCount / total) * 100);

  return (
    <AppShell>
      <Link
        to="/learn"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Roadmap
      </Link>

      <PageHeader title={`Level ${level.n} · ${level.title}`} subtitle={level.subtitle} />

      <Card className="mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-sm text-muted-foreground">Level progress</div>
            <div className="text-2xl font-semibold mt-1">
              {doneCount} / {total} lessons
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge color="orange">
              <Zap className="w-3 h-3" /> {total * 40} XP total
            </Badge>
            <Badge color="muted">
              <Clock className="w-3 h-3" />
              ~{level.lessons.reduce((s, l) => s + l.minutes, 0)} min
            </Badge>
            {doneCount > 0 && (
              <button
                onClick={reset}
                className="text-xs text-muted-foreground hover:text-foreground transition px-2 py-1"
              >
                Reset progress
              </button>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Progress value={pct} color={doneCount === total ? "green" : "purple"} />
        </div>
      </Card>

      <ol className="relative border-l border-border/60 ml-3 space-y-3">
        {level.lessons.map((lesson, i) => {
          const done = isDone(lesson.slug);
          const prevDone = i === 0 || isDone(level.lessons[i - 1].slug);
          const isLocked = !done && !prevDone;

          const dotCls = cn(
            "absolute -left-[13px] top-6 w-6 h-6 rounded-full border-2 flex items-center justify-center",
            done
              ? "bg-brand-green border-brand-green"
              : isLocked
                ? "bg-background border-border"
                : "bg-brand-purple border-brand-purple",
          );

          const inner = (
            <Card
              interactive={!isLocked}
              className={cn(
                "ml-6 transition",
                isLocked && "opacity-50",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-muted-foreground">Lesson {i + 1}</span>
                    {done && <Badge color="green">Done</Badge>}
                    {!done && !isLocked && i === 0 && <Badge color="blue">Start here</Badge>}
                    {!done && !isLocked && i > 0 && <Badge color="purple">Unlocked</Badge>}
                    {isLocked && <Badge color="muted">Locked</Badge>}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">{lesson.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{lesson.short}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lesson.minutes} min
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Zap className="w-3 h-3 text-brand-orange" /> {lesson.xp} XP
                    </span>
                  </div>
                </div>
                {!isLocked && <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />}
              </div>
            </Card>
          );

          return (
            <li key={lesson.slug} className="relative pl-6">
              <motion.div
                className={dotCls}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                {done && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
              </motion.div>

              {isLocked ? (
                inner
              ) : (
                <Link
                  to="/learn/$level/$lesson"
                  params={{ level: "1", lesson: lesson.slug }}
                  className="block"
                >
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-8 text-xs text-muted-foreground max-w-2xl">
        Content adapted from the official{" "}
        <a
          href="https://www.image-line.com/fl-studio-learning/fl-studio-online-manual"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 underline hover:text-foreground"
        >
          FL Studio Manual <ExternalLink className="w-3 h-3" />
        </a>{" "}
        by Image-Line. learnbeats.app is an independent learning tool and is not affiliated with Image-Line Software.
      </p>
    </AppShell>
  );
}
