# Crypto SEO Tracker

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
- **Deployment**: Vercel ready

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

## 📂 Project Structure

- `src/pages/`: Next.js pages (routes).
  - `index.tsx`: Homepage listing top cryptocurrencies.
  - `coin/[id].tsx`: Dynamic coin detail page.
  - `sitemap.xml.tsx`: Dynamic sitemap generator.
- `src/components/`: Reusable UI components (`CoinCard`, `Seo`, `Sparkline`, `Layout`).
- `src/services/`: API integration logic.
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


