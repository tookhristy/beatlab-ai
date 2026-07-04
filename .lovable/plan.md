# Enable email confirmation on signup

## What changes

1. **Turn off auto-confirm in auth settings** so new signups must click the confirmation link before they can sign in. Uses `supabase--configure_auth` with `auto_confirm_email: false`. Signups and Google OAuth stay enabled; anonymous users stay disabled; HIBP leaked-password check stays as-is.

2. **Update the signup flow in `src/routes/auth.tsx`** so the UI matches the new behavior:
   - After `supabase.auth.signUp(...)` succeeds, do NOT auto-navigate to `/learn`. Instead show a clear "Check your inbox — click the link we sent to <email> to activate your account" confirmation screen.
   - Keep `emailRedirectTo: window.location.origin + "/auth"` so the confirmation link lands back on the auth page; the existing `getUser()` effect there will then push the now-confirmed user to `/learn`.
   - On sign-in, if Supabase returns the "Email not confirmed" error, show a friendly message with a "Resend confirmation email" button that calls `supabase.auth.resend({ type: "signup", email })`.

3. **No Resend, no email domain, no DNS.** Confirmation emails use Lovable's built-in default templates and send immediately. Deliverability is fine for testing and normal use. If later you want the email to come from `you@yourdomain.com` with your branding, that's a separate follow-up (email domain + scaffold branded templates).

## Not doing

- No Resend connector.
- No custom email domain or DNS records.
- No custom email templates / edge functions.
- No changes to Google OAuth (Google users are pre-verified by Google, no confirmation email needed).
- No schema or RLS changes.

## Technical notes

- `supabase--configure_auth({ disable_signup: false, external_anonymous_users_enabled: false, auto_confirm_email: false, password_hibp_enabled: <current> })` — I'll read current HIBP state first so I don't silently flip it.
- `signUp` response shape when confirmation is required: `data.user` is present but `data.session` is null. That's the signal to show the "check your inbox" state instead of navigating.
- The `/auth` route already runs `supabase.auth.getUser()` on mount and redirects confirmed users to `/learn`, so the post-click landing "just works" without a new callback route.
