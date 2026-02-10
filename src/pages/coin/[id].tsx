
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Sparkline from '../../components/Sparkline';
import { getCoinDetail } from '../../services/api';
import { CoinDetail } from '../../types/crypto';

interface CoinPageProps {
  coin: CoinDetail | null;
}

const CoinPage: NextPage<CoinPageProps> = ({ coin }) => {
  if (!coin) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h1>Coin Not Found</h1>
          <p>The requested cryptocurrency could not be found.</p>
        </div>
      </Layout>
    );
  }

  const title = `${coin.name} (${coin.symbol.toUpperCase()}) Price, Chart & Market Cap`;
  const desc = `Live ${coin.name} price today: ₹${coin.market_data.current_price.inr.toLocaleString('en-IN')}. Discover complete data, market cap, trading volume and historical charts for ${coin.name}.`;
  
  const priceChangeColor = coin.market_data.price_change_percentage_24h > 0 ? '#4caf50' : '#f44336';


  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": coin.name,
    "image": coin.image.large,
    "description": desc,
    "sku": coin.id,
    "offers": {
        "@type": "Offer",
        "url": `https://your-domain.com/coin/${coin.id}`,
        "priceCurrency": "INR",
        "price": coin.market_data.current_price.inr,
        "availability": "https://schema.org/InStock"
    }
  };

  return (
    <Layout>
      <Seo 
        title={title}
        description={desc}
        ogImage={coin.image.large}
        jsonLd={structuredData}
        keywords={`${coin.name}, ${coin.symbol}, crypto price, ${coin.id} price, market cap`}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Header Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Image 
              src={coin.image.large} 
              alt={coin.name} 
              width={80} 
              height={80} 
              priority
            />
            <div>
                <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{coin.name} <span style={{ color: 'var(--secondary-color)', fontSize: '1.5rem' }}>{coin.symbol.toUpperCase()}</span></h1>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        ₹{coin.market_data.current_price.inr.toLocaleString('en-IN')}
                    </span>
                    <span style={{ 
                        color: priceChangeColor, 
                        fontWeight: 'bold', 
                        fontSize: '1.2rem',
                        backgroundColor: `${priceChangeColor}22`,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px'
                    }}>
                        {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </div>
            </div>
        </div>

        {/* Chart Section */}
        <div className="card" style={{ padding: '2rem', overflowX: 'auto' }}>
            <h2 style={{ marginBottom: '1rem' }}>7 Day Price Trend</h2>
            <div style={{ width: '100%', minWidth: '600px' }}>
             {coin.market_data.sparkline_7d && (
                <Sparkline 
                    data={coin.market_data.sparkline_7d.price} 
                    width={800} 
                    height={200} 
                    color={coin.market_data.price_change_percentage_7d >= 0 ? '#4caf50' : '#f44336'} 
                    strokeWidth={3}
                />
             )}
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid">
            <div className="card">
                <h3>Market Cap</h3>
                <p className="price">₹{coin.market_data.market_cap.inr.toLocaleString('en-IN')}</p>
                <small style={{ color: 'var(--secondary-color)' }}>Rank #{coin.market_data.market_cap_rank}</small>
            </div>
            <div className="card">
                <h3>24h Volume</h3>
                <p className="price">₹{coin.market_data.total_volume.inr.toLocaleString('en-IN')}</p>
            </div>
            <div className="card">
                <h3>Circulating Supply</h3>
                <p className="price">{coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</p>
            </div>
             <div className="card">
                <h3>All Time High</h3>
                <p className="price">₹{coin.market_data.high_24h.inr.toLocaleString('en-IN')}</p>
                {/* Note: high_24h is 24h high, ath is all time high. Using types. */}
            </div>
        </div>

        {/* Description */}
        <div className="card">
            <h2>About {coin.name}</h2>
            <div 
                style={{ lineHeight: '1.8', color: 'var(--text-color)' }}
                dangerouslySetInnerHTML={{ __html: coin.description.en || 'No description available.' }} 
            />
            
            {coin.links.homepage[0] && (
                <div style={{ marginTop: '1.5rem' }}>
                    <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>
                        Official Website
                    </a>
                </div>
            )}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const coin = await getCoinDetail(id);

  if (!coin) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
        coin,
    },
  };
};

export default CoinPage;
