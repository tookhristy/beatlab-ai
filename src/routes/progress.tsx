import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, Progress } from "@/components/ui-kit/primitives";
import { Award, Flame, Zap, Trophy, Clock } from "lucide-react";

export const Route = createFileRoute("/progress")({
  component: ProgressPage,
});

const badges = [
  { name: "First beat", color: "purple", earned: true },
  { name: "7-day streak", color: "orange", earned: true },
  { name: "Drum wizard", color: "blue", earned: true },
  { name: "Mix master", color: "green", earned: false },
  { name: "1,000 XP", color: "orange", earned: true },
  { name: "Genre hopper", color: "purple", earned: false },
];

function ProgressPage() {
  return (
    <AppShell>
      <PageHeader
        title="Your progress"
        subtitle="Every lesson, challenge, and hour of practice — visualized."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <BigStat icon={Zap} color="orange" label="Total XP" value="1,240" />
        <BigStat icon={Trophy} color="purple" label="Current level" value="6" />
        <BigStat icon={Flame} color="red" label="Streak" value="7 days" />
        <BigStat icon={Clock} color="blue" label="Practice hours" value="18h" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <h3 className="text-base font-semibold mb-4">Level 6 progress</h3>
          <div className="text-4xl font-semibold mb-1">240<span className="text-lg text-muted-foreground"> / 600 XP</span></div>
          <Progress value={40} color="purple" />
          <p className="mt-3 text-xs text-muted-foreground">360 XP until level 7 — Melody Architect</p>
        </Card>
        <Card>
          <h3 className="text-base font-semibold mb-4">Weekly goal</h3>
          <div className="grid grid-cols-7 gap-2 mb-3">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className="text-center">
                <div
                  className={`h-14 rounded-lg flex items-end justify-center pb-1 text-[10px] ${
                    i < 4 ? "bg-brand-purple/70" : "bg-white/[0.04] border border-border"
                  }`}
                >
                  {i < 4 && <span className="text-white">{40 + i * 20}</span>}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">4 of 5 practice days completed</p>
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
