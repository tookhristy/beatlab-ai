import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, Badge } from "@/components/ui-kit/primitives";
import { Sparkles, ChefHat, Drum, Music4, Waves, Piano } from "lucide-react";

export const Route = createFileRoute("/beat-recipes")({
  component: BeatRecipes,
});

const genres = [
  { name: "Trap", icon: Drum },
  { name: "R&B", icon: Piano },
  { name: "Lo-fi", icon: Waves },
  { name: "Afrobeats", icon: Music4 },
  { name: "Drill", icon: Drum },
  { name: "House", icon: Waves },
];

const moods = ["Dark", "Uplifting", "Sad", "Aggressive", "Chill", "Dreamy"];

function BeatRecipes() {
  const [genre, setGenre] = useState("Trap");
  const [mood, setMood] = useState("Dark");
  const [energy, setEnergy] = useState(60);
  const [bpm, setBpm] = useState(140);

  return (
    <AppShell>
      <PageHeader
        title="Beat recipe generator"
        subtitle="Set the vibe. Get a fully formed starting point — drums, chords, bass, arrangement, and plugin picks."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4">
        {/* Controls */}
        <Card>
          <div className="text-sm font-semibold mb-3">Genre</div>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {genres.map((g) => (
              <button
                key={g.name}
                onClick={() => setGenre(g.name)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-lg border transition ${
                  genre === g.name
                    ? "border-brand-purple/60 bg-brand-purple/10"
                    : "border-border bg-white/[0.02] hover:bg-white/[0.05]"
                }`}
              >
                <g.icon
                  className={`w-4 h-4 ${genre === g.name ? "text-brand-purple" : "text-muted-foreground"}`}
                />
                <span className="text-xs">{g.name}</span>
              </button>
            ))}
          </div>

          <div className="text-sm font-semibold mb-3">Mood</div>
          <div className="flex flex-wrap gap-2 mb-6">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-3 h-8 rounded-full text-xs border transition ${
                  mood === m
                    ? "bg-brand-blue/15 border-brand-blue/50 text-brand-blue"
                    : "border-border bg-white/[0.02] hover:bg-white/[0.05] text-muted-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold">Energy</span>
              <span className="text-muted-foreground">{energy}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={energy}
              onChange={(e) => setEnergy(+e.target.value)}
              className="w-full accent-brand-purple"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold">BPM</span>
              <span className="text-muted-foreground">{bpm}</span>
            </div>
            <input
              type="range"
              min={70}
              max={180}
              value={bpm}
              onChange={(e) => setBpm(+e.target.value)}
              className="w-full accent-brand-purple"
            />
          </div>

          <button className="w-full h-11 rounded-lg bg-hero-gradient font-semibold text-sm inline-flex items-center justify-center gap-2 shadow-glow-purple">
            <Sparkles className="w-4 h-4" /> Generate recipe
          </button>
        </Card>

        {/* Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <Badge color="purple">Vibe</Badge>
            <h3 className="mt-3 text-xl font-semibold">
              {mood} {genre} · {bpm} BPM
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Key: F minor · Swing: 58% · Energy: {energy}/100
            </p>
          </Card>
          <RecipeCard title="Drum groove" color="orange">
            Half-time kick on 1 & 3. Snare on 3. Rolling hats with triplet fills every 4 bars. Add ghost snares on off-beats.
          </RecipeCard>
          <RecipeCard title="Chord progression" color="blue">
            i – VI – III – VII (Fm – D♭ – A♭ – E♭). Play with sustained pads and a plucked lead an octave up.
          </RecipeCard>
          <RecipeCard title="Bassline" color="purple">
            808 following root notes. Long slides between D♭ and A♭. Layer with a sine sub for weight below 60 Hz.
          </RecipeCard>
          <RecipeCard title="Arrangement" color="green">
            Intro (8 bars) → Verse (16) → Hook (16) → Verse (16) → Hook (16) → Outro (8). Drop hats in verse 2.
          </RecipeCard>
          <RecipeCard title="Plugins" color="muted">
            FLEX for keys · FPC for drums · Fruity Reeverb 2 · Fruity Parametric EQ 2 · Fruity Limiter on master.
          </RecipeCard>
        </div>
      </div>
    </AppShell>
  );
}

function RecipeCard({ title, color, children }: { title: string; color: "orange" | "blue" | "purple" | "green" | "muted"; children: React.ReactNode }) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-2">
        <ChefHat className={`w-4 h-4 text-brand-${color === "muted" ? "purple" : color}`} />
        <Badge color={color}>{title}</Badge>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </Card>
  );
}
