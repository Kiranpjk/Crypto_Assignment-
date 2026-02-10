
import Link from 'next/link';
import Image from 'next/image';
import { MarketCoin } from '../types/crypto';

export default function CoinCard({ coin }: { coin: MarketCoin }) {
  const isPositive = (coin.price_change_percentage_24h || 0) > 0;

  return (
    <Link href={`/coin/${coin.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Image 
              src={coin.image} 
              alt={coin.name} 
              width={40} 
              height={40} 
              style={{ marginRight: '10px', borderRadius: '50%' }} 
            />
            <div>
              <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{coin.name}</h2>
              <span style={{ color: 'var(--secondary-color)', fontSize: '0.875rem' }}>{coin.symbol.toUpperCase()}</span>
            </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
            <div className="price">₹{coin.current_price?.toLocaleString('en-IN') ?? 'N/A'}</div>
            <div className={isPositive ? 'change-positive' : 'change-negative'} style={{ fontWeight: 'bold' }}>
            {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2) ?? '0.00'}%
            </div>
        </div>
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--secondary-color)' }}>
            Mkt Cap: ₹{(coin.market_cap?.toLocaleString('en-IN') ?? 'N/A')}
        </div>
    </Link>
  );
}
