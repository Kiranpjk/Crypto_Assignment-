// Public address of the site, used for canonical URLs, JSON-LD and the sitemap.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://crypto-assignment-nu.vercel.app'
).replace(/\/$/, '');
