# Crypto SEO Tracker

[![CI](https://github.com/Kiranpjk/crypto_assignment-/actions/workflows/ci.yml/badge.svg)](https://github.com/Kiranpjk/crypto_assignment-/actions/workflows/ci.yml)

A server-side rendered (SSR) Next.js application designed to track real-time cryptocurrency prices, market caps, and trends in INR. This project demonstrates programmatic SEO by generating dynamic pages for thousands of cryptocurrencies with optimized metadata, JSON-LD schema, and OpenGraph tags.

**Live site:** https://crypto-assignment-nu.vercel.app

## 🚀 Features

- **Server-Side Rendering (SSR)** using `getServerSideProps` for optimal SEO.
- **Programmatic SEO** pages for individual cryptocurrencies (e.g., `/coin/bitcoin`, `/coin/ethereum`).
- **Dynamic Metadata**: Automatic generation of titles, descriptions, and OpenGraph images for every page.
- **JSON-LD Schema**: Implements `ItemList` and `Product` schemas for rich search results.
- **Sitemap Generation**: dynamic XML sitemap at `/sitemap.xml`.
- **Responsive UI**: Dark-themed, mobile-friendly design using CSS Grid and standard CSS variables.
- **Real-Time Data**: Fetches live market data from CoinGecko API.
- **Localization**: Prices and number formatting adapted for the Indian market (INR).

## 🛠 Tech Stack

- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: CSS Modules / Global CSS (with variables)
- **Data Source**: CoinGecko API
- **Testing**: Vitest (unit tests for the API service and number formatting)
- **Deployment**: Vercel (live site), Docker image on GHCR

## 📦 Installation & Setup

### Prerequisites

- Node.js (LTS recommended)
- npm (or yarn/pnpm)

### Configure site URL (for canonical URLs, OpenGraph URLs, JSON-LD, sitemap, robots)

This app uses `NEXT_PUBLIC_SITE_URL` to generate absolute URLs in SEO metadata.

1. Create an environment file (for local dev):

    - Copy `.env.example` to `.env.local`
    - Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

> Note: `.env.local` is ignored by git; only `.env.example` is committed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Kiranpjk/Crypto_Assignment-.git
    cd Crypto_Assignment-
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Production build

```bash
npm run build
npm run start
```

## 🧪 Tests and checks

```bash
npm run lint        # ESLint (next/core-web-vitals + TypeScript rules)
npm run typecheck   # tsc --noEmit (run `npx next typegen` first on a fresh clone)
npm test            # Vitest unit tests, no network needed
```

## 🐳 Run with Docker

The `Dockerfile` builds Next.js in [standalone mode](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
(enabled only inside the image via `NEXT_OUTPUT=standalone`, so Vercel builds are unchanged) and runs it as a non-root user.

```bash
docker build -t crypto-seo-tracker --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:3000 .
docker run --rm -p 3000:3000 crypto-seo-tracker
```

Or pull the image CI publishes from the `main` branch:

```bash
docker run --rm -p 3000:3000 ghcr.io/kiranpjk/crypto-seo-tracker:latest
```

## ⚙️ CI/CD

- **CI** (`.github/workflows/ci.yml`) runs on every push to `main` and on pull requests:
  lint → typecheck → unit tests → `next build`.
- **Docker**: after the checks pass, the image is built; on pushes to `main` it is pushed to
  GitHub Container Registry as `ghcr.io/kiranpjk/crypto-seo-tracker` (tags `latest` and `sha-<commit>`).
- **Deployment**: Vercel's Git integration deploys the site; the workflow does not touch Vercel.
- **Dependabot** opens weekly update PRs for npm packages, GitHub Actions and the Docker base image.

## 📂 Project Structure

- `src/pages/`: Next.js pages (routes).
  - `index.tsx`: Homepage listing top cryptocurrencies.
  - `coin/[id].tsx`: Dynamic coin detail page.
  - `sitemap.xml.tsx`: Dynamic sitemap generator.
- `src/components/`: Reusable UI components (`CoinCard`, `Seo`, `Sparkline`, `Layout`).
- `src/services/`: API integration logic (`api.test.ts` covers it with a mocked `fetch`).
- `src/utils/`: INR / percent formatting helpers (with tests).
- `src/types/`: TypeScript interfaces.
- `src/styles/`: Global styles and strict CSS.

## 🔍 SEO Implementation Details

This project strictly adheres to SEO best practices:
- **SSR**: Ensures search engines crawl fully rendered content.
- **Semantic HTML**: Proper use of `h1`, `h2`, `article`, `section` tags.
- **Meta Tags**: Unique `title` and `description` for every coin page.
- **Schema Markup**: Structured data is injected via `application/ld+json` script tags.
- **Performance**: Optimized images using `next/image`.

## 🧭 Key Routes

- `/` — Market overview (SSR)
- `/coin/[id]` — Dynamic coin page (SSR)
- `/sitemap.xml` — Dynamic sitemap (SSR)
- `/robots.txt` — Dynamic robots file


