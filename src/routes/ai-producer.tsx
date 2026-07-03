import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card } from "@/components/ui-kit/primitives";
import { Sparkles, Send, Lightbulb, HelpCircle, ListChecks, BookOpen } from "lucide-react";

export const Route = createFileRoute("/ai-producer")({
  component: AIProducerPage,
});

function AIProducerPage() {
  return (
    <AppShell>
      <PageHeader
        title="AI Producer"
        subtitle="Your personal producer coach. Ask anything about FL Studio, mixing, sound design, or theory."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <Card className="flex flex-col min-h-[560px]">
          {/* messages */}
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            <Bubble role="ai">
              Hey Jordan — glad you're back. What are we producing today? Want to sharpen your drums, tighten a mix, or write a fresh melody?
            </Bubble>
            <Bubble role="user">Why do my drums always sound weak?</Bubble>
            <Bubble role="ai">
              Almost every "weak drums" issue comes from one of three places:
              <ol className="list-decimal ml-5 mt-2 space-y-1 text-sm">
                <li><b>Kick + 808 clashing.</b> They share the same low end. Sidechain the 808 to the kick, or duck 40–80 Hz on the 808 when the kick hits.</li>
                <li><b>No transient snap.</b> Layer a short "top" snare or clap over the main body. Boost 4–6 kHz slightly.</li>
                <li><b>Everything at the same volume.</b> Use gain staging — kick around −6 dB peak, everything else sits under it.</li>
              </ol>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="text-xs h-9 rounded-lg bg-white/[0.05] border border-border hover:bg-white/[0.08]">
                  Explain simpler
                </button>
                <button className="text-xs h-9 rounded-lg bg-white/[0.05] border border-border hover:bg-white/[0.08]">
                  Give me FL Studio steps
                </button>
              </div>
              <div className="mt-4 rounded-lg border border-border bg-white/[0.02] p-3 flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-brand-purple" />
                <div className="text-xs">
                  <div className="font-medium">Related lesson</div>
                  <div className="text-muted-foreground">Sidechain compression basics · 15 min</div>
                </div>
                <button className="ml-auto text-xs text-brand-purple">Open →</button>
              </div>
            </Bubble>
          </div>

          {/* composer */}
          <div className="mt-4 border-t border-border pt-4 flex items-center gap-2">
            <input
              placeholder="Ask about drums, mixing, plugins, theory…"
              className="flex-1 h-11 rounded-lg bg-white/[0.03] border border-border px-3 text-sm outline-none focus:border-brand-purple/60 placeholder:text-muted-foreground"
            />
            <button className="h-11 w-11 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-brand-purple" />
              <div className="text-sm font-semibold">Quick prompts</div>
            </div>
            <div className="space-y-2">
              {[
                { icon: Lightbulb, label: "How do I make my mix sound pro?" },
                { icon: HelpCircle, label: "I'm stuck writing a melody" },
                { icon: ListChecks, label: "Give me a 5-step warm-up" },
              ].map((s) => (
                <button
                  key={s.label}
                  className="w-full flex items-center gap-2 text-left text-sm px-3 py-2.5 rounded-lg bg-white/[0.02] border border-border hover:border-white/15 hover:bg-white/[0.05] transition"
                >
                  <s.icon className="w-4 h-4 text-brand-purple" />
                  {s.label}
                </button>
              ))}
            </div>
          </Card>
          <Card>
            <div className="text-sm font-semibold mb-1">Coaching style</div>
            <p className="text-xs text-muted-foreground mb-3">
              Adjust tone & depth of your AI producer.
            </p>
            {["Beginner-friendly", "Pro engineer", "Hype hype-man"].map((t, i) => (
              <label key={t} className="flex items-center gap-2 py-1.5 text-sm">
                <input type="radio" name="tone" defaultChecked={i === 0} className="accent-brand-purple" />
                {t}
              </label>
            ))}
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Bubble({ role, children }: { role: "user" | "ai"; children: React.ReactNode }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-hero-gradient px-4 py-2.5 text-sm text-white">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.04] border border-border px-4 py-3 text-sm">
        {children}
      </div>
    </div>
  );
}
