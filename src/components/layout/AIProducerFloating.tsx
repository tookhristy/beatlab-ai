import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Send, Lightbulb, HelpCircle, ListChecks } from "lucide-react";

const suggestions = [
  { icon: Lightbulb, label: "Why do my drums sound weak?" },
  { icon: HelpCircle, label: "How do I layer snares?" },
  { icon: ListChecks, label: "Give me FL Studio steps for sidechain" },
];

export function AIProducerFloating() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 lg:bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-hero-gradient shadow-glow-purple flex items-center justify-center animate-pulse-ring"
        aria-label="Open AI Producer"
      >
        <Sparkles className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="fixed z-50 bottom-6 right-6 w-[min(420px,calc(100vw-2rem))] rounded-2xl glass overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-hero-gradient flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">AI Producer</div>
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                    Online · Ready to coach
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-md hover:bg-white/5 text-muted-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 max-h-[360px] overflow-y-auto space-y-3">
                <div className="rounded-xl bg-white/[0.04] border border-border p-3 text-sm">
                  Hey — I'm your AI producer. Ask me anything about drums, mixing,
                  melodies, or FL Studio workflow. I'll break it down step by step.
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground px-1">
                    Suggested
                  </div>
                  {suggestions.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setInput(s.label)}
                      className="w-full flex items-center gap-2.5 text-left text-sm px-3 py-2.5 rounded-lg bg-white/[0.02] border border-border hover:border-white/15 hover:bg-white/[0.05] transition"
                    >
                      <s.icon className="w-4 h-4 text-brand-purple" />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 border-t border-border flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your producer…"
                  className="flex-1 bg-white/[0.03] border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand-purple/60 placeholder:text-muted-foreground"
                />
                <button className="h-10 w-10 rounded-lg bg-hero-gradient flex items-center justify-center hover:opacity-90">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
