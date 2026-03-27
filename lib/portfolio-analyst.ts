import { Holding, Account } from './types';
import { SP500_STOCKS } from './sp500';

// Stock metadata for geographic/currency analysis
const STOCK_META: Record<string, { country: string; region: string; currency: string; asset_type: string }> = {};
// All S&P 500 stocks are US-listed, USD
SP500_STOCKS.forEach(s => {
  STOCK_META[s.ticker] = { country: 'United States', region: 'North America', currency: 'USD', asset_type: 'Stock' };
});
// Add common non-US or ETF overrides
const OVERRIDES: Record<string, Partial<typeof STOCK_META['AAPL']>> = {
  'LIN': { country: 'Ireland', region: 'Europe' },
  'ACN': { country: 'Ireland', region: 'Europe' },
  'SHOP': { country: 'Canada', region: 'North America' },
  'TSM': { country: 'Taiwan', region: 'Asia Pacific' },
  'NVO': { country: 'Denmark', region: 'Europe' },
  'ASML': { country: 'Netherlands', region: 'Europe' },
  'SAP': { country: 'Germany', region: 'Europe' },
  'BRK-B': { asset_type: 'Conglomerate' },
  'BURU': { asset_type: 'Micro Cap Stock' },
  'RR': { asset_type: 'Small Cap Stock' },
  'SOUN': { asset_type: 'Small Cap Stock' },
  'WYFI': { asset_type: 'Micro Cap Stock' },
  'SNDK': { asset_type: 'Large Cap Stock' },
  'LMT': { asset_type: 'Large Cap Stock' },
};
Object.entries(OVERRIDES).forEach(([t, o]) => {
  if (STOCK_META[t]) Object.assign(STOCK_META[t], o);
});

function getMeta(ticker: string) {
  return STOCK_META[ticker] || { country: 'United States', region: 'North America', currency: 'USD', asset_type: 'Stock' };
}

function getSector(ticker: string): string {
  const stock = SP500_STOCKS.find(s => s.ticker === ticker);
  return stock?.sector || 'Unknown';
}

interface LiveData {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  pe: number;
  eps: number;
  marketCap: number;
  volume: number;
  dividendYield: number;
  beta: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  rsi: number;
  ma50: number;
  ma200: number;
  epsGrowth: number;
  name: string;
}

interface InvestorProfile {
  risk_tolerance: 'low' | 'medium' | 'high';
  horizon: 'short' | 'medium' | 'long';
  max_single_position_pct: number;
  max_sector_pct: number;
  preferred_regions?: string[];
  excluded_sectors?: string[];
}

