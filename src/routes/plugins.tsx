import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, Badge } from "@/components/ui-kit/primitives";
import { Blocks } from "lucide-react";

export const Route = createFileRoute("/plugins")({
  component: PluginsPage,
});

const plugins = [
  { name: "FLEX", cat: "Synth", diff: "Beginner", use: "Fast preset-based melodies & pads" },
  { name: "Sytrus", cat: "Synth", diff: "Advanced", use: "FM sound design & custom leads" },
  { name: "Harmor", cat: "Synth", diff: "Advanced", use: "Additive synthesis, resynthesized textures" },
  { name: "3xOSC", cat: "Synth", diff: "Beginner", use: "Simple subs, basses, saw leads" },
  { name: "FPC", cat: "Drums", diff: "Beginner", use: "Finger-drum kits & sample chops" },
  { name: "Gross Beat", cat: "FX", diff: "Intermediate", use: "Time & volume manipulation" },
  { name: "Parametric EQ 2", cat: "Mixing", diff: "Beginner", use: "Cutting & boosting frequencies" },
  { name: "Fruity Limiter", cat: "Mastering", diff: "Intermediate", use: "Loudness & compression on master" },
  { name: "Reeverb 2", cat: "FX", diff: "Beginner", use: "Space, depth & ambience" },
  { name: "Fruity Delay 3", cat: "FX", diff: "Intermediate", use: "Rhythmic echoes & vocal throws" },
];

function PluginsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Plugin library"
        subtitle="Every stock FL Studio plugin, explained like a producer's cheat sheet."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plugins.map((p) => (
          <Card key={p.name} interactive>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-hero-gradient flex items-center justify-center">
                <Blocks className="w-5 h-5 text-white" />
              </div>
              <Badge color={p.diff === "Beginner" ? "green" : p.diff === "Intermediate" ? "blue" : "orange"}>
                {p.diff}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-0.5">{p.cat}</div>
            <p className="mt-3 text-sm text-muted-foreground">{p.use}</p>
            <button className="mt-4 w-full h-9 rounded-lg bg-white/[0.05] border border-border text-sm font-medium hover:bg-white/[0.08]">
              Learn plugin
            </button>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
