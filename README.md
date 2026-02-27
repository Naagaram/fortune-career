# CareerVault

CareerVault is a career discovery directory built with Next.js 14, TypeScript, Tailwind CSS, and PostgreSQL via Prisma.

It lists companies and redirects users to official careers pages. It does not scrape or host job descriptions.

## Features
- Fortune-focused IT and Manufacturing company directory
- Search by company and job role
- Filters by category and location
- Company detail pages with external career links
- Legal pages (`/disclaimer`, `/privacy`, `/terms`)
- SEO routes (`/sitemap.xml`, `/robots.txt`)
- API validation and basic rate limiting

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL

## Project Structure
- `app/` pages, layouts, API routes, metadata routes
- `components/` UI and feature components
- `lib/` data access, security, validation, utilities
- `prisma/` schema, migrations, seed script
- `public/` static assets

## Prerequisites
- Node.js 20+
- PostgreSQL running locally or remotely

## Local Setup
1. Install dependencies:
```bash
npm install
```

2. Create env file:
```bash
cp .env.example .env
```

3. Set `DATABASE_URL` in `.env`.

4. Run migrations:
```bash
npx prisma migrate dev --name init
```

5. Seed 50 companies:
```bash
npm run seed
```

6. Start app:
```bash
npm run dev
```

7. Open:
- `http://localhost:3000`

## Access From Another Device On Same Wi-Fi
Start dev server on all interfaces:
```bash
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Find your local IP:
```bash
ipconfig getifaddr en0
```
(if needed, try `en1`)

Open from another device:
- `http://<your-local-ip>:3000`

## Deployment (Vercel)
1. Push code to GitHub.
2. Import repo in Vercel.
3. Add env vars:
- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
4. Run migrations in production:
```bash
npx prisma migrate deploy
```
5. Deploy.

## Troubleshooting
- `Can't reach database server at localhost:5432`:
  - Start PostgreSQL
  - Verify `DATABASE_URL`
  - Re-run migration + seed

- CSP error about `unsafe-eval` in local dev:
  - Restart dev server after middleware changes
  - Hard refresh browser

- Search not updating:
  - Ensure you are on latest code
  - Restart `npm run dev`

## Legal
This website is not affiliated with any listed companies.
It only provides links to publicly available official career pages.
