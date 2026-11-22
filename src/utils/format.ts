// Number formatting shared by the coin list and coin detail pages (prices are in INR).

/** "₹1,23,456.78" for a number, "N/A" when the value is missing. */
export function formatINR(value: number | null | undefined): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 'N/A';
  return `₹${value.toLocaleString('en-IN')}`;
}

/** "2.35%" / "-1.20%"; with signed=true positive values get a "+" ("+2.35%"). Missing values count as 0. */
export function formatPercent(value: number | null | undefined, signed = false): string {
  const n = typeof value === 'number' && Number.isFinite(value) ? value : 0;
  return `${signed && n > 0 ? '+' : ''}${n.toFixed(2)}%`;
}
