# Ashmeet Portfolio v2

Visual clone of the reference Manikanta portfolio UI, rebuilt for **Ashmeet Singh Sandhu** with Next.js + Tailwind.

## Run

```bash
cd portfolio-v2
npm install
npm run dev
```

Open [https://www.ashmeet.tech/](https://www.ashmeet.tech/)

## Features

- Floating glass navbar, light/dark theme, resume download
- Hero, About (+ GitHub chart), Skills, Projects, Credentials, Experience, Contact, Footer
- **Ash** AI chatbot (`/api/chat`) — local knowledge fallback; optional OpenAI/Gemini keys
- Contact form — saves to `data/contacts.jsonl` + optional EmailJS
- Like button, page loader, maps card

## Env (optional)

Copy `.env.example` → `.env.local`:

- `OPENAI_API_KEY` or `GEMINI_API_KEY` for live Ash replies
- `NEXT_PUBLIC_EMAILJS_*` for EmailJS delivery

## Content

Edit `src/data/site.ts` for profile, projects, skills, experience.
Replace `public/me.jpg` and `public/Ashmeet_Singh_Sandhu_Resume.pdf` anytime.
