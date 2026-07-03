import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Flame,
  Zap,
  Trophy,
  Target,
  Play,
  ArrowRight,
  Sparkles,
  Music4,
  Drum,
  Piano,
  Waves,
  Clock,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card, Progress } from "@/components/ui-kit/primitives";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const genres = [
  { name: "Trap", pct: 78, color: "purple", icon: Drum },
  { name: "R&B", pct: 45, color: "blue", icon: Piano },
  { name: "Lo-fi", pct: 62, color: "green", icon: Waves },
  { name: "Afrobeats", pct: 22, color: "orange", icon: Music4 },
] as const;

const recentLessons = [
  { title: "Layering 808s with sub bass", level: "Bass", time: "12 min", xp: 40 },
  { title: "Ghost snares & swing", level: "Drums", time: "8 min", xp: 30 },
  { title: "Sidechain compression basics", level: "Mixing", time: "15 min", xp: 50 },
];

function Dashboard() {
  return (
    <AppShell>
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 lg:p-10 mb-8"
      >
        <div className="absolute inset-0 bg-aurora opacity-70" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-purple/20 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <Badge color="purple">
              <Sparkles className="w-3 h-3" /> Personal roadmap · Trap producer
            </Badge>
            <h1 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              Welcome back, Jordan.
              <br />
              <span className="text-gradient-brand">Let's finish today's session.</span>
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl">
              You're 2 lessons away from unlocking <b className="text-foreground">Melodies · Level 3</b>.
              Keep the streak going — your producer instincts are getting sharper.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-hero-gradient text-sm font-semibold shadow-glow-purple hover:opacity-95 transition">
                <Play className="w-4 h-4" />
                Continue: Layering 808s
              </button>
              <button className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-white/[0.04] border border-border text-sm font-medium hover:bg-white/[0.08] transition">
                View roadmap <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mini waveform */}
          <div className="hidden lg:flex items-end gap-1 h-24">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 6 }}
                animate={{ height: 8 + Math.abs(Math.sin(i * 0.6)) * 60 }}
                transition={{ duration: 1.4, delay: i * 0.02, repeat: Infinity, repeatType: "reverse" }}
                className="w-1.5 rounded-full bg-gradient-to-t from-brand-blue/40 to-brand-purple"
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Flame} color="orange" label="Streak" value="7" hint="days in a row" />
        <StatCard icon={Zap} color="purple" label="Daily XP" value="240" hint="/ 400 goal" progress={60} />
        <StatCard icon={Trophy} color="blue" label="Level" value="6" hint="Producer in training" />
        <StatCard icon={Target} color="green" label="Weekly goal" value="4/5" hint="lessons" progress={80} />
      </section>

      {/* Continue + AI prompt */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <Card className="lg:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 blur-3xl rounded-full" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Continue learning
                </div>
                <h3 className="mt-1 text-xl font-semibold">Bass · Level 4</h3>
              </div>
              <Badge color="blue">
                <Clock className="w-3 h-3" /> 12 min left
              </Badge>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
                <span>Level progress</span>
                <span>4 of 6 lessons · 66%</span>
              </div>
              <Progress value={66} color="blue" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["808 fundamentals", "Slides & glides", "Sub layering"].map((t, i) => (
                <div
                  key={t}
                  className="rounded-lg border border-border bg-white/[0.02] p-3 text-xs"
                >
                  <div className={`w-2 h-2 rounded-full mb-2 ${i < 2 ? "bg-brand-green" : "bg-brand-purple animate-pulse"}`} />
                  <div className="font-medium">{t}</div>
                  <div className="text-muted-foreground mt-0.5">
                    {i < 2 ? "Complete" : "In progress"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-aurora opacity-50" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg bg-hero-gradient flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold">Ask your AI producer</div>
                <div className="text-[11px] text-muted-foreground">Stuck? Get instant coaching.</div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                "Why don't my drums hit hard?",
                "How do I write a catchy melody?",
                "What plugins do I really need?",
              ].map((q) => (
                <button
                  key={q}
                  className="w-full text-left text-xs px-3 py-2 rounded-lg bg-white/[0.03] border border-border hover:border-white/15 hover:bg-white/[0.06] transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Genre progress + Challenge */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold">Genre mastery</h3>
            <button className="text-xs text-muted-foreground hover:text-foreground">View all</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {genres.map((g) => (
              <div
                key={g.name}
                className="rounded-xl border border-border bg-white/[0.02] p-4 hover-lift"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-brand-${g.color}/15`}>
                    <g.icon className={`w-4 h-4 text-brand-${g.color}`} />
                  </div>
                  <div className="text-sm font-medium">{g.name}</div>
                  <div className="ml-auto text-xs text-muted-foreground">{g.pct}%</div>
                </div>
                <Progress value={g.pct} color={g.color as "purple"} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-brand-orange/15 via-card to-card border-brand-orange/25">
          <Badge color="orange">Beat challenge · Today</Badge>
          <h3 className="mt-3 text-lg font-semibold leading-tight">
            Build an 8-bar dark trap loop at 140 BPM
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Use ghost snares, a rolling 808, and a minor melody. Submit for AI feedback.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="w-3.5 h-3.5 text-brand-orange" /> +120 XP
            <span className="mx-1">·</span>
            <Clock className="w-3.5 h-3.5" /> 20 min
          </div>
          <button className="mt-5 w-full h-10 rounded-lg bg-brand-orange text-black font-semibold text-sm hover:opacity-90 transition">
            Start challenge
          </button>
        </Card>
      </section>

      {/* Recent lessons */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">Recent lessons</h3>
          <button className="text-xs text-muted-foreground hover:text-foreground">See history</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentLessons.map((l) => (
            <Card key={l.title} interactive>
              <Badge color="muted">{l.level}</Badge>
              <h4 className="mt-3 text-base font-semibold leading-snug">{l.title}</h4>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {l.time}</span>
                <span className="inline-flex items-center gap-1 text-brand-orange"><Zap className="w-3.5 h-3.5" /> +{l.xp} XP</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function StatCard({
  icon: Icon,
  color,
  label,
  value,
  hint,
  progress,
}: {
  icon: typeof Flame;
  color: "orange" | "purple" | "blue" | "green";
  label: string;
  value: string;
  hint: string;
  progress?: number;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 hover-lift">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-brand-${color}/15`}>
          <Icon className={`w-4 h-4 text-brand-${color}`} />
        </div>
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
      {typeof progress === "number" && (
        <div className="mt-3">
          <Progress value={progress} color={color} />
        </div>
      )}
    </div>
  );
}
