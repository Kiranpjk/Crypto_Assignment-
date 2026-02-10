import Link from 'next/link';
import { MarketCoin } from '../types/crypto';

export default function CoinCard({ coin }: { coin: MarketCoin }) {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <Link href={`/coin/${coin.id}`} legacyBehavior>
        <a className="card">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <img src={coin.image} alt={coin.name} width={40} height={40} style={{ marginRight: '10px' }} />
                <div>
                <h2>{coin.name}</h2>
                <span style={{ color: 'var(--secondary-color)' }}>{coin.symbol.toUpperCase()}</span>
                </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                <div className="price">${coin.current_price.toLocaleString()}</div>
                <div className={isPositive ? 'change-positive' : 'change-negative'} style={{ fontWeight: 'bold' }}>
                {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                </div>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--secondary-color)' }}>
                Mkt Cap: ${coin.market_cap.toLocaleString()}
            </div>
        </a>
    </Link>
  );
}
