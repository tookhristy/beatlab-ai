import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, Badge, Progress } from "@/components/ui-kit/primitives";
import { Lock, CheckCircle2, Play, Clock, Zap } from "lucide-react";
import { useLevel1Progress } from "@/hooks/useLevel1Progress";
import { LEVEL_1 } from "@/content/fl-manual/level-1";

export const Route = createFileRoute("/learn/")({
  component: LearnPage,
});

type LevelState = "complete" | "active" | "available" | "locked";
type LevelCard = {
  n: number;
  title: string;
  desc: string;
  lessons: number;
  done: number;
  state: LevelState;
  href?: "/learn/$level";
  params?: { level: string };
};

const staticLevels: LevelCard[] = [
  {
    n: 2,
    title: "Drums",
    desc: "Kick, snare, hats, velocity, swing & patterns.",
    lessons: 9,
    done: 0,
    state: "locked",
  },
  {
    n: 3,
    title: "Melodies",
    desc: "Scales, chords, intervals, voicings, counter-melodies.",
    lessons: 6,
    done: 0,
    state: "locked",
  },
  {
    n: 4,
    title: "Bass",
    desc: "808s, basslines, slides, sidechain compression.",
    lessons: 6,
    done: 0,
    state: "locked",
  },
  { n: 5, title: "Arrangement", desc: "Intro, verse, hook, bridge, outro.", lessons: 5, done: 0, state: "locked" },
  { n: 6, title: "Mixing", desc: "EQ, compression, reverb, delay, width, gain staging.", lessons: 8, done: 0, state: "locked" },
  { n: 7, title: "Mastering", desc: "Limiter, LUFS, reference tracks.", lessons: 4, done: 0, state: "locked" },
  { n: 8, title: "Exporting & selling", desc: "Streaming exports & beat selling.", lessons: 3, done: 0, state: "locked" },
];

function LearnPage() {
  const { doneCount } = useLevel1Progress();
  const total = LEVEL_1.lessons.length;
  const l1State: LevelState =
    doneCount >= total ? "complete" : doneCount > 0 ? "active" : "available";

  const level1: LevelCard = {
    n: 1,
    title: LEVEL_1.title,
    desc: "Channel Rack, Playlist, Mixer, Piano Roll & Browser — the five windows you'll use every session.",
    lessons: total,
    done: doneCount,
    state: l1State,
    href: "/learn/$level",
    params: { level: "1" },
  };

  const levels: LevelCard[] = [level1, ...staticLevels];

  return (
    <AppShell>
      <PageHeader
        title="Your roadmap"
        subtitle="A guided path from opening FL Studio for the first time to exporting release-ready beats. Personalized for Trap and R&B."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {levels.map((lv) => {
          const pct = Math.round((lv.done / lv.lessons) * 100);
          const isLocked = lv.state === "locked";
          const isComplete = lv.state === "complete";
          const body = (
            <Card
              key={lv.n}
              interactive={!isLocked}
              className={isLocked ? "opacity-60" : ""}
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-border flex items-center justify-center text-lg font-semibold">
                    {lv.n}
                  </div>
                  {isComplete && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand-green flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-black" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{lv.title}</h3>
                    {isComplete && <Badge color="green">Complete</Badge>}
                    {lv.state === "active" && <Badge color="purple">In progress</Badge>}
                    {lv.state === "available" && <Badge color="blue">Start here</Badge>}
                    {isLocked && (
                      <Badge color="muted">
                        <Lock className="w-3 h-3" /> Locked
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{lv.desc}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {lv.done} / {lv.lessons} lessons
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ~{lv.lessons * 8} min ·
                        <Zap className="w-3 h-3 text-brand-orange" /> {lv.lessons * 40} XP
                      </span>
                    </div>
                    <Progress value={pct} color={isComplete ? "green" : "purple"} />
                  </div>
                </div>
              </div>

              {!isLocked && (
                <div className="mt-5 w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-white/[0.05] border border-border text-sm font-medium hover:bg-white/[0.1] transition">
                  <Play className="w-3.5 h-3.5" />
                  {isComplete ? "Review level" : lv.done > 0 ? "Continue level" : "Start level"}
                </div>
              )}
            </Card>
          );

          if (lv.href && lv.params) {
            return (
              <Link key={lv.n} to={lv.href} params={lv.params} className="block">
                {body}
              </Link>
            );
          }
          return <div key={lv.n}>{body}</div>;
        })}
      </div>
    </AppShell>
  );
}

