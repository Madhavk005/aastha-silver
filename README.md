# AASTHA SILVER

Premium sterling silver jewellery e-commerce platform.

## Stack

- **Framework** — Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- **CMS** — Sanity (products, collections, pages, journal)
- **Database** — PostgreSQL (Supabase) via Prisma ORM (`Order`, `NewsletterSubscriber`)
- **Auth** — Supabase Auth (email/password + Google OAuth)
- **Payments** — Razorpay (order creation + signature verification)
- **State** — Zustand (cart, wishlist)

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # if not present
npx prisma migrate dev             # apply DB migrations
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

All secrets live in `.env.local` (gitignored). Required:

- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, `SUPABASE_JWKS_URL`
- Database: `DATABASE_URL` (transaction pooler), `DIRECT_URL` (session pooler — used by Prisma CLI)
- Sanity: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`
- Razorpay: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build
npm run lint     # eslint
```

## Commands

- `npx prisma migrate dev` / `npx prisma migrate status` — uses `DIRECT_URL` (Prisma CLI requires a session-mode connection; see `prisma.config.ts`).

## Sanity Studio

Local studio lives in `studio/` (run from that directory); production studio is served at `/studio` via the Next.js app.

## Known Pending Work

- Razorpay keys are placeholders — replace with live/test keys before launch
- Google OAuth provider must be enabled in the Supabase dashboard
- No automated tests yet (Vitest/Playwright not configured)
