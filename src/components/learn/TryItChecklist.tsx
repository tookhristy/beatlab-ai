import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export function TryItChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  return (
    <ul className="space-y-2">
      {items.map((item, i) => {
        const isChecked = checked.has(i);
        return (
          <li key={i}>
            <button
              onClick={() => {
                const next = new Set(checked);
                if (isChecked) next.delete(i);
                else next.add(i);
                setChecked(next);
              }}
              className={cn(
                "w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border transition",
                isChecked
                  ? "border-brand-green/40 bg-brand-green/8"
                  : "border-border bg-white/[0.02] hover:bg-white/[0.05]",
              )}
            >
              {isChecked ? (
                <motion.span
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 shrink-0" />
                </motion.span>
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              )}
              <span
                className={cn(
                  "text-sm",
                  isChecked ? "text-foreground/70 line-through" : "text-foreground",
                )}
              >
                {item}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
