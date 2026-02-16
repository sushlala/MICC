# CLAUDE.md — Agent Instructions for MICC Hospitality

## Project Overview

MICC is a premium concierge platform built with **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, **Tailwind CSS v4**, **Framer Motion**, and **Supabase**. It serves luxury event production, media, lighting, and lifestyle management in Los Angeles.

## Quick Start

```bash
npm install
cp .env.example .env.local   # fill in Supabase creds, or leave blank for demo mode
npm run dev                   # http://localhost:3000
```

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (also validates types) |
| `npm run lint` | Run ESLint |
| `npm start` | Start production server |

## Architecture

```
src/
├── app/                    # Next.js App Router (pages + API routes)
│   ├── layout.tsx          # Root layout (Navbar, Footer, CtaFloat)
│   ├── page.tsx            # Homepage
│   ├── about/page.tsx
│   ├── membership/page.tsx
│   ├── packages/page.tsx
│   ├── request/page.tsx    # Request form
│   ├── request/confirmation/page.tsx
│   ├── pillars/[slug]/page.tsx  # Dynamic pillar detail pages
│   └── api/request/route.ts    # POST endpoint for form submissions
├── components/
│   ├── layout/             # Navbar, Footer, MobileMenu, CtaFloat
│   ├── ui/                 # Button, Card, Container, Section, Badge, Input, Textarea, Select
│   ├── home/               # Hero, OfferingsGrid, StorySection, FeaturedPackages, CtaBanner
│   ├── membership/         # MembershipHero, BenefitsGrid, ProcessDiagram, MembershipForm
│   ├── request/            # RequestForm
│   └── packages/           # PackageCatalog
├── lib/
│   ├── constants.ts        # Pillars, vibe tags, budget ranges, nav links, seed packages
│   ├── validations.ts      # Zod schemas for form validation
│   ├── utils.ts            # cn() classname helper
│   └── supabase/
│       ├── client.ts       # Browser Supabase client
│       ├── server.ts       # Server Supabase client (SSR)
│       └── admin.ts        # Service-role client (API routes only)
└── types/
    ├── components.ts       # Component prop types
    └── database.ts         # RequestRow, PackageRow, RequestStatus
```

## Database

- **Schema:** `supabase/migrations/20250214000000_initial.sql`
- **Tables:** `requests` (event submissions), `packages` (service packages)
- **RLS:** Enabled on both tables. Packages are publicly readable (active only). Requests are write-only via service role.
- **Local Supabase:** `supabase start` (port 54321 API, 54322 DB)

## Key Patterns

- **Client vs Server components:** Interactive components (forms, carousels) use `"use client"`. Pages are server components by default.
- **Forms:** React Hook Form + Zod validation + `@hookform/resolvers`.
- **Styling:** Tailwind v4 with CSS variables defined in `globals.css`. CVA for component variants. `cn()` for class merging.
- **Animations:** Framer Motion with `whileInView` for scroll-triggered entrances.
- **Path alias:** `@/*` maps to `./src/*`.

## API Routes

### `POST /api/request`
- Validates body against `requestFormSchema` (Zod)
- Maps `budget_range` label to min/max integers
- Falls back to demo mode if Supabase env vars are missing
- Inserts into `requests` table via admin client
- Returns `{ success, message, id }`

## Conventions

- Components are named exports in kebab-case files (e.g., `offerings-grid.tsx` exports `OfferingsGrid`)
- Types live in `src/types/`, validation schemas in `src/lib/validations.ts`
- Business data (pillars, budgets, vibes) lives in `src/lib/constants.ts` — this is the single source of truth
- UI components in `components/ui/` are generic and reusable; page-specific components live in their feature folder

## Do Not

- Commit `.env.local` or any file containing real Supabase keys
- Modify the Supabase migration file after it has been applied — create a new migration instead
- Use the Supabase admin/service-role client in client components — it must only be used in API routes or server actions
- Remove the demo-mode fallback in `api/request/route.ts` — it allows the app to function without a database
