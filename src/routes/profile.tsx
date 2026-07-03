import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card, Badge } from "@/components/ui-kit/primitives";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppShell>
      <PageHeader title="Profile" subtitle="Your producer identity." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 text-center">
          <div className="w-24 h-24 rounded-full bg-hero-gradient mx-auto flex items-center justify-center text-3xl font-semibold">
            J
          </div>
          <h3 className="mt-4 text-xl font-semibold">Jordan Reyes</h3>
          <p className="text-sm text-muted-foreground">@jordan.beats</p>
          <div className="mt-4 flex justify-center gap-2 flex-wrap">
            <Badge color="purple">Trap</Badge>
            <Badge color="blue">R&B</Badge>
            <Badge color="green">Lo-fi</Badge>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <h3 className="text-base font-semibold mb-4">Goals</h3>
          <div className="space-y-3">
            {[
              "Make radio-ready beats",
              "Land my first placement",
              "Learn music theory fundamentals",
            ].map((g) => (
              <div key={g} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-border">
                <div className="w-2 h-2 rounded-full bg-brand-purple" />
                <span className="text-sm">{g}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
