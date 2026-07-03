import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  GraduationCap,
  Dumbbell,
  Sparkles,
  ChefHat,
  Blocks,
  Music2,
  TrendingUp,
  User,
  Settings,
  Flame,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/learn", label: "Learn", icon: GraduationCap },
  { to: "/practice", label: "Practice", icon: Dumbbell },
  { to: "/ai-producer", label: "AI Producer", icon: Sparkles },
  { to: "/beat-recipes", label: "Beat Recipes", icon: ChefHat },
  { to: "/plugins", label: "Plugins", icon: Blocks },
  { to: "/theory", label: "Theory", icon: Music2 },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-border bg-[#0d0d13]/80 backdrop-blur-xl z-40">
      <div className="px-6 h-16 flex items-center gap-2.5 border-b border-border">
        <div className="relative w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center shadow-glow-purple">
          <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight">learnbeats.app</span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            AI Producer
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active =
            item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="relative group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/[0.08]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                className={`relative w-4 h-4 transition-colors ${
                  active ? "text-brand-purple" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span
                className={`relative transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3">
        <div className="glass rounded-xl p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-aurora opacity-60 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-brand-orange/15 flex items-center justify-center">
                <Flame className="w-4 h-4 text-brand-orange" />
              </div>
              <div>
                <div className="text-sm font-semibold">7 day streak</div>
                <div className="text-[11px] text-muted-foreground">Keep the fire alive</div>
              </div>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 rounded-full bg-brand-orange/70"
                  style={{ opacity: 0.4 + i * 0.08 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = nav.slice(0, 5);
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-[#0d0d13]/90 backdrop-blur-xl">
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const active =
            item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 py-3 text-[10px]"
            >
              <Icon
                className={`w-5 h-5 ${active ? "text-brand-purple" : "text-muted-foreground"}`}
              />
              <span className={active ? "text-foreground" : "text-muted-foreground"}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
