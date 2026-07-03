import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, Badge } from "@/components/ui-kit/primitives";
import { Zap, Clock, Upload, Trophy } from "lucide-react";

export const Route = createFileRoute("/practice")({
  component: PracticePage,
});

const challenges = [
  { title: "Make an 8-bar drum loop", diff: "Beginner", xp: 60, time: "15 min", color: "green" },
  { title: "Build a trap beat at 140 BPM", diff: "Intermediate", xp: 120, time: "25 min", color: "purple" },
  { title: "Create an R&B chord progression", diff: "Intermediate", xp: 100, time: "20 min", color: "blue" },
  { title: "Mix a vocal with EQ + comp + reverb", diff: "Advanced", xp: 200, time: "45 min", color: "orange" },
  { title: "Arrange a full 2-minute beat", diff: "Advanced", xp: 240, time: "50 min", color: "red" },
  { title: "Design an 808 with sub layer", diff: "Intermediate", xp: 90, time: "20 min", color: "purple" },
] as const;

function PracticePage() {
  return (
    <AppShell>
      <PageHeader
        title="Practice arena"
        subtitle="Real production challenges. Complete, upload a screenshot, and get instant AI feedback."
        action={
          <div className="hidden md:flex items-center gap-2 px-4 h-11 rounded-lg bg-white/[0.03] border border-border text-sm">
            <Trophy className="w-4 h-4 text-brand-orange" />
            <span className="font-semibold">4 challenges</span>
            <span className="text-muted-foreground">completed this week</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((c) => (
          <Card key={c.title} interactive className="flex flex-col">
            <div className="flex items-center justify-between">
              <Badge color={c.color as "purple"}>{c.diff}</Badge>
              <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> {c.time}
              </span>
            </div>
            <h3 className="mt-3 text-base font-semibold leading-snug">{c.title}</h3>
            <div className="mt-4 flex-1 rounded-lg border border-dashed border-border p-4 flex flex-col items-center justify-center text-center bg-white/[0.02]">
              <Upload className="w-5 h-5 text-muted-foreground mb-2" />
              <div className="text-xs text-muted-foreground">
                Drop a screenshot from FL Studio
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-orange">
                <Zap className="w-4 h-4" /> +{c.xp} XP
              </span>
              <button className="h-9 px-4 rounded-lg bg-hero-gradient text-sm font-semibold">
                Start
              </button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
