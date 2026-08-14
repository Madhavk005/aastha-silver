# AASTHA SILVER

Premium sterling silver jewellery e-commerce platform.

## Stack

- **Framework** — Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- **CMS** — Sanity (products, collections, pages, journal)
- **Database** — PostgreSQL (Supabase host) via Prisma ORM (`Order`, `NewsletterSubscriber`)
- **Payments** — Razorpay (order creation + signature verification)
- **Auth** — none (guest checkout)
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

- Database: `DATABASE_URL` (transaction pooler), `DIRECT_URL` (session pooler — used by Prisma CLI)
- Sanity: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`
- Razorpay: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- Sentry: `NEXT_PUBLIC_SENTRY_DSN` (optional — SDK no-ops without it; set `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` for sourcemap upload)
- Analytics (optional — each no-ops without its ID): `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_META_PIXEL_ID`
- Email (optional — order confirmations skipped without it): `RESEND_API_KEY`, `EMAIL_FROM`
- Site URL (used in emails): `NEXT_PUBLIC_SITE_URL` (defaults to `https://aasthasilver.com`)

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build
npm run lint     # eslint
npm test         # vitest unit tests
```

## Google OAuth — one-time setup

Google OAuth was removed with the auth layer; the app uses guest checkout. If auth is ever re-added, the Supabase provider remains enabled in the project (`aejrqivtvgciyeverqwd`), needing a Google Cloud OAuth client with callback `https://aejrqivtvgciyeverqwd.supabase.co/auth/v1/callback` configured as a redirect URI.

## Commands

- `npx prisma migrate dev` / `npx prisma migrate status` — uses `DIRECT_URL` (Prisma CLI requires a session-mode connection; see `prisma.config.ts`).

## Sanity Studio

Local studio lives in `studio/` (run from that directory); production studio is served at `/studio` via the Next.js app.

## Known Pending Work

- Razorpay keys are placeholders — replace with live/test keys before launch
- Sentry/analytics/order emails are wired but need real account keys/IDs to start reporting
- Orders are tracked by order ID (track-order page); no per-user order history (auth removed — guest checkout)
