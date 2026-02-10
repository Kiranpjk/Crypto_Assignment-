import { GetServerSideProps } from 'next';
import { getMarkets } from '../services/api';

const EXTERNAL_DATA_URL = 'https://your-domain.com'; /* Configure this before deployment */

function generateSiteMap(coins: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${EXTERNAL_DATA_URL}/about</loc>
     </url>
     ${coins
       .map(({ id, last_updated }) => {
         return `
       <url>
           <loc>${EXTERNAL_DATA_URL}/coin/${id}</loc>
           <lastmod>${last_updated ? new Date(last_updated).toISOString() : new Date().toISOString()}</lastmod>
           <changefreq>hourly</changefreq>
           <priority>0.8</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // We make an API call to gather the URLs for our site
  const coins = await getMarkets(100, 1); // Get top 100 coins for sitemap

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(coins);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
