import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getCoinDetail, getMarkets } from './api';

const fetchMock = vi.fn();

function jsonResponse(body: unknown, ok = true, status = 200) {
  return { ok, status, json: async () => body } as Response;
}

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  fetchMock.mockReset();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('getMarkets', () => {
  it('requests INR markets with the given page size and page', async () => {
    const coins = [{ id: 'bitcoin' }, { id: 'ethereum' }];
    fetchMock.mockResolvedValue(jsonResponse(coins));

    await expect(getMarkets(50, 2)).resolves.toEqual(coins);

    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(url.origin + url.pathname).toBe('https://api.coingecko.com/api/v3/coins/markets');
    expect(url.searchParams.get('vs_currency')).toBe('inr');
    expect(url.searchParams.get('per_page')).toBe('50');
    expect(url.searchParams.get('page')).toBe('2');
  });

  it('defaults to 20 coins on page 1', async () => {
    fetchMock.mockResolvedValue(jsonResponse([]));
    await getMarkets();
    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(url.searchParams.get('per_page')).toBe('20');
    expect(url.searchParams.get('page')).toBe('1');
  });

  it('returns an empty list on an HTTP error (e.g. rate limit)', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}, false, 429));
    await expect(getMarkets()).resolves.toEqual([]);
  });

  it('returns an empty list on a network error', async () => {
    fetchMock.mockRejectedValue(new TypeError('fetch failed'));
    await expect(getMarkets()).resolves.toEqual([]);
  });
});

describe('getCoinDetail', () => {
  it('fetches a single coin by id', async () => {
    const coin = { id: 'bitcoin', name: 'Bitcoin' };
    fetchMock.mockResolvedValue(jsonResponse(coin));

    await expect(getCoinDetail('bitcoin')).resolves.toEqual(coin);
    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(url.pathname).toBe('/api/v3/coins/bitcoin');
    expect(url.searchParams.get('market_data')).toBe('true');
  });

  it('URL-encodes the id so it cannot change the request path', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}));
    await getCoinDetail('../markets?x=1');
    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(url.pathname).toBe('/api/v3/coins/..%2Fmarkets%3Fx%3D1');
  });

  it('returns null when the coin does not exist', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ error: 'coin not found' }, false, 404));
    await expect(getCoinDetail('nope')).resolves.toBeNull();
  });

  it('returns null on a network error', async () => {
    fetchMock.mockRejectedValue(new TypeError('fetch failed'));
    await expect(getCoinDetail('bitcoin')).resolves.toBeNull();
  });
});