export function generateFullAnalysis(
  holdings: Holding[],
  account: Account,
  liveData: Record<string, LiveData>,
  macroRegime: string
) {
  const profile: InvestorProfile = {
    risk_tolerance: account.riskTolerance as any || 'medium',
    horizon: 'long',
    max_single_position_pct: account.maxPositionPct || 10,
    max_sector_pct: account.maxSectorPct || 30,
  };

  // Build enriched holdings
  const enrichedHoldings = holdings.map(h => {
    const live = liveData[h.ticker];
    const meta = getMeta(h.ticker);
    const sector = getSector(h.ticker);
    const price = live?.price || h.avgPrice;
    const marketValue = h.shares * price;
    const costBasis = h.shares * h.avgPrice;
    const unrealizedPnl = marketValue - costBasis;
    const unrealizedPnlPct = costBasis > 0 ? (unrealizedPnl / costBasis) * 100 : 0;

    // Factor scores (0-100)
    const pe = live?.pe || 0;
    const epsGrowth = live?.epsGrowth || 0;
    const rsi = live?.rsi || 50;
    const ma50 = live?.ma50 || price;
    const ma200 = live?.ma200 || price;
    const divYield = live?.dividendYield || 0;
    const beta = live?.beta || 1;

    const valueScore = pe > 0 ? Math.max(0, Math.min(100, 100 - (pe - 10) * 2.5)) : 50;
    const growthScore = Math.max(0, Math.min(100, 50 + epsGrowth * 2));
    const qualityScore = Math.max(0, Math.min(100, pe > 0 && pe < 50 ? 60 + (25 - pe) : 40));
    const momentumScore = (() => {
      let score = 50;
      if (ma200 > 0 && price > ma200) score += 20;
      if (ma50 > 0 && price > ma50) score += 15;
      if (rsi > 50 && rsi < 70) score += 15;
      else if (rsi < 30) score += 10; // oversold bounce potential
      else if (rsi > 70) score -= 10;
      return Math.max(0, Math.min(100, score));
    })();
    const dividendScore = Math.min(100, divYield * 25);
    const riskScore = Math.max(0, Math.min(100, 100 - beta * 30 - (rsi > 70 ? 20 : 0)));

    // AI conviction score
    const conviction = Math.round(
      valueScore * 0.2 + growthScore * 0.25 + qualityScore * 0.15 +
      momentumScore * 0.25 + dividendScore * 0.05 + riskScore * 0.1
    );

    // Recommendation
    let recommendation: string;
    if (conviction >= 75) recommendation = 'Strong Buy';
    else if (conviction >= 60) recommendation = 'Buy';
    else if (conviction >= 40) recommendation = 'Hold';
    else if (conviction >= 25) recommendation = 'Reduce';
    else recommendation = 'Sell';

    // Tags
    const tags: string[] = [];
    if (beta < 0.8) tags.push('Defensive');
    if (beta > 1.3) tags.push('High Beta');
    if (divYield > 3) tags.push('Income');
    if (epsGrowth > 20) tags.push('High Growth');
    if (pe > 0 && pe < 15) tags.push('Value');

    // Comment
    const bullets: string[] = [];
    if (momentumScore > 70) bullets.push('Strong price momentum with trend support');
    else if (momentumScore < 30) bullets.push('Weak momentum — below key moving averages');
    if (valueScore > 70) bullets.push(`Attractive valuation at ${pe.toFixed(1)}x P/E`);
    else if (pe > 35) bullets.push(`Elevated valuation at ${pe.toFixed(1)}x P/E`);
    if (epsGrowth > 15) bullets.push(`Solid earnings growth at ${epsGrowth > 0 ? '+' : ''}${epsGrowth.toFixed(1)}% YoY`);
    else if (epsGrowth < -5) bullets.push(`Earnings declining ${epsGrowth.toFixed(1)}% YoY — fundamental risk`);
    if (bullets.length === 0) bullets.push('Balanced risk/reward profile at current levels');

    return {
      ticker: h.ticker,
      name: live?.name || h.ticker,
      asset_type: meta.asset_type,
      region: meta.region,
      country: meta.country,
      sector,
      currency: meta.currency,
      quantity: h.shares,
      average_cost: h.avgPrice,
      current_price: price,
      market_value: marketValue,
      unrealized_pnl_value: unrealizedPnl,
      unrealized_pnl_pct: unrealizedPnlPct,
      income_yield_pct: divYield,
      factor_scores: {
        value: Math.round(valueScore),
        growth: Math.round(growthScore),
        quality: Math.round(qualityScore),
        momentum: Math.round(momentumScore),
        dividend_yield: Math.round(dividendScore),
        risk: Math.round(riskScore),
      },
      ai_conviction_score: conviction,
      recommendation,
      time_horizon: (conviction >= 60 && rsi < 35) ? 'Short' : conviction >= 50 ? 'Long' : 'Medium',
      tags,
      comment: bullets.join('. ') + '.',
      // raw data for further calculations
      _beta: beta,
      _pe: pe,
      _epsGrowth: epsGrowth,
      _rsi: rsi,
      _divYield: divYield,
    };
  });

  // Portfolio totals
  const investedValue = enrichedHoldings.reduce((s, h) => s + h.market_value, 0);
  const totalValue = investedValue + account.cashBalance;
  const totalCost = enrichedHoldings.reduce((s, h) => s + h.quantity * h.average_cost, 0);
  const unrealizedPnl = investedValue - totalCost;
  const unrealizedPnlPct = totalCost > 0 ? (unrealizedPnl / totalCost) * 100 : 0;

  // Add weight-based tags and compute weights
  enrichedHoldings.forEach(h => {
    const weight = totalValue > 0 ? (h.market_value / totalValue) * 100 : 0;
    (h as any)._weight = weight;
    if (weight > 8) h.tags.unshift('Core');
    else if (weight > 3) h.tags.unshift('Satellite');
    else h.tags.unshift('Speculative');
  });

  // ALLOCATION breakdowns
  const byRegion = aggregateBy(enrichedHoldings, 'region', totalValue, account.cashBalance);
  const byCountry = aggregateBy(enrichedHoldings, 'country', totalValue, account.cashBalance);
  const bySector = aggregateBy(enrichedHoldings, 'sector', totalValue, account.cashBalance);
  const byAssetType = aggregateBy(enrichedHoldings, 'asset_type', totalValue, account.cashBalance);
  const byCurrency = aggregateBy(enrichedHoldings, 'currency', totalValue, account.cashBalance);

  // FACTOR EXPOSURES (weighted average)
  const weightedFactors = {
    value: 0, growth: 0, quality: 0, momentum: 0, size: 50, dividend_yield: 0, risk: 0,
  };
  if (investedValue > 0) {
    enrichedHoldings.forEach(h => {
      const w = h.market_value / investedValue;
      weightedFactors.value += h.factor_scores.value * w;
      weightedFactors.growth += h.factor_scores.growth * w;
      weightedFactors.quality += h.factor_scores.quality * w;
      weightedFactors.momentum += h.factor_scores.momentum * w;
      weightedFactors.dividend_yield += h.factor_scores.dividend_yield * w;
      weightedFactors.risk += h.factor_scores.risk * w;
    });
  }
  Object.keys(weightedFactors).forEach(k => {
    (weightedFactors as any)[k] = Math.round((weightedFactors as any)[k]);
  });

  const factorComment = buildFactorComment(weightedFactors);

  // RISK metrics
  const sortedByWeight = enrichedHoldings.slice().sort((a, b) => b.market_value - a.market_value);
  const top10Pct = totalValue > 0
    ? (sortedByWeight.slice(0, 10).reduce((s, h) => s + h.market_value, 0) / totalValue) * 100
    : 0;
  const largestPct = totalValue > 0 && sortedByWeight.length > 0
    ? (sortedByWeight[0].market_value / totalValue) * 100 : 0;
  const avgBeta = investedValue > 0
    ? enrichedHoldings.reduce((s, h) => s + (h._beta || 1) * (h.market_value / investedValue), 0)
    : 1;
  const diversificationScore = computeDiversificationScore(enrichedHoldings, totalValue, bySector);

  const riskFlags: string[] = [];
  if (largestPct > profile.max_single_position_pct) {
    riskFlags.push(`${sortedByWeight[0].ticker} is ${largestPct.toFixed(1)}% of portfolio — exceeds ${profile.max_single_position_pct}% limit`);
  }
  if (top10Pct > 90) riskFlags.push('Top 10 holdings represent >90% of portfolio — highly concentrated');
  const cashPct = totalValue > 0 ? (account.cashBalance / totalValue) * 100 : 100;
  if (cashPct < 3) riskFlags.push('Cash reserves below 3% — limited flexibility for opportunities or drawdowns');
  if (cashPct > 40) riskFlags.push('Cash position >40% — significant capital underdeployed, opportunity cost risk');
  if (avgBeta > 1.3) riskFlags.push(`Portfolio beta of ${avgBeta.toFixed(2)} indicates above-market risk`);
  bySector.forEach(s => {
    if (s.weight_pct > profile.max_sector_pct) {
      riskFlags.push(`${s.sector} at ${s.weight_pct.toFixed(1)}% exceeds ${profile.max_sector_pct}% sector limit`);
    }
  });
  const techWeight = bySector.find(s => s.sector === 'Technology')?.weight_pct || 0;
  if (techWeight > 35) riskFlags.push(`Technology exposure at ${techWeight.toFixed(1)}% — consider diversification`);
  if (enrichedHoldings.some(h => h.unrealized_pnl_pct < -20)) {
    const losers = enrichedHoldings.filter(h => h.unrealized_pnl_pct < -20);
    riskFlags.push(`${losers.map(l => l.ticker).join(', ')} down >20% — review stop-loss levels`);
  }

  // TRADE IDEAS
  const sortedByConviction = enrichedHoldings.slice().sort((a, b) => b.ai_conviction_score - a.ai_conviction_score);
  const topBuys = sortedByConviction
    .filter(h => h.recommendation === 'Strong Buy' || h.recommendation === 'Buy')
    .slice(0, 5)
    .map(h => ({
      ticker: h.ticker,
      current_weight_pct: parseFloat(((h as any)._weight || 0).toFixed(2)),
      suggested_target_weight_pct: Math.min(profile.max_single_position_pct, parseFloat(((h as any)._weight || 0).toFixed(2)) + 2),
      rationale: h.comment,
      key_risks: h._pe > 30 ? 'Elevated valuation risk' : h._beta > 1.3 ? 'High beta — volatile' : 'Position sizing discipline needed',
    }));

  const topSells = enrichedHoldings.slice()
    .sort((a, b) => a.ai_conviction_score - b.ai_conviction_score)
    .filter(h => h.recommendation === 'Sell' || h.recommendation === 'Reduce')
    .slice(0, 5)
    .map(h => ({
      ticker: h.ticker,
      current_weight_pct: parseFloat(((h as any)._weight || 0).toFixed(2)),
      suggested_target_weight_pct: h.recommendation === 'Sell' ? 0 : Math.max(0, parseFloat(((h as any)._weight || 0).toFixed(2)) - 2),
      rationale: h.comment,
      key_risks: 'Potential for mean reversion if reducing at lows',
    }));

  // TARGET ALLOCATION
  const targetByRegion = getTargetRegionAllocation(profile, macroRegime);
  const targetBySector = getTargetSectorAllocation(profile, macroRegime);

  // MISSING EXPOSURES
  const missingExposures: string[] = [];
  if (!bySector.find(s => s.sector === 'Energy') || (bySector.find(s => s.sector === 'Energy')?.weight_pct || 0) < 2) {
    missingExposures.push('Very low Energy exposure — consider XOM, CVX for inflation hedging');
  }
  if (!bySector.find(s => s.sector === 'Utilities') || (bySector.find(s => s.sector === 'Utilities')?.weight_pct || 0) < 1) {
    missingExposures.push('No Utilities exposure — add NEE, DUK for defensive ballast');
  }
  if (!bySector.find(s => s.sector === 'Real Estate') || (bySector.find(s => s.sector === 'Real Estate')?.weight_pct || 0) < 1) {
    missingExposures.push('No Real Estate exposure — consider PLD, AMT for inflation protection');
  }
  if (!byRegion.find(r => r.region === 'Europe') || (byRegion.find(r => r.region === 'Europe')?.weight_pct || 0) < 3) {
    missingExposures.push('No meaningful international diversification — concentrated in US equities');
  }

  // SUMMARY
  const summaryComment = buildSummaryComment(totalValue, cashPct, unrealizedPnlPct, diversificationScore, riskFlags.length, macroRegime);

  // Clean holdings for output (remove internal fields)
  const cleanHoldings = enrichedHoldings.map(h => {
    const { _beta, _pe, _epsGrowth, _rsi, _divYield, _weight, ...clean } = h as any;
    return clean;
  });

  return {
    summary: {
      total_value: Math.round(totalValue * 100) / 100,
      cash_value: Math.round(account.cashBalance * 100) / 100,
      cash_percentage: Math.round(cashPct * 100) / 100,
      unrealized_pnl_value: Math.round(unrealizedPnl * 100) / 100,
      unrealized_pnl_percentage: Math.round(unrealizedPnlPct * 100) / 100,
      realized_pnl_value: 0,
      realized_pnl_period: 'YTD',
      diversification_score: diversificationScore,
      comment: summaryComment,
    },
    allocation: {
      by_region: byRegion,
      by_country: byCountry,
      by_sector: bySector,
      by_asset_type: byAssetType,
      by_currency: byCurrency,
    },
    factor_exposures: {
      ...weightedFactors,
      comment: factorComment,
    },
    risk: {
      volatility_annualized: Math.round(avgBeta * 16 * 100) / 100, // rough approx
      max_drawdown_pct: Math.round(Math.min(...enrichedHoldings.map(h => h.unrealized_pnl_pct), 0) * 100) / 100,
      beta_vs_benchmark: Math.round(avgBeta * 100) / 100,
      concentration_top10_pct: Math.round(top10Pct * 100) / 100,
      largest_single_position_pct: Math.round(largestPct * 100) / 100,
      risk_flags: riskFlags,
    },
    holdings: cleanHoldings,
    ideas: {
      top_buys: topBuys,
      top_sells: topSells,
    },
    target_allocation: {
      by_region: targetByRegion,
      by_sector: targetBySector,
    },
    explanations: {
      portfolio_health_summary: [
        summaryComment,
        `Portfolio holds ${enrichedHoldings.length} positions across ${bySector.length} sectors`,
        `Cash position at ${cashPct.toFixed(1)}% provides ${cashPct > 15 ? 'ample' : cashPct > 5 ? 'moderate' : 'limited'} flexibility`,
        `Diversification score: ${diversificationScore}/100`,
      ],
      key_risks_and_concentrations: riskFlags.length > 0 ? riskFlags : ['No significant risk flags detected'],
      missing_exposures: missingExposures,
      notes_for_dashboard: [
        'Conviction scores above 70 indicate high-confidence positions',
        'Factor scores are relative: 100 = strongest, 0 = weakest on that dimension',
        'Target allocations reflect the current macro regime and investor risk profile',
      ],
    },
  };
}

