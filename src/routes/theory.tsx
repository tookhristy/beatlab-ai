import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, Badge } from "@/components/ui-kit/primitives";
import { Music2 } from "lucide-react";

export const Route = createFileRoute("/theory")({
  component: TheoryPage,
});

const modules = [
  { title: "Scales & keys", desc: "Major, minor, and modes that fit trap, R&B, and lo-fi.", diff: "Beginner" },
  { title: "Intervals", desc: "How notes relate. Train your ear.", diff: "Beginner" },
  { title: "Chord building", desc: "Triads, 7ths, extensions, slash chords.", diff: "Intermediate" },
  { title: "Roman numerals", desc: "Analyze songs & steal progressions.", diff: "Intermediate" },
  { title: "Circle of Fifths", desc: "Modulate between keys smoothly.", diff: "Advanced" },
  { title: "Voice leading", desc: "Smooth chord movement pros use.", diff: "Advanced" },
] as const;

function TheoryPage() {
  return (
    <AppShell>
      <PageHeader
        title="Music theory"
        subtitle="Just enough theory to write melodies that hit — no dusty textbook, just producer-first modules."
      />

      <Card className="mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-50" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <Badge color="purple">Interactive</Badge>
            <h3 className="mt-3 text-2xl font-semibold">Piano roll trainer</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Play back chords, hear intervals, and see them highlighted on the roll in real time.
            </p>
            <button className="mt-4 h-10 px-5 rounded-lg bg-hero-gradient text-sm font-semibold">
              Open trainer
            </button>
          </div>
          <div className="flex-1 grid grid-cols-14 gap-0.5">
            {Array.from({ length: 28 }).map((_, i) => {
              const isBlack = [1, 3, 6, 8, 10, 13, 15, 18, 20, 22, 25, 27].includes(i % 28);
              return (
                <div
                  key={i}
                  className={`h-16 rounded-sm ${
                    isBlack ? "bg-white/10" : "bg-white/70"
                  } ${i === 5 ? "bg-brand-purple" : ""} ${i === 9 ? "bg-brand-purple" : ""} ${i === 12 ? "bg-brand-purple" : ""}`}
                />
              );
            })}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m) => (
          <Card key={m.title} interactive>
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/15 flex items-center justify-center">
                <Music2 className="w-5 h-5 text-brand-blue" />
              </div>
              <Badge color={m.diff === "Beginner" ? "green" : m.diff === "Intermediate" ? "blue" : "orange"}>
                {m.diff}
              </Badge>
            </div>
            <h3 className="mt-4 text-base font-semibold">{m.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
