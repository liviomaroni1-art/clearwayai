import { ScreenerStock } from './types';

export interface InvestmentTip {
  ticker: string;
  name: string;
  price: number;
  signal: 'STRONG_BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG_SELL';
  confidence: number; // 0-100
  score: number; // confluence score 0-10
  summary: string;
  reasoning: {
    category: string;
    signal: 'bullish' | 'bearish' | 'neutral';
    detail: string;
    weight: number;
  }[];
  targets: {
    entry: number;
    stopLoss: number;
    target1: number;
    target2: number;
  };
  timeframe: string;
  sector: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export function generateTip(stock: ScreenerStock): InvestmentTip {
  const reasoning: InvestmentTip['reasoning'] = [];
  let bullishPoints = 0;
  let bearishPoints = 0;
  let totalWeight = 0;

  // 1. TREND ANALYSIS (weight: 3)
  const weight1 = 3;
  totalWeight += weight1;
  if (stock.ma200 > 0 && stock.price > stock.ma200) {
    if (stock.ma50 > 0 && stock.price > stock.ma50 && stock.ma50 > stock.ma200) {
      bullishPoints += weight1;
      reasoning.push({
        category: 'Trend',
        signal: 'bullish',
        detail: `Strong uptrend — price ($${stock.price.toFixed(2)}) above both 50MA ($${stock.ma50.toFixed(2)}) and 200MA ($${stock.ma200.toFixed(2)}), golden cross formation`,
        weight: weight1,
      });
    } else {
      bullishPoints += weight1 * 0.6;
      reasoning.push({
        category: 'Trend',
        signal: 'bullish',
        detail: `Above 200MA ($${stock.ma200.toFixed(2)}) — long-term uptrend intact but short-term momentum weakening`,
        weight: weight1 * 0.6,
      });
    }
  } else if (stock.ma200 > 0) {
    bearishPoints += weight1;
    reasoning.push({
      category: 'Trend',
      signal: 'bearish',
      detail: `Below 200MA ($${stock.ma200.toFixed(2)}) — long-term downtrend, wait for recovery above key moving averages`,
      weight: weight1,
    });
  }

  // 2. MOMENTUM / RSI (weight: 2)
  const weight2 = 2;
  totalWeight += weight2;
  if (stock.rsi < 30) {
    bullishPoints += weight2;
    reasoning.push({
      category: 'Momentum',
      signal: 'bullish',
      detail: `RSI at ${stock.rsi.toFixed(1)} — deeply oversold, high probability of mean reversion bounce`,
      weight: weight2,
    });
  } else if (stock.rsi < 40) {
    bullishPoints += weight2 * 0.5;
    reasoning.push({
      category: 'Momentum',
      signal: 'bullish',
      detail: `RSI at ${stock.rsi.toFixed(1)} — approaching oversold territory, potential buying opportunity`,
      weight: weight2 * 0.5,
    });
  } else if (stock.rsi > 70) {
    bearishPoints += weight2;
    reasoning.push({
      category: 'Momentum',
      signal: 'bearish',
      detail: `RSI at ${stock.rsi.toFixed(1)} — overbought, risk of pullback. Consider waiting for RSI < 60`,
      weight: weight2,
    });
  } else if (stock.rsi > 60) {
    bearishPoints += weight2 * 0.3;
    reasoning.push({
      category: 'Momentum',
      signal: 'neutral',
      detail: `RSI at ${stock.rsi.toFixed(1)} — neutral-to-elevated momentum, trend still intact`,
      weight: weight2 * 0.3,
    });
  } else {
    reasoning.push({
      category: 'Momentum',
      signal: 'neutral',
      detail: `RSI at ${stock.rsi.toFixed(1)} — neutral zone, no extreme reading`,
      weight: 0,
    });
  }

  // 3. VALUATION / P/E (weight: 2)
  const weight3 = 2;
  totalWeight += weight3;
  if (stock.pe > 0 && stock.pe < 15) {
    bullishPoints += weight3;
    reasoning.push({
      category: 'Valuation',
      signal: 'bullish',
      detail: `P/E of ${stock.pe.toFixed(1)} — attractively valued, trading below market average`,
      weight: weight3,
    });
  } else if (stock.pe > 0 && stock.pe < 25) {
    bullishPoints += weight3 * 0.3;
    reasoning.push({
      category: 'Valuation',
      signal: 'neutral',
      detail: `P/E of ${stock.pe.toFixed(1)} — fairly valued relative to historical averages`,
      weight: weight3 * 0.3,
    });
  } else if (stock.pe > 40) {
    bearishPoints += weight3;
    reasoning.push({
      category: 'Valuation',
      signal: 'bearish',
      detail: `P/E of ${stock.pe.toFixed(1)} — expensive valuation, high expectations priced in`,
      weight: weight3,
    });
  } else if (stock.pe > 25) {
    bearishPoints += weight3 * 0.3;
    reasoning.push({
      category: 'Valuation',
      signal: 'neutral',
      detail: `P/E of ${stock.pe.toFixed(1)} — slightly elevated but acceptable for growth`,
      weight: weight3 * 0.3,
    });
  }

  // 4. EARNINGS GROWTH (weight: 2.5)
  const weight4 = 2.5;
  totalWeight += weight4;
  if (stock.epsGrowth > 20) {
    bullishPoints += weight4;
    reasoning.push({
      category: 'Earnings',
      signal: 'bullish',
      detail: `EPS growth ${stock.epsGrowth > 0 ? '+' : ''}${stock.epsGrowth.toFixed(1)}% YoY — strong earnings acceleration, fundamentally healthy`,
      weight: weight4,
    });
  } else if (stock.epsGrowth > 5) {
    bullishPoints += weight4 * 0.5;
    reasoning.push({
      category: 'Earnings',
      signal: 'bullish',
      detail: `EPS growth +${stock.epsGrowth.toFixed(1)}% YoY — moderate growth, steady fundamentals`,
      weight: weight4 * 0.5,
    });
  } else if (stock.epsGrowth < -10) {
    bearishPoints += weight4;
    reasoning.push({
      category: 'Earnings',
      signal: 'bearish',
      detail: `EPS decline ${stock.epsGrowth.toFixed(1)}% YoY — earnings deteriorating, fundamental risk`,
      weight: weight4,
    });
  } else {
    reasoning.push({
      category: 'Earnings',
      signal: 'neutral',
      detail: `EPS growth ${stock.epsGrowth.toFixed(1)}% YoY — flat earnings, limited catalyst`,
      weight: 0,
    });
  }

  // 5. CONFLUENCE SCORE (weight: 1.5)
  const weight5 = 1.5;
  totalWeight += weight5;
  if (stock.confluenceScore >= 7) {
    bullishPoints += weight5;
    reasoning.push({
      category: 'Confluence',
      signal: 'bullish',
      detail: `Confluence score ${stock.confluenceScore}/10 — multiple bullish signals aligning (${stock.confluenceReasons.join(', ')})`,
      weight: weight5,
    });
  } else if (stock.confluenceScore >= 4) {
    bullishPoints += weight5 * 0.3;
    reasoning.push({
      category: 'Confluence',
      signal: 'neutral',
      detail: `Confluence score ${stock.confluenceScore}/10 — mixed signals, some factors favorable`,
      weight: weight5 * 0.3,
    });
  } else {
    bearishPoints += weight5;
    reasoning.push({
      category: 'Confluence',
      signal: 'bearish',
      detail: `Confluence score ${stock.confluenceScore}/10 — few bullish factors present`,
      weight: weight5,
    });
  }

  // Calculate final signal
  const netScore = bullishPoints - bearishPoints;
  const maxScore = totalWeight;
  const normalizedScore = ((netScore + maxScore) / (2 * maxScore)) * 100; // 0-100 scale

  let signal: InvestmentTip['signal'];
  if (normalizedScore >= 80) signal = 'STRONG_BUY';
  else if (normalizedScore >= 60) signal = 'BUY';
  else if (normalizedScore >= 40) signal = 'HOLD';
  else if (normalizedScore >= 25) signal = 'SELL';
  else signal = 'STRONG_SELL';

  // Calculate price targets
  const atr = stock.price * 0.02; // Approximate ATR as 2% of price
  const targets = {
    entry: stock.price,
    stopLoss: stock.price * (signal.includes('BUY') ? 0.95 : 1.05),
    target1: stock.price * (signal.includes('BUY') ? 1.08 : 0.92),
    target2: stock.price * (signal.includes('BUY') ? 1.15 : 0.85),
  };

  // Risk level
  let riskLevel: InvestmentTip['riskLevel'] = 'MEDIUM';
  if (stock.rsi > 70 || stock.rsi < 30 || stock.pe > 50) riskLevel = 'HIGH';
  else if (stock.pe > 0 && stock.pe < 20 && stock.rsi > 40 && stock.rsi < 60) riskLevel = 'LOW';

  // Build summary
  const bullishReasons = reasoning.filter(r => r.signal === 'bullish').map(r => r.category);
  const bearishReasons = reasoning.filter(r => r.signal === 'bearish').map(r => r.category);

  let summary = '';
  if (signal === 'STRONG_BUY') {
    summary = `Strong buy signal — ${bullishReasons.join(', ')} all pointing bullish. High conviction entry.`;
  } else if (signal === 'BUY') {
    summary = `Buy signal — favorable ${bullishReasons.join(' & ')} conditions. ${bearishReasons.length > 0 ? `Watch: ${bearishReasons.join(', ')}.` : ''}`;
  } else if (signal === 'HOLD') {
    summary = `Hold — mixed signals. Bullish: ${bullishReasons.join(', ') || 'none'}. Bearish: ${bearishReasons.join(', ') || 'none'}. Wait for clearer setup.`;
  } else if (signal === 'SELL') {
    summary = `Sell signal — ${bearishReasons.join(' & ')} concerns outweigh positives. Consider reducing position.`;
  } else {
    summary = `Strong sell — ${bearishReasons.join(', ')} all flashing warning. Exit or hedge position.`;
  }

  return {
    ticker: stock.ticker,
    name: stock.name,
    price: stock.price,
    signal,
    confidence: Math.round(Math.abs(normalizedScore - 50) * 2),
    score: stock.confluenceScore,
    summary,
    reasoning,
    targets,
    timeframe: signal.includes('BUY') && stock.rsi < 35 ? 'Short-term (1-4 weeks)' : 'Medium-term (1-3 months)',
    sector: stock.sector,
    riskLevel,
  };
}

export function getSignalColor(signal: InvestmentTip['signal']): string {
  switch (signal) {
    case 'STRONG_BUY': return '#22c55e';
    case 'BUY': return '#38bdf8';
    case 'HOLD': return '#f59e0b';
    case 'SELL': return '#f97316';
    case 'STRONG_SELL': return '#ef4444';
  }
}

export function getSignalEmoji(signal: InvestmentTip['signal']): string {
  switch (signal) {
    case 'STRONG_BUY': return '🚀';
    case 'BUY': return '📈';
    case 'HOLD': return '⏸️';
    case 'SELL': return '📉';
    case 'STRONG_SELL': return '🔴';
  }
}

export function getRiskColor(risk: InvestmentTip['riskLevel']): string {
  switch (risk) {
    case 'LOW': return '#22c55e';
    case 'MEDIUM': return '#f59e0b';
    case 'HIGH': return '#ef4444';
  }
}
