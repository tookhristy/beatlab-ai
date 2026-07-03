import type { ReactNode } from "react";
import { Sidebar, MobileTabBar } from "./Sidebar";
import { AIProducerFloating } from "./AIProducerFloating";
import { Search, Bell } from "lucide-react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/70 backdrop-blur-xl">
          <div className="h-full px-4 lg:px-8 flex items-center gap-4">
            <div className="flex-1 max-w-lg relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search lessons, plugins, techniques…"
                className="w-full h-10 pl-9 pr-3 rounded-lg bg-white/[0.03] border border-border text-sm outline-none focus:border-brand-purple/50 placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="h-10 px-3 hidden md:inline-flex items-center gap-2 rounded-lg bg-white/[0.03] border border-border text-xs font-medium">
                <span className="text-brand-orange">⚡ 1,240 XP</span>
                <span className="text-muted-foreground">· Lvl 6</span>
              </button>
              <button className="h-10 w-10 rounded-lg bg-white/[0.03] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
                <Bell className="w-4 h-4" />
              </button>
              <div className="h-10 w-10 rounded-full bg-hero-gradient flex items-center justify-center text-sm font-semibold">
                J
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 lg:px-8 py-6 lg:py-10 pb-28 lg:pb-16 max-w-[1400px] mx-auto">
          {children}
        </main>
      </div>
      <MobileTabBar />
      <AIProducerFloating />
    </div>
  );
}