function aggregateBy(holdings: any[], field: string, totalValue: number, cashBalance: number) {
  const map = new Map<string, number>();
  holdings.forEach(h => {
    const key = h[field] || 'Unknown';
    map.set(key, (map.get(key) || 0) + h.market_value);
  });
  const result: { [key: string]: any }[] = [];
  map.forEach((value, key) => {
    const obj: any = {};
    obj[field] = key;
    obj.weight_pct = totalValue > 0 ? Math.round((value / totalValue) * 10000) / 100 : 0;
    result.push(obj);
  });
  if (cashBalance > 0 && totalValue > 0) {
    const obj: any = {};
    obj[field] = 'Cash';
    obj.weight_pct = Math.round((cashBalance / totalValue) * 10000) / 100;
    result.push(obj);
  }
  result.sort((a, b) => b.weight_pct - a.weight_pct);
  return result;
}

function computeDiversificationScore(holdings: any[], totalValue: number, bySector: any[]): number {
  if (holdings.length === 0) return 0;
  let score = 50;
  // More positions = better
  score += Math.min(20, holdings.length * 2);
  // More sectors = better
  score += Math.min(15, (bySector.length - 1) * 2);
  // Penalize concentration
  const maxWeight = totalValue > 0 ? Math.max(...holdings.map((h: any) => (h.market_value / totalValue) * 100)) : 100;
  if (maxWeight > 20) score -= 15;
  else if (maxWeight > 10) score -= 5;
  // Penalize single-sector dominance
  const maxSector = bySector.length > 0 ? Math.max(...bySector.filter(s => s.sector !== 'Cash').map((s: any) => s.weight_pct)) : 0;
  if (maxSector > 40) score -= 15;
  else if (maxSector > 25) score -= 5;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function buildFactorComment(f: any): string {
  const tilts: string[] = [];
  if (f.growth > 60) tilts.push('growth-tilted');
  if (f.value > 60) tilts.push('value-oriented');
  if (f.momentum > 60) tilts.push('strong momentum');
  if (f.quality > 60) tilts.push('quality-focused');
  if (f.dividend_yield > 40) tilts.push('income-generating');
  if (f.risk < 40) tilts.push('higher-risk');
  if (tilts.length === 0) return 'Balanced factor exposure across dimensions.';
  return `Portfolio is ${tilts.join(', ')}. Consider rebalancing if factor concentration increases.`;
}

function buildSummaryComment(total: number, cashPct: number, pnlPct: number, divScore: number, riskCount: number, regime: string): string {
  const health = riskCount === 0 ? 'healthy' : riskCount <= 2 ? 'generally sound with minor flags' : 'requiring attention';
  const pnlDesc = pnlPct > 10 ? 'strong gains' : pnlPct > 0 ? 'positive returns' : 'unrealized losses';
  return `Portfolio of $${(total / 1000).toFixed(0)}K is ${health}, showing ${pnlDesc} (${pnlPct > 0 ? '+' : ''}${pnlPct.toFixed(1)}%). Cash at ${cashPct.toFixed(1)}%. Macro regime: ${regime}. Diversification: ${divScore}/100.`;
}

function getTargetRegionAllocation(profile: InvestorProfile, regime: string) {
  const conservative = regime === 'Contraction' || regime === 'Slowdown';
  return [
    { region: 'North America', target_min_pct: 50, target_max_pct: 70, comment: 'Core allocation — deepest, most liquid markets' },
    { region: 'Europe', target_min_pct: 10, target_max_pct: 20, comment: 'Developed market diversification' },
    { region: 'Asia Pacific', target_min_pct: 5, target_max_pct: 15, comment: 'Growth exposure and diversification' },
    { region: 'Emerging Markets', target_min_pct: conservative ? 0 : 3, target_max_pct: conservative ? 5 : 10, comment: conservative ? 'Reduce EM in defensive regime' : 'Selective EM for growth' },
    { region: 'Cash', target_min_pct: conservative ? 10 : 3, target_max_pct: conservative ? 25 : 15, comment: conservative ? 'Elevated cash in defensive regime' : 'Maintain deployment flexibility' },
  ];
}

function getTargetSectorAllocation(profile: InvestorProfile, regime: string) {
  const isExpansion = regime === 'Expansion';
  const isDefensive = regime === 'Contraction' || regime === 'Slowdown';
  return [
    { sector: 'Technology', target_min_pct: isDefensive ? 15 : 20, target_max_pct: 35, comment: 'Secular growth driver — manage concentration' },
    { sector: 'Healthcare', target_min_pct: 10, target_max_pct: 18, comment: 'Defensive growth with demographic tailwinds' },
    { sector: 'Financial Services', target_min_pct: 8, target_max_pct: 15, comment: isExpansion ? 'Benefits from rate normalization' : 'Selective quality names' },
    { sector: 'Consumer Cyclical', target_min_pct: isDefensive ? 3 : 8, target_max_pct: isDefensive ? 10 : 15, comment: isDefensive ? 'Reduce cyclical exposure in slowdown' : 'Consumer spending resilience' },
    { sector: 'Consumer Defensive', target_min_pct: isDefensive ? 8 : 3, target_max_pct: isDefensive ? 15 : 10, comment: 'Recession-resistant staples' },
    { sector: 'Industrials', target_min_pct: 5, target_max_pct: 12, comment: 'Infrastructure and reshoring beneficiaries' },
    { sector: 'Energy', target_min_pct: 3, target_max_pct: 10, comment: 'Inflation hedge and cash flow generation' },
    { sector: 'Communication Services', target_min_pct: 3, target_max_pct: 10, comment: 'Digital media and telecom dividends' },
    { sector: 'Utilities', target_min_pct: isDefensive ? 5 : 2, target_max_pct: isDefensive ? 10 : 6, comment: 'Defensive yield and AI data center demand' },
    { sector: 'Real Estate', target_min_pct: 2, target_max_pct: 7, comment: 'Real asset diversification' },
    { sector: 'Basic Materials', target_min_pct: 2, target_max_pct: 6, comment: 'Commodity cycle exposure' },
  ];
}
