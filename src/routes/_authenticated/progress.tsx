import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, Progress } from "@/components/ui-kit/primitives";
import { Award, Flame, Zap, Trophy, Clock } from "lucide-react";
import { getUserStats } from "@/lib/lesson-progress.functions";
import { LEVEL_1 } from "@/content/fl-manual/level-1";

export const Route = createFileRoute("/_authenticated/progress")({
  component: ProgressPage,
});

// XP thresholds per level (cumulative). Level N reached at thresholds[N-1] XP.
const LEVEL_THRESHOLDS = [0, 200, 500, 900, 1400, 2000, 2700, 3500, 4400];

function levelFromXp(xp: number) {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }
  const nextIdx = Math.min(level, LEVEL_THRESHOLDS.length - 1);
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextThreshold = LEVEL_THRESHOLDS[nextIdx] ?? currentThreshold;
  const span = Math.max(1, nextThreshold - currentThreshold);
  const into = xp - currentThreshold;
  const pct = Math.min(100, Math.round((into / span) * 100));
  return { level, currentThreshold, nextThreshold, into, span, pct };
}

function ProgressPage() {
  const fetchStats = useServerFn(getUserStats);
  const { data, isLoading } = useQuery({
    queryKey: ["user-stats"],
    queryFn: () => fetchStats(),
    staleTime: 30_000,
  });

  const totalXp = data?.totalXp ?? 0;
  const streak = data?.streak ?? 0;
  const lessonsCompleted = data?.lessonsCompleted ?? 0;
  const weekly = data?.weekly ?? [];
  const doneByLevel = data?.doneByLevel ?? {};

  const { level, into, span, pct, nextThreshold } = levelFromXp(totalXp);
  const weeklyXp = weekly.reduce((s, d) => s + d.xp, 0);
  const practiceDays = weekly.filter((d) => d.xp > 0).length;
  const maxDayXp = Math.max(1, ...weekly.map((d) => d.xp));

  // Practice hours ~ heuristic: 8 minutes per completed lesson.
  const practiceHours = Math.round((lessonsCompleted * 8) / 60);

  const l1Done = doneByLevel[1] ?? 0;
  const l1Total = LEVEL_1.lessons.length;

  const badges = [
    { name: "First lesson", color: "purple", earned: lessonsCompleted >= 1 },
    { name: "3-day streak", color: "orange", earned: streak >= 3 },
    { name: "7-day streak", color: "red", earned: streak >= 7 },
    { name: "Level 1 done", color: "blue", earned: l1Done >= l1Total && l1Total > 0 },
    { name: "500 XP", color: "orange", earned: totalXp >= 500 },
    { name: "1,000 XP", color: "green", earned: totalXp >= 1000 },
  ];

  return (
    <AppShell>
      <PageHeader
        title="Your progress"
        subtitle="Every lesson, challenge, and hour of practice — visualized."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <BigStat icon={Zap} color="orange" label="Total XP" value={isLoading ? "—" : totalXp.toLocaleString()} />
        <BigStat icon={Trophy} color="purple" label="Current level" value={isLoading ? "—" : String(level)} />
        <BigStat icon={Flame} color="red" label="Streak" value={isLoading ? "—" : `${streak} day${streak === 1 ? "" : "s"}`} />
        <BigStat icon={Clock} color="blue" label="Practice hours" value={isLoading ? "—" : `${practiceHours}h`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <h3 className="text-base font-semibold mb-4">Level {level} progress</h3>
          <div className="text-4xl font-semibold mb-1">
            {into}
            <span className="text-lg text-muted-foreground"> / {span} XP</span>
          </div>
          <Progress value={pct} color="purple" />
          <p className="mt-3 text-xs text-muted-foreground">
            {Math.max(0, nextThreshold - totalXp)} XP until level {level + 1}
          </p>
        </Card>
        <Card>
          <h3 className="text-base font-semibold mb-4">This week</h3>
          <div className="grid grid-cols-7 gap-2 mb-3">
            {weekly.map((d, i) => {
              const date = new Date(d.date);
              const label = ["S", "M", "T", "W", "T", "F", "S"][date.getUTCDay()];
              const heightPct = Math.round((d.xp / maxDayXp) * 100);
              return (
                <div key={d.date} className="text-center">
                  <div
                    className={`h-14 rounded-lg flex items-end justify-center pb-1 text-[10px] ${
                      d.xp > 0 ? "bg-brand-purple/70" : "bg-white/[0.04] border border-border"
                    }`}
                    style={d.xp > 0 ? { opacity: 0.5 + (heightPct / 100) * 0.5 } : undefined}
                  >
                    {d.xp > 0 && <span className="text-white">{d.xp}</span>}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{label}</div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {weeklyXp} XP across {practiceDays} practice day{practiceDays === 1 ? "" : "s"}
          </p>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-4 h-4 text-brand-purple" />
          <h3 className="text-base font-semibold">Badges</h3>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {badges.map((b) => (
            <div key={b.name} className={`text-center ${!b.earned && "opacity-40 grayscale"}`}>
              <div
                className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center bg-brand-${b.color}/15 border border-brand-${b.color}/30`}
              >
                <Award className={`w-7 h-7 text-brand-${b.color}`} />
              </div>
              <div className="mt-2 text-xs font-medium">{b.name}</div>
              <div className="text-[10px] text-muted-foreground">{b.earned ? "Earned" : "Locked"}</div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}

function BigStat({
  icon: Icon,
  color,
  label,
  value,
}: {
  icon: typeof Award;
  color: "orange" | "purple" | "blue" | "red";
  label: string;
  value: string;
}) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg bg-brand-${color}/15 flex items-center justify-center`}>
          <Icon className={`w-4 h-4 text-brand-${color}`} />
        </div>
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <div className="text-3xl font-semibold tracking-tight">{value}</div>
    </Card>
  );
}
