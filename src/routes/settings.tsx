import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Card } from "@/components/ui-kit/primitives";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell>
      <PageHeader title="Settings" subtitle="Preferences, subscription & AI coach behavior." />
      <div className="space-y-4 max-w-2xl">
        {[
          { title: "Account", desc: "Email, password, connected providers." },
          { title: "Notifications", desc: "Streak reminders, weekly recap emails, challenge alerts." },
          { title: "AI Producer", desc: "Coaching tone, response length, related lessons." },
          { title: "Subscription", desc: "Pro plan · Renews Jan 12, 2027." },
          { title: "Appearance", desc: "Theme, font size, motion." },
        ].map((s) => (
          <Card key={s.title} interactive>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm text-muted-foreground">{s.desc}</div>
              </div>
              <button className="text-sm text-brand-purple">Manage →</button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
