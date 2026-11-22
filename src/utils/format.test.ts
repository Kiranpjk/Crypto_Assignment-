import { describe, expect, it } from 'vitest';
import { formatINR, formatPercent } from './format';

describe('formatINR', () => {
  it('uses Indian digit grouping and the rupee sign', () => {
    expect(formatINR(1234567.5)).toBe('₹12,34,567.5');
    expect(formatINR(0)).toBe('₹0');
  });

  it('returns N/A for missing or invalid values', () => {
    expect(formatINR(null)).toBe('N/A');
    expect(formatINR(undefined)).toBe('N/A');
    expect(formatINR(Number.NaN)).toBe('N/A');
  });
});

describe('formatPercent', () => {
  it('rounds to two decimals', () => {
    expect(formatPercent(2.345)).toBe('2.35%');
    expect(formatPercent(-1.2)).toBe('-1.20%');
  });

  it('adds a plus sign only for positive values when signed', () => {
    expect(formatPercent(3, true)).toBe('+3.00%');
    expect(formatPercent(-3, true)).toBe('-3.00%');
    expect(formatPercent(0, true)).toBe('0.00%');
  });

  it('treats missing values as zero', () => {
    expect(formatPercent(null)).toBe('0.00%');
    expect(formatPercent(undefined, true)).toBe('0.00%');
  });
});
