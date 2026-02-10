
# Crypto SEO Tracker

A server-side rendered (SSR) React application built with Next.js, designed for SEO optimization. It displays real-time cryptocurrency data from CoinGecko, featuring dynamic programmatic SEO pages.

## Features
- **Server-Side Rendering (SSR)**: All pages are rendered on the server for optimal SEO.
- **Programmatic SEO**: Generates dynamic pages for each cryptocurrency with unique meta tags.
- **Dynamic Meta Tags**: Custom titles, descriptions, and OpenGraph tags for every page.
- **JSON-LD Schema**: Structured data for search engines (ItemList for home, Product/FinancialProduct for details).
- **Responsive Design**: Fast, mobile-first design with a dark theme.
- **Performance**: Optimized images and efficient API caching.

## Tech Stack
- **Framework**: Next.js
- **UI**: React, Vanilla CSS (Modules/Global)
- **Data**: CoinGecko API
- **Language**: TypeScript

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-seo-tracker.git
   cd crypto-seo-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)
1. Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2. Go to [Vercel](https://vercel.com) and sign in.
3. Click "Add New..." -> "Project".
4. Import your Git repository.
5. Keep default settings (Framework Preset: Next.js).
6. Click "Deploy".

### Netlify
1. Push your code to Git.
2. Log in to [Netlify](https://www.netlify.com/).
3. "Add new site" -> "Import an existing project".
4. Select your provider and repo.
5. Build command: `npm run build`.
6. Publish directory: `.next` (Netlify auto-detects Next.js).
7. Deploy.

## Project Structure
- `src/pages/index.tsx`: Homepage with paginated list of coins (SSR).
- `src/pages/coin/[id].tsx`: Dynamic detail page for each coin (SSR).
- `src/components/Seo.tsx`: Reusable SEO component for meta tags & JSON-LD.
- `src/services/api.ts`: API service for fetching CoinGecko data.
- `src/styles/globals.css`: Global styles and theme variables.

## SEO Strategy
- **Keyword Research**: Targeted keywords like "crypto price", "market cap", "[Coin Name] price", "chart".
- **Meta Tags**: Optimized `<title>` and `<meta name="description">` dynamically based on content.
- **Schema.org**: Implemented JSON-LD for rich snippets in search results.
- **Canonical URLs**: Added to prevent duplicate content issues.
