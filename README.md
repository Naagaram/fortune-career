# CareerVault

CareerVault is a production-ready career discovery directory built with Next.js 14, TypeScript, Tailwind, shadcn-style UI primitives, and PostgreSQL (Prisma ORM).

## What it does
- Lists Fortune-oriented IT and Manufacturing companies
- Supports client-side fuzzy search and filters
- Provides safe redirect paths to official company career pages
- Includes dynamic company pages, legal pages, sitemap, robots, and OpenGraph metadata
- Includes rate-limited API routes with input validation

## Project Structure
- `app/` App Router pages, API routes, SEO routes (`sitemap.ts`, `robots.ts`)
- `components/` reusable UI and layout components
- `lib/` database, utility, security, validation, and data services
- `prisma/` schema and seed script
- `public/` static assets

## Prerequisites
- Node.js 20+
- PostgreSQL running locally or remotely

## Setup
1. Install dependencies:
```bash
npm install
```

2. Create env file:
```bash
cp .env.example .env
```

3. Update `DATABASE_URL` in `.env` if needed.

4. Run migrations:
```bash
npx prisma migrate dev --name init
```

5. Seed data (50 companies):
```bash
npm run seed
```

6. Start dev server:
```bash
npm run dev
```

## Deploy to Vercel
1. Push repository to GitHub.
2. Import project in Vercel.
3. Set environment variables in Vercel project settings:
- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL` (your production URL)
4. Run production migration:
```bash
npx prisma migrate deploy
```
5. Deploy.

## Notes
- This website is not affiliated with listed companies.
- It only links to publicly available official careers pages.
