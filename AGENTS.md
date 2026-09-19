# Agent Guide — Jobly

## Overview

Next.js 15 (App Router) job board with two roles: **employer** and **jobseeker**. PostgreSQL database, credentials-based auth, server-side data fetching. UI follows the **Linear design system** (dark-only, see Design below).

## Commands

```bash
npm run dev        # dev server on :3000
npm run build      # production build (also typechecks)
npm run lint       # ESLint (next/core-web-vitals + next/typescript)
```

**No test suite exists.** No `test`, `typecheck`, or `format` scripts. `npm run build` is the primary verification step. `postinstall` runs `prisma generate` automatically.

## Prisma

- Schema: `prisma/schema.prisma` (PostgreSQL)
- Singleton client: `prisma.ts` (root-level, exported as `prisma`)
- Migrations: `prisma/migrations/`
- Seed: `npx ts-node prisma/prisma-seed.ts`
- After schema changes: `npx prisma migrate dev --name <name>` then commit both schema and migration folder

## Auth

- **next-auth v5 beta** (`next-auth@5.0.0-beta.29`) with credentials provider
- Config: `auth.ts` (root), API route: `app/api/auth/[...nextauth]/route.ts`
- JWT sessions (not database sessions). Role + companyId stored in JWT.
- Session type augmentation: `types/next-auth.d.ts`
- **Middleware** (`middleware.ts`) protects `/dashboard/*`: unauthenticated users → `/unauthorized`, wrong role → `/unauthorized`
- `AUTH_SECRET` in `.env.local`, `DATABASE_URL` in `.env`

## Design — Linear system

Reference: `DESIGN-linear.app.md` (full token spec). Key rules:

- **Dark-only.** `app/layout.tsx` hardcodes `className="dark"` on `<html>` and `globals.css` sets the Linear palette in `:root` and `.dark`. There is no theme toggle. Do not add a light theme.
- **Canvas** `#010102` = `bg-background`. Surface ladder: `bg-surface-1` (cards), `-2` (popover/featured), `-3`, `-4`.
- **Hairlines**: `border-hairline` (default) / `border-hairline-strong` (hover/focus). No drop shadows for depth.
- **Lavender accent** `#5e6ad2` = `bg-primary` / `text-primary`. Use sparingly: primary CTA, brand mark, focus ring, links. Never as a section/card fill.
- **Ink scale**: `text-ink` (default via `text-foreground`), `text-ink-muted`, `text-ink-subtle`, `text-ink-tertiary`.
- **Type**: Inter (`font-sans`, wired via `next/font` as `--font-inter`), JetBrains Mono (`font-mono`). Aggressive negative tracking on display sizes.
- Buttons: primary = lavender, `secondary`/`outline` = charcoal surface + hairline. Cards use `rounded-xl` (12px) or `rounded-2xl` (16px) for large panels; buttons/inputs `rounded-md` (8px).

## Architecture

```
app/
  actions/          # Server Actions ("use server") — all mutations
  api/auth/[...]    # NextAuth catch-all route
  dashboard/
    employer/       # Employer: manage jobs, view applications
    jobseeker/      # Jobseeker: bookmarks, applications
  job-list/         # Public job listing with search, filters, pagination
components/         # React components (shadcn/ui + custom)
  ui/               # shadcn/ui primitives
  searchInput.tsx   # Keyword search (updates ?q=)
forms/              # Form components (addJobForm, filterForm)
lib/
  utils.ts          # cn() helper for Tailwind class merging
types/              # Type augmentations (next-auth session)
prisma.ts           # Prisma singleton (root-level)
auth.ts             # NextAuth config (root-level)
```

## Key Patterns

- **Server Actions** for all mutations (register, add job, add bookmark, add application, update/delete job). Located in `app/actions/`. Every action calls `auth()` and enforces role/ownership server-side; inputs are validated with Zod.
- **Server components** fetch data directly via Prisma (e.g., dashboard pages call `prisma` in the component body).
- **Path alias**: `@/*` maps to project root (e.g., `import { prisma } from "@/prisma"`).
- **shadcn/ui**: new-york style, Radix primitives, lucide icons. Config in `components.json`.
- **No client state library.** Redux was removed; the app is dark-only and has no global client state. Don't reintroduce a store for theme/modal.
- **Search + filters** live in URL `searchParams` (`q`, `type`, `location`, `category`, `sortBy`, `page`) — preserve them when building links.

## Gotchas

- **`bcryptjs` only.** `auth.ts` and `app/actions/register.ts` both use `bcryptjs`. The native `bcrypt` package was removed — do not add it.
- **No env validation**. `.env` has `DATABASE_URL`, `.env.local` has `AUTH_SECRET`. Missing either will fail at runtime, not build time.
- **Image domains**: `img.logo.dev` and `cdn.jsdelivr.net` are whitelisted in `next.config.js` via `remotePatterns`.
- **`app/sitemap.ts` is `force-dynamic`** so `next build` does not require DB access. Keep it dynamic.
- **Seed data passwords** are plaintext strings like `"hashedpassword1"` — they are NOT actually hashed. The auth flow uses bcrypt, so seeded users cannot log in with these passwords. Seed is for dev data only.
- **Prisma `companyId`** on employer users is set at registration and embedded in the JWT. Server actions read it from the session, not from the DB.
- **No CI/CD** configured. No GitHub Actions or pre-commit hooks.
