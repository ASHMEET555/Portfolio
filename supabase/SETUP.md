# Supabase + live website content (beginner guide)

Edit JSON in Supabase → refresh the site → **Hero, About, Experience, Skills, Projects, Credentials, Contact, Footer, and Chatbot** all update. **No redeploy** needed for content changes.

Local `src/data/site.ts` is only a **fallback** if Supabase is down or env vars are missing.

---

## A. Create a Supabase project (5 minutes)

1. Go to [https://supabase.com](https://supabase.com) → **Start your project** → sign in.
2. Click **New project**.
3. Fill name, database password, region → wait until ready.

---

## B. Get your API keys

**Project Settings** → **API** → copy:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (server only — never commit)

`portfolio-v2/.env.local` (and the same keys on Vercel/hosting):

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

GROQ_API_KEY=gsk_...
GROQ_MODEL=llama-3.3-70b-versatile
```

Restart `npm run dev` after saving. On production, set these in the host’s env UI and redeploy **once** so the app can talk to Supabase.

---

## C. Create tables (SQL)

1. **SQL Editor** → paste `supabase/schema.sql` → **Run**.
2. Table Editor should show: `portfolio_content`, `live_stats`, `chat_logs`.

---

## D. Seed the full portfolio JSON (important)

Use the **full** file `supabase/seed-portfolio.json` (has `site`, `education`, `experience`, `projects`, `skills`, `certifications`, …).

1. **Table Editor** → `portfolio_content`
2. Insert or edit row:
   - `id` = `main`
   - `data` = paste **entire** `seed-portfolio.json`
3. Save

If you previously used a short `{ "profile": ... }` JSON, **replace** it with this full seed so every section can update from Supabase.

Optional: `live_stats` key `dsa` from `seed-live-stats.json` (DSA heatmap still loads live from Codolio).

---

## E. How updates work day-to-day

1. **Table Editor** → `portfolio_content` → row `main` → edit `data` JSON  
   (bio, roles, experience bullets, project text, skills, email, social links, …)
2. Save
3. **Hard-refresh** the website (or open a new tab)

The browser calls `GET /api/content` with `cache: "no-store"`, so it always pulls the latest Supabase JSON.

### Resume PDF

1. Storage → public bucket `portfolio-files` → upload PDF  
2. Put the public URL in `data.site.resumePath`  
   (or keep `/Ashmeet_Singh_Sandhu_Resume.pdf` from the site’s `public/` folder)

---

## F. Chatbot

Priority: **Groq → Gemini → OpenAI → local**. Chat answers use the same Supabase JSON as the UI.

Use a normal chat model (e.g. `llama-3.3-70b-versatile`), not Compound.

---

## G. Quick test

1. `npm run dev`
2. Open `/api/content` — `"source":"supabase"` means you’re live
3. Change `site.taglineHighlight` in Supabase → refresh homepage → hero text changes
4. Ask the chatbot something that matches the new text

---

## H. Security

- Never commit `SUPABASE_SERVICE_ROLE_KEY` or paste it in chat
- `anon` key is OK for public read (RLS)
- Only Dashboard / service role can edit JSON

---

## I. Deploy checklist

On Vercel (or similar), set the same three Supabase vars (+ `GROQ_API_KEY`). After that, **content edits are only in Supabase** — no local hardcoding and no redeploy for text changes.
