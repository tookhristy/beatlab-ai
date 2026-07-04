import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Card } from "@/components/ui-kit/primitives";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — learnbeats.app" },
      { name: "description", content: "Sign in to learnbeats.app to save your lesson progress and XP." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [awaitingConfirm, setAwaitingConfirm] = useState<string | null>(null);
  const [needsConfirmForSignIn, setNeedsConfirmForSignIn] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/learn" });
    });
  }, [navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setNeedsConfirmForSignIn(false);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/auth" },
        });
        if (error) throw error;
        // With email confirmation required, session is null until the user clicks the link.
        if (!data.session) {
          setAwaitingConfirm(email);
        } else {
          navigate({ to: "/learn" });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          const notConfirmed =
            /confirm/i.test(error.message) || (error as { code?: string }).code === "email_not_confirmed";
          if (notConfirmed) {
            setNeedsConfirmForSignIn(true);
            setErr("Please confirm your email before signing in.");
            return;
          }
          throw error;
        }
        navigate({ to: "/learn" });
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend(target: string) {
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: target,
        options: { emailRedirectTo: window.location.origin + "/auth" },
      });
      if (error) throw error;
      setMsg(`Confirmation email re-sent to ${target}.`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not resend confirmation email");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setErr(null);
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw result.error;
      if (result.redirected) return;
      navigate({ to: "/learn" });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Google sign-in failed");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 rounded-lg bg-hero-gradient flex items-center justify-center shadow-glow-purple">
            <Zap className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-semibold tracking-tight">learnbeats.app</span>
        </Link>

        <Card>
          {awaitingConfirm ? (
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Check your inbox</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                We sent a confirmation link to{" "}
                <span className="text-foreground font-medium">{awaitingConfirm}</span>.
                Click it to activate your account, then come back to sign in.
              </p>
              <button
                onClick={() => handleResend(awaitingConfirm)}
                disabled={loading}
                className="mt-6 w-full h-11 rounded-lg bg-brand-purple text-white font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "…" : "Resend confirmation email"}
              </button>
              {msg && <p className="mt-3 text-sm text-brand-green">{msg}</p>}
              {err && <p className="mt-3 text-sm text-brand-red">{err}</p>}
              <button
                onClick={() => {
                  setAwaitingConfirm(null);
                  setMode("signin");
                  setMsg(null);
                  setErr(null);
                }}
                className="mt-4 text-sm text-muted-foreground hover:text-foreground"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-center">
                {mode === "signin" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground text-center">
                {mode === "signin"
                  ? "Sign in to keep your lesson progress and XP."
                  : "Track lessons, earn XP, and pick up where you left off on any device."}
              </p>

              <button
                onClick={handleGoogle}
                disabled={loading}
                className="mt-6 w-full h-11 rounded-lg bg-white text-black font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                  />
                </svg>
                Continue with Google
              </button>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleEmail} className="space-y-3">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-border focus:outline-none focus:border-brand-purple/60 text-sm"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-border focus:outline-none focus:border-brand-purple/60 text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-lg bg-brand-purple text-white font-medium hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "…" : mode === "signin" ? "Sign in" : "Create account"}
                </button>
              </form>

              {err && (
                <div className="mt-3 text-sm text-brand-red text-center">
                  <p>{err}</p>
                  {needsConfirmForSignIn && email && (
                    <button
                      onClick={() => handleResend(email)}
                      disabled={loading}
                      className="mt-2 text-brand-purple hover:underline"
                    >
                      Resend confirmation email
                    </button>
                  )}
                </div>
              )}
              {msg && (
                <p className="mt-3 text-sm text-brand-green text-center">{msg}</p>
              )}

              <p className="mt-5 text-sm text-center text-muted-foreground">
                {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
                <button
                  onClick={() => {
                    setMode(mode === "signin" ? "signup" : "signin");
                    setErr(null);
                    setMsg(null);
                    setNeedsConfirmForSignIn(false);
                  }}
                  className="text-brand-purple hover:underline"
                >
                  {mode === "signin" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
