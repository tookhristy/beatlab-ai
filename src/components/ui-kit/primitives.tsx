import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6 mb-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm lg:text-base text-muted-foreground max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function Card({
  children,
  className,
  interactive,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-card border border-border p-6",
        interactive && "hover-lift cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  color = "purple",
}: {
  children: ReactNode;
  color?: "purple" | "blue" | "green" | "orange" | "red" | "muted";
}) {
  const map: Record<string, string> = {
    purple: "bg-brand-purple/12 text-brand-purple border-brand-purple/25",
    blue: "bg-brand-blue/12 text-brand-blue border-brand-blue/25",
    green: "bg-brand-green/12 text-brand-green border-brand-green/25",
    orange: "bg-brand-orange/12 text-brand-orange border-brand-orange/25",
    red: "bg-brand-red/12 text-brand-red border-brand-red/25",
    muted: "bg-white/[0.04] text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        map[color],
      )}
    >
      {children}
    </span>
  );
}

export function Progress({ value, color = "purple" }: { value: number; color?: "purple" | "blue" | "green" | "orange" }) {
  const map = {
    purple: "bg-brand-purple",
    blue: "bg-brand-blue",
    green: "bg-brand-green",
    orange: "bg-brand-orange",
  };
  return (
    <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
      <div
        className={cn("h-full rounded-full transition-all", map[color])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
