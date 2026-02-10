import { MarketCoin, CoinDetail } from '../types/crypto';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export const getMarkets = async (perPage = 20, page = 1): Promise<MarketCoin[]> => {
  try {
    const res = await fetch(`${COINGECKO_API_URL}/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h,24h,7d`);
    if (!res.ok) {
        throw new Error('Failed to fetch markets');
    }
    const data: MarketCoin[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    return [];
  }
};

export const getCoinDetail = async (id: string): Promise<CoinDetail | null> => {
    try {
        const res = await fetch(`${COINGECKO_API_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`);
        if (!res.ok) {
            throw new Error(`Failed to fetch coin detail for ${id}`);
        }
        const data = await res.json();
        return data as CoinDetail;
    } catch (error) {
        console.error(`Error fetching coin detail for ${id}:`, error);
        return null;
    }
}
