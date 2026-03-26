import { HistoryBar } from './types';

export function calculateRSI(bars: HistoryBar[], period: number = 14): number {
  if (bars.length < period + 1) return 50;

  const closes = bars.map(b => b.close);
  const changes: number[] = [];
  for (let i = 1; i < closes.length; i++) {
    changes.push(closes[i] - closes[i - 1]);
  }

  // Initial average gain/loss
  let avgGain = 0;
  let avgLoss = 0;
  for (let i = 0; i < period; i++) {
    if (changes[i] > 0) avgGain += changes[i];
    else avgLoss += Math.abs(changes[i]);
  }
  avgGain /= period;
  avgLoss /= period;

  // Wilder's smoothing
  for (let i = period; i < changes.length; i++) {
    const gain = changes[i] > 0 ? changes[i] : 0;
    const loss = changes[i] < 0 ? Math.abs(changes[i]) : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
  }

  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

export function calculateSMA(bars: HistoryBar[], period: number): number {
  if (bars.length < period) return 0;
  const closes = bars.slice(-period).map(b => b.close);
  return closes.reduce((a, b) => a + b, 0) / period;
}

export function calculateConfluenceScore(
  rsi: number,
  price: number,
  ma50: number,
  ma200: number,
  epsGrowth: number,
  pe: number,
  sectorAvgPE: number,
  sectorFavored: boolean
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  if (rsi < 35) {
    score += 2;
    reasons.push('Oversold (RSI < 35)');
  }

  if (ma200 > 0 && price > ma200) {
    score += 2;
    reasons.push('Above 200MA (long-term uptrend)');
  }

  if (ma50 > 0 && price > ma50) {
    score += 1;
    reasons.push('Above 50MA (short-term momentum)');
  }

  if (epsGrowth > 10) {
    score += 2;
    reasons.push(`EPS growth ${epsGrowth.toFixed(1)}% YoY`);
  }

  if (sectorAvgPE > 0 && pe > 0 && pe < sectorAvgPE) {
    score += 1;
    reasons.push('P/E below sector average');
  }

  if (sectorFavored) {
    score += 2;
    reasons.push('Sector favored by macro regime');
  }

  return { score, reasons };
}

export function calculateMacroRegime(scores: {
  gdp: number;
  unemployment: number;
  fedFunds: number;
  cpi: number;
  sentiment: number;
}): { compositeScore: number; regime: 'Expansion' | 'Late Cycle' | 'Slowdown' | 'Contraction' } {
  const compositeScore = scores.gdp + scores.unemployment + scores.fedFunds + scores.cpi + scores.sentiment;

  let regime: 'Expansion' | 'Late Cycle' | 'Slowdown' | 'Contraction';
  if (compositeScore >= 8) regime = 'Expansion';
  else if (compositeScore >= 6) regime = 'Late Cycle';
  else if (compositeScore >= 4) regime = 'Slowdown';
  else regime = 'Contraction';

  return { compositeScore, regime };
}

export function getRegimeFavoredSectors(regime: 'Expansion' | 'Late Cycle' | 'Slowdown' | 'Contraction'): string[] {
  switch (regime) {
    case 'Expansion':
      return ['Technology', 'Consumer Cyclical', 'Communication Services', 'Industrials', 'Financial Services'];
    case 'Late Cycle':
      return ['Energy', 'Basic Materials', 'Industrials', 'Financial Services'];
    case 'Slowdown':
      return ['Healthcare', 'Consumer Defensive', 'Utilities', 'Real Estate'];
    case 'Contraction':
      return ['Consumer Defensive', 'Healthcare', 'Utilities'];
  }
}
