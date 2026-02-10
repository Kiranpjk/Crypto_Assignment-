
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import CoinCard from '../components/CoinCard';
import { getMarkets } from '../services/api';
import { MarketCoin } from '../types/crypto';

interface HomeProps {
  coins: MarketCoin[];
  page: number;
}

const Home: NextPage<HomeProps> = ({ coins, page }) => {
  const title = `Top Cryptocurrency List - Page ${page} | Market Cap & Prices`;
  const desc = "Live crypto prices, market cap, and blockchain data. See Bitcoin, Ethereum, Solana, and 100+ coins ranked by market capitalization.";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Cryptocurrencies",
    "description": desc,
    "itemListElement": coins.map((coin, index) => ({
      "@type": "ListItem",
      "position": (page - 1) * 20 + index + 1,
      "item": {
        "@type": "Table",
        "url": `https://your-domain.com/coin/${coin.id}`,
        "name": coin.name,
        "image": coin.image
      }
    }))
  };

  return (
    <Layout>
      <Seo 
        title={title}
        description={desc}
        keywords="crypto prices, cryptocurrency, market cap, bitcoin, ethereum, altcoins"
        jsonLd={structuredData}
        canonicalUrl={`https://your-domain.com/?page=${page}`}
      />
      <div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
          Real-Time Crypto Market (Page {page})
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--secondary-color)', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
          Explore the top cryptocurrencies by market capitalization. Get live prices, 24h trading volume, and market trends instantly.
        </p>

        <section className="grid">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </section>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
          {page > 1 && (
            <Link href={`/?page=${page - 1}`} legacyBehavior>
                <a className="card" style={{ padding: '0.5rem 1.5rem', display: 'inline-block' }}>
                     ← Previous
                </a>
            </Link>
          )}
          <Link href={`/?page=${page + 1}`} legacyBehavior>
             <a className="card" style={{ padding: '0.5rem 1.5rem', display: 'inline-block' }}>
                 Next →
             </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1;
  // Fetch markets with pagination
  const coins = await getMarkets(20, page);
  
  // Set cache headers - critical for performance even with SSR
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=59'
  );

  return {
    props: {
      coins,
      page
    },
  };
};

export default Home;
