# AI FOR KIDS — Supabase Setup

## 1. Environment variables
Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxx
```

Use the **Project URL** and **Publishable key** from Supabase. Do not put a secret/service-role key in frontend code.

## 2. Authentication
Supabase Authentication should have:
- Allow new users to sign up: ON
- Allow anonymous sign-ins: OFF
- Email provider: Enabled
- Confirm email: OFF for the current development test

## 3. What this build does
- Adds email/password registration and login.
- Creates a profile automatically through the database trigger already installed.
- Keeps the existing free demo experience.
- Checks `subscriptions` for an authenticated user.
- Only a database row with `access_level = premium` and `status = active` unlocks premium in this build.
- Does not allow the browser to create premium subscriptions.

## 4. Important security rule
Never place a Supabase Secret/Service Role key in this Vite frontend. The browser should only receive the Publishable key. RLS remains the database security boundary.

## 5. Production payment
Payment activation should be done later by a backend/Edge Function or another trusted server process. Do not let the browser set its own subscription to premium.
