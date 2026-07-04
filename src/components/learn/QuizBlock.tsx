import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Zap } from "lucide-react";
import type { QuizQuestion } from "@/content/fl-manual/level-1";
import { cn } from "@/lib/utils";

export type QuizResult = {
  score: number;
  total: number;
  passed: boolean;
  answers: number[];
};

export function QuizBlock({
  questions,
  onPass,
  onAttempt,
  xp,
}: {
  questions: QuizQuestion[];
  onPass: () => void;
  onAttempt?: (result: QuizResult) => void;
  xp: number;
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [xpShown, setXpShown] = useState(0);

  const q = questions[idx];
  const isCorrect = picked === q.answer;

  function next() {
    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    if (idx === questions.length - 1) {
      const passed = nextCorrect === questions.length;
      setDone(true);
      if (passed) {
        onPass();
        // XP count up
        const target = xp;
        let cur = 0;
        const step = Math.max(1, Math.round(target / 30));
        const timer = setInterval(() => {
          cur = Math.min(target, cur + step);
          setXpShown(cur);
          if (cur >= target) clearInterval(timer);
        }, 20);
      }
      setCorrectCount(nextCorrect);
      return;
    }
    setCorrectCount(nextCorrect);
    setIdx(idx + 1);
    setPicked(null);
  }

  function retry() {
    setIdx(0);
    setPicked(null);
    setCorrectCount(0);
    setDone(false);
    setXpShown(0);
  }

  if (done) {
    const passed = correctCount === questions.length;
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-6 text-center"
      >
        {passed ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="mx-auto w-14 h-14 rounded-full bg-brand-green/15 border border-brand-green/40 flex items-center justify-center"
            >
              <CheckCircle2 className="w-7 h-7 text-brand-green" />
            </motion.div>
            <h3 className="mt-4 text-xl font-semibold">Lesson complete</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {correctCount} / {questions.length} correct
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-orange/15 border border-brand-orange/30 px-4 py-2 text-brand-orange">
              <Zap className="w-4 h-4" />
              <span className="font-semibold tabular-nums">+{xpShown} XP</span>
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto w-14 h-14 rounded-full bg-brand-red/15 border border-brand-red/40 flex items-center justify-center">
              <XCircle className="w-7 h-7 text-brand-red" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Almost there</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              You got {correctCount} / {questions.length}. Get them all right to unlock the XP.
            </p>
            <button
              onClick={retry}
              className="mt-4 inline-flex items-center justify-center h-10 px-5 rounded-lg bg-brand-purple text-white font-medium hover:opacity-90 transition"
            >
              Try again
            </button>
          </>
        )}
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <span>Question {idx + 1} of {questions.length}</span>
        <span>{correctCount} correct so far</span>
      </div>
      <h4 className="text-lg font-medium">{q.q}</h4>
      <div className="mt-4 grid gap-2">
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const showCorrect = picked !== null && i === q.answer;
          const showWrong = isPicked && i !== q.answer;
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => setPicked(i)}
              className={cn(
                "text-left px-4 py-3 rounded-xl border transition",
                picked === null && "border-border bg-white/[0.02] hover:bg-white/[0.06]",
                showCorrect && "border-brand-green/50 bg-brand-green/10 text-brand-green",
                showWrong && "border-brand-red/50 bg-brand-red/10 text-brand-red",
                isPicked && !showCorrect && !showWrong && "border-brand-purple bg-brand-purple/10",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {picked !== null && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "mt-4 rounded-lg border p-3 text-sm",
              isCorrect
                ? "border-brand-green/30 bg-brand-green/5 text-brand-green"
                : "border-brand-red/30 bg-brand-red/5 text-foreground/80",
            )}
          >
            {isCorrect ? "Correct — " : "Not quite — "}
            <span className="text-foreground/80">{q.explain}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-5 flex justify-end">
        <button
          onClick={next}
          disabled={picked === null}
          className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-brand-purple text-white font-medium disabled:opacity-40 hover:opacity-90 transition"
        >
          {idx === questions.length - 1 ? "Finish" : "Next question"}
        </button>
      </div>
    </div>
  );
}
