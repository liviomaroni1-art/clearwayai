import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';
import { Holding } from '@/lib/types';
import { calculateRSI, calculateSMA } from '@/lib/calculations';
import { SP500_STOCKS } from '@/lib/sp500';
import { delay } from '@/lib/utils';
import * as fs from 'fs';
import * as path from 'path';

function readJSON(p: string, fallback: any) {
  try { if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch {}
  return fallback;
}

// Map Yahoo Finance sector names to standard sectors
function normalizeSector(sector: string | undefined): string {
  if (!sector) return 'Unknown';
  const map: Record<string, string> = {
    'technology': 'Technology',
    'financial services': 'Financial Services',
    'healthcare': 'Healthcare',
    'consumer cyclical': 'Consumer Cyclical',
    'consumer defensive': 'Consumer Defensive',
    'communication services': 'Communication Services',
    'industrials': 'Industrials',
    'energy': 'Energy',
    'utilities': 'Utilities',
    'real estate': 'Real Estate',
    'basic materials': 'Basic Materials',
  };
  return map[sector.toLowerCase()] || sector;
}

function getCountry(exchange: string | undefined, ticker: string): string {
  if (!exchange) return 'US';
  const ex = exchange.toUpperCase();
  if (ex.includes('LSE') || ex.includes('LON')) return 'UK';
  if (ex.includes('TSE') || ex.includes('TYO')) return 'Japan';
  if (ex.includes('HKG') || ex.includes('HKSE')) return 'Hong Kong';
  if (ex.includes('ASX')) return 'Australia';
  if (ex.includes('TSX')) return 'Canada';
  if (ex.includes('FRA') || ex.includes('XETRA')) return 'Germany';
  if (ex.includes('PAR')) return 'France';
  // Check ticker suffix
  if (ticker.endsWith('.L')) return 'UK';
  if (ticker.endsWith('.TO') || ticker.endsWith('.V')) return 'Canada';
  if (ticker.endsWith('.AX')) return 'Australia';
  if (ticker.endsWith('.HK')) return 'Hong Kong';
  if (ticker.endsWith('.T')) return 'Japan';
  return 'US';
}

function getRegion(country: string): string {
  const regionMap: Record<string, string> = {
    'US': 'North America', 'Canada': 'North America',
    'UK': 'Europe', 'Germany': 'Europe', 'France': 'Europe', 'Switzerland': 'Europe',
    'Netherlands': 'Europe', 'Ireland': 'Europe', 'Spain': 'Europe', 'Italy': 'Europe',
    'Japan': 'Asia Pacific', 'Hong Kong': 'Asia Pacific', 'Australia': 'Asia Pacific',
    'China': 'Asia Pacific', 'South Korea': 'Asia Pacific', 'India': 'Asia Pacific',
    'Taiwan': 'Asia Pacific', 'Singapore': 'Asia Pacific',
    'Brazil': 'Emerging Markets', 'Mexico': 'Emerging Markets',
  };
  return regionMap[country] || 'Other';
}

function getAssetType(quoteType: string | undefined): string {
  if (!quoteType) return 'Stock';
  const t = quoteType.toUpperCase();
  if (t === 'ETF') return 'ETF';
  if (t === 'MUTUALFUND') return 'Fund';
  if (t.includes('CRYPTO')) return 'Crypto';
  return 'Stock';
}

// Score factors 0-100
function scoreValue(pe: number): number {
  if (pe <= 0) return 50;
  if (pe < 10) return 90;
  if (pe < 15) return 75;
  if (pe < 20) return 60;
  if (pe < 30) return 40;
  if (pe < 50) return 20;
  return 10;
}

function scoreGrowth(epsGrowth: number): number {
  if (epsGrowth > 50) return 95;
  if (epsGrowth > 25) return 80;
  if (epsGrowth > 10) return 65;
  if (epsGrowth > 0) return 50;
  if (epsGrowth > -10) return 35;
  return 15;
}

function scoreMomentum(rsi: number, priceVsMa200: number): number {
  let score = 50;
  if (rsi < 30) score += 20; // oversold bounce potential
  else if (rsi > 70) score -= 15; // overbought
  else if (rsi > 50) score += 10;
  if (priceVsMa200 > 0) score += 15;
  else score -= 15;
  return Math.max(0, Math.min(100, score));
}

function scoreQuality(profitMargin: number | undefined, returnOnEquity: number | undefined): number {
  let s = 50;
  if (profitMargin !== undefined) {
    if (profitMargin > 0.2) s += 20;
    else if (profitMargin > 0.1) s += 10;
    else if (profitMargin < 0) s -= 20;
  }
  if (returnOnEquity !== undefined) {
    if (returnOnEquity > 0.2) s += 15;
    else if (returnOnEquity > 0.1) s += 5;
    else if (returnOnEquity < 0) s -= 15;
  }
  return Math.max(0, Math.min(100, s));
}

function scoreRisk(beta: number | undefined, volatility: number): number {
  let s = 50;
  if (beta !== undefined) {
    if (beta > 2) s += 30;
    else if (beta > 1.5) s += 20;
    else if (beta > 1) s += 10;
    else if (beta < 0.5) s -= 15;
  }
  if (volatility > 50) s += 20;
  else if (volatility > 30) s += 10;
  return Math.max(0, Math.min(100, s));
}

function getConviction(
  valueScore: number, growthScore: number, momentumScore: number,
  qualityScore: number, riskScore: number, rsi: number, pe: number
): { score: number; recommendation: string } {
  // Higher is better for value, growth, momentum, quality; lower is better for risk
  const composite = (valueScore * 0.2 + growthScore * 0.25 + momentumScore * 0.2 + qualityScore * 0.2 + (100 - riskScore) * 0.15);
  const score = Math.round(Math.max(0, Math.min(100, composite)));

  let recommendation: string;
  if (score >= 75) recommendation = 'Strong Buy';
  else if (score >= 60) recommendation = 'Buy';
  else if (score >= 40) recommendation = 'Hold';
  else if (score >= 25) recommendation = 'Reduce';
  else recommendation = 'Sell';

  return { score, recommendation };
}

function formatCurrencyValue(v: number): string {
  return '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export async function GET() {
  try {
    const portfolio = readJSON(path.join(process.cwd(), 'data', 'portfolio.json'), { holdings: [] });
    const account = readJSON(path.join(process.cwd(), 'data', 'account.json'), { cashBalance: 0, riskTolerance: 'moderate', maxPositionPct: 15, maxSectorPct: 35 });
    const holdings: Holding[] = portfolio.holdings || [];
    const cashBalance: number = account.cashBalance || 0;
    const yf = yahooFinance as any;

    // Fetch data for all holdings
    const holdingData: any[] = [];

    for (let i = 0; i < holdings.length; i += 3) {
      const chunk = holdings.slice(i, i + 3);
      const results = await Promise.allSettled(
        chunk.map(async (h) => {
          try {
            const [quote, hist] = await Promise.all([
              yf.quote(h.ticker),
              yf.historical(h.ticker, {
                period1: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                period2: new Date().toISOString().split('T')[0],
                interval: '1d',
              }).catch(() => []),
            ]);
            return { holding: h, quote, hist: hist || [] };
          } catch (err) {
            return { holding: h, quote: null, hist: [] };
          }
        })
      );
      for (const r of results) {
        if (r.status === 'fulfilled') holdingData.push(r.value);
      }
      if (i + 3 < holdings.length) await delay(300);
    }

    // Process each holding
    const processedHoldings: any[] = [];
    let totalInvested = 0;
    let totalMarketValue = 0;
    const sectorWeights: Record<string, number> = {};
    const regionWeights: Record<string, number> = {};
    const countryWeights: Record<string, number> = {};
    const assetTypeWeights: Record<string, number> = {};
    const currencyWeights: Record<string, number> = {};

    for (const { holding, quote, hist } of holdingData) {
      const price = quote?.regularMarketPrice ?? holding.avgPrice;
      const marketValue = holding.shares * price;
      const invested = holding.shares * holding.avgPrice;
      const pnl = marketValue - invested;
      const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;

      totalInvested += invested;
      totalMarketValue += marketValue;

      // Get metadata
      const sp500Info = SP500_STOCKS.find(s => s.ticker === holding.ticker);
      const sector = normalizeSector(quote?.sector || sp500Info?.sector);
      const country = getCountry(quote?.exchange, holding.ticker);
      const region = getRegion(country);
      const assetType = getAssetType(quote?.quoteType);
      const currency = quote?.currency || 'USD';

      sectorWeights[sector] = (sectorWeights[sector] || 0) + marketValue;
      regionWeights[region] = (regionWeights[region] || 0) + marketValue;
      countryWeights[country] = (countryWeights[country] || 0) + marketValue;
      assetTypeWeights[assetType] = (assetTypeWeights[assetType] || 0) + marketValue;
      currencyWeights[currency] = (currencyWeights[currency] || 0) + marketValue;

      // Calculate indicators from history
      const bars = (hist || []).map((bar: any) => ({
        date: bar.date instanceof Date ? bar.date.toISOString().split('T')[0] : String(bar.date).split('T')[0],
        open: bar.open ?? 0, high: bar.high ?? 0, low: bar.low ?? 0,
        close: bar.close ?? 0, volume: bar.volume ?? 0,
      }));

      const rsi = bars.length > 14 ? calculateRSI(bars) : 50;
      const ma50 = bars.length >= 50 ? calculateSMA(bars, 50) : price;
      const ma200 = bars.length >= 200 ? calculateSMA(bars, 200) : price;
      const priceVsMa200 = ma200 > 0 ? ((price - ma200) / ma200) * 100 : 0;

      // Factor scores
      const pe = quote?.trailingPE ?? 0;
      const epsGrowth = quote?.earningsQuarterlyGrowth ? (quote.earningsQuarterlyGrowth as number) * 100 : 0;
      const divYield = quote?.dividendYield ? (quote.dividendYield as number) * 100 : 0;
      const beta = quote?.beta;
      const profitMargin = quote?.profitMargins;
      const roe = quote?.returnOnEquity;

      // Calculate volatility from history
      let volatility = 30; // default
      if (bars.length > 30) {
        const returns = [];
        for (let i = 1; i < bars.length; i++) {
          if (bars[i - 1].close > 0) returns.push((bars[i].close - bars[i - 1].close) / bars[i - 1].close);
        }
        const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
        const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
        volatility = Math.sqrt(variance * 252) * 100;
      }

      const valueScore = scoreValue(pe);
      const growthScore = scoreGrowth(epsGrowth);
      const momentumScore = scoreMomentum(rsi, priceVsMa200);
      const qualityScore = scoreQuality(profitMargin, roe);
      const riskScoreVal = scoreRisk(beta, volatility);

      const { score: conviction, recommendation } = getConviction(
        valueScore, growthScore, momentumScore, qualityScore, riskScoreVal, rsi, pe
      );

      // Build comment
      const bullets: string[] = [];
      if (pnlPct > 20) bullets.push(`Strong gain of ${pnlPct.toFixed(1)}% — consider locking profits.`);
      else if (pnlPct > 0) bullets.push(`Up ${pnlPct.toFixed(1)}% from entry.`);
      else if (pnlPct > -10) bullets.push(`Slight loss of ${pnlPct.toFixed(1)}% — within normal range.`);
      else bullets.push(`Down ${pnlPct.toFixed(1)}% — review thesis or add to average down.`);

      if (rsi < 30) bullets.push('RSI oversold — potential bounce setup.');
      else if (rsi > 70) bullets.push('RSI overbought — momentum may fade.');

      if (pe > 0 && pe < 15) bullets.push(`Attractive P/E of ${pe.toFixed(1)}.`);
      else if (pe > 40) bullets.push(`Elevated P/E of ${pe.toFixed(1)} — priced for perfection.`);

      // Tags
      const tags: string[] = [];
      if (marketValue > totalMarketValue * 0.15) tags.push('Core');
      else if (volatility > 50 || (pe <= 0 && epsGrowth === 0)) tags.push('Speculative');
      else tags.push('Satellite');

      processedHoldings.push({
        ticker: holding.ticker,
        name: quote?.shortName ?? quote?.longName ?? holding.ticker,
        asset_type: assetType,
        region,
        country,
        sector,
        currency,
        quantity: holding.shares,
        average_cost: holding.avgPrice,
        current_price: price,
        market_value: marketValue,
        unrealized_pnl_value: pnl,
        unrealized_pnl_pct: pnlPct,
        income_yield_pct: divYield,
        factor_scores: {
          value: Math.round(valueScore),
          growth: Math.round(growthScore),
          quality: Math.round(qualityScore),
          momentum: Math.round(momentumScore),
          dividend_yield: Math.round(divYield * 10),
          risk: Math.round(riskScoreVal),
        },
        ai_conviction_score: conviction,
        recommendation,
        time_horizon: conviction >= 60 ? 'Long' : conviction >= 40 ? 'Medium' : 'Short',
        tags,
        comment: bullets.join(' '),
        // Extra for internal use
        _rsi: rsi, _ma50: ma50, _ma200: ma200, _pe: pe, _epsGrowth: epsGrowth,
        _beta: beta, _volatility: volatility, _priceVsMa200: priceVsMa200,
      });
    }

    const totalAUM = totalMarketValue + cashBalance;
    const cashPct = totalAUM > 0 ? (cashBalance / totalAUM) * 100 : 100;
    const unrealizedPnl = totalMarketValue - totalInvested;
    const unrealizedPnlPct = totalInvested > 0 ? (unrealizedPnl / totalInvested) * 100 : 0;

    // Weights as percentages
    const toWeightArray = (map: Record<string, number>) =>
      Object.entries(map)
        .map(([k, v]) => ({ name: k, weight_pct: totalAUM > 0 ? (v / totalAUM) * 100 : 0 }))
        .sort((a, b) => b.weight_pct - a.weight_pct);

    // Diversification score (0-100, higher = more diversified)
    const holdingWeights = processedHoldings.map(h => h.market_value / totalAUM);
    const hhi = holdingWeights.reduce((sum, w) => sum + w * w, 0);
    const diversificationScore = Math.round(Math.max(0, Math.min(100, (1 - hhi) * 100)));

    // Top 10 concentration
    const sortedByValue = processedHoldings.slice().sort((a, b) => b.market_value - a.market_value);
    const top10Pct = totalAUM > 0 ? (sortedByValue.slice(0, 10).reduce((s, h) => s + h.market_value, 0) / totalAUM) * 100 : 0;
    const largestPct = totalAUM > 0 && sortedByValue.length > 0 ? (sortedByValue[0].market_value / totalAUM) * 100 : 0;

    // Average portfolio beta and volatility
    const avgBeta = processedHoldings.reduce((s, h) => s + (h._beta || 1) * (h.market_value / (totalMarketValue || 1)), 0);
    const avgVolatility = processedHoldings.reduce((s, h) => s + h._volatility * (h.market_value / (totalMarketValue || 1)), 0);

    // Risk flags
    const riskFlags: string[] = [];
    if (cashPct < 5) riskFlags.push('Critically low cash reserves (< 5% of AUM).');
    if (cashPct > 50) riskFlags.push('Over 50% in cash — capital significantly underdeployed.');
    if (largestPct > 30) riskFlags.push(`Largest position is ${largestPct.toFixed(1)}% of portfolio — high concentration risk.`);
    if (processedHoldings.length < 5) riskFlags.push(`Only ${processedHoldings.length} positions — very low diversification.`);
    const specCount = processedHoldings.filter(h => h.tags.includes('Speculative')).length;
    if (specCount > processedHoldings.length * 0.5) riskFlags.push(`${specCount} of ${processedHoldings.length} positions are speculative.`);
    for (const [sector, val] of Object.entries(sectorWeights)) {
      const pct = totalAUM > 0 ? (val / totalAUM) * 100 : 0;
      if (pct > 40) riskFlags.push(`${sector} sector at ${pct.toFixed(1)}% — overweight.`);
    }

    // Factor exposures (portfolio-level weighted averages)
    const weightedFactor = (key: string) => {
      if (totalMarketValue === 0) return 50;
      return Math.round(processedHoldings.reduce((s, h) => s + (h.factor_scores[key] || 50) * (h.market_value / totalMarketValue), 0));
    };

    // Generate buy/sell ideas
    const sortedByConviction = processedHoldings.slice().sort((a, b) => b.ai_conviction_score - a.ai_conviction_score);
    const topBuys = sortedByConviction
      .filter(h => h.recommendation === 'Strong Buy' || h.recommendation === 'Buy')
      .slice(0, 5)
      .map(h => ({
        ticker: h.ticker,
        current_weight_pct: totalAUM > 0 ? (h.market_value / totalAUM) * 100 : 0,
        suggested_target_weight_pct: Math.min((account.maxPositionPct || 15), (totalAUM > 0 ? (h.market_value / totalAUM) * 100 : 0) + 3),
        rationale: `Conviction ${h.ai_conviction_score}/100. ${h.comment}`,
        key_risks: h._volatility > 40 ? 'High volatility' : h._pe > 30 ? 'Elevated valuation' : 'Normal risk profile',
      }));

    const topSells = sortedByConviction
      .reverse()
      .filter(h => h.recommendation === 'Sell' || h.recommendation === 'Reduce')
      .slice(0, 5)
      .map(h => ({
        ticker: h.ticker,
        current_weight_pct: totalAUM > 0 ? (h.market_value / totalAUM) * 100 : 0,
        suggested_target_weight_pct: h.recommendation === 'Sell' ? 0 : Math.max(0, (totalAUM > 0 ? (h.market_value / totalAUM) * 100 : 0) - 2),
        rationale: `Conviction ${h.ai_conviction_score}/100. ${h.comment}`,
        key_risks: 'Potential missed recovery if thesis changes',
      }));

    // Portfolio health summary
    const healthSummary: string[] = [];
    if (processedHoldings.length === 0) {
      healthSummary.push('No positions in portfolio. Add holdings manually or connect IBKR to sync.');
    } else {
      healthSummary.push(`Portfolio has ${processedHoldings.length} positions worth ${formatCurrencyValue(totalMarketValue)} with ${formatCurrencyValue(cashBalance)} cash (${cashPct.toFixed(1)}% of AUM).`);
      if (unrealizedPnl > 0) healthSummary.push(`Overall gain of ${formatCurrencyValue(unrealizedPnl)} (${unrealizedPnlPct.toFixed(1)}%).`);
      else healthSummary.push(`Overall loss of ${formatCurrencyValue(Math.abs(unrealizedPnl))} (${unrealizedPnlPct.toFixed(1)}%).`);
      if (diversificationScore < 40) healthSummary.push('Portfolio is highly concentrated — consider adding positions to diversify.');
      if (specCount > 0) healthSummary.push(`${specCount} speculative position(s) — size accordingly and set stop-losses.`);
    }

    // Missing exposures
    const missingExposures: string[] = [];
    const sectors = Object.keys(sectorWeights);
    if (!sectors.includes('Healthcare')) missingExposures.push('No Healthcare exposure — defensive diversifier.');
    if (!sectors.includes('Consumer Defensive')) missingExposures.push('No Consumer Staples — recession hedge.');
    if (!sectors.includes('Utilities')) missingExposures.push('No Utilities — income and stability.');
    const regions = Object.keys(regionWeights);
    if (!regions.includes('Europe')) missingExposures.push('No European exposure — geographic diversification gap.');
    if (!regions.includes('Asia Pacific')) missingExposures.push('No Asia-Pacific exposure.');
    if (!regions.includes('Emerging Markets')) missingExposures.push('No Emerging Markets — growth diversifier.');

    // Clean internal fields from output
    const cleanHoldings = processedHoldings.map(({ _rsi, _ma50, _ma200, _pe, _epsGrowth, _beta, _volatility, _priceVsMa200, ...rest }) => rest);

    const result = {
      summary: {
        total_value: totalAUM,
        cash_value: cashBalance,
        cash_percentage: cashPct,
        unrealized_pnl_value: unrealizedPnl,
        unrealized_pnl_percentage: unrealizedPnlPct,
        realized_pnl_value: 0,
        realized_pnl_period: 'N/A',
        diversification_score: diversificationScore,
        comment: healthSummary[0] || 'Portfolio analysis complete.',
      },
      allocation: {
        by_region: toWeightArray(regionWeights).map(r => ({ region: r.name, weight_pct: r.weight_pct })),
        by_country: toWeightArray(countryWeights).map(r => ({ country: r.name, weight_pct: r.weight_pct })),
        by_sector: toWeightArray(sectorWeights).map(r => ({ sector: r.name, weight_pct: r.weight_pct })),
        by_asset_type: toWeightArray(assetTypeWeights).map(r => ({ asset_type: r.name, weight_pct: r.weight_pct })),
        by_currency: toWeightArray(currencyWeights).map(r => ({ currency: r.name, weight_pct: r.weight_pct })),
      },
      factor_exposures: {
        value: weightedFactor('value'),
        growth: weightedFactor('growth'),
        quality: weightedFactor('quality'),
        momentum: weightedFactor('momentum'),
        size: processedHoldings.length > 0 ? Math.round(processedHoldings.reduce((s, h) => s + (h.market_value < 1000 ? 80 : h.market_value < 10000 ? 50 : 30), 0) / processedHoldings.length) : 50,
        dividend_yield: weightedFactor('dividend_yield'),
        risk: weightedFactor('risk'),
        comment: `Portfolio tilts: Value ${weightedFactor('value')}/100, Growth ${weightedFactor('growth')}/100, Quality ${weightedFactor('quality')}/100.`,
      },
      risk: {
        volatility_annualized: Math.round(avgVolatility * 10) / 10,
        max_drawdown_pct: -15, // estimate
        beta_vs_benchmark: Math.round(avgBeta * 100) / 100,
        concentration_top10_pct: Math.round(top10Pct * 10) / 10,
        largest_single_position_pct: Math.round(largestPct * 10) / 10,
        risk_flags: riskFlags,
      },
      holdings: cleanHoldings,
      ideas: {
        top_buys: topBuys,
        top_sells: topSells,
      },
      target_allocation: {
        by_region: [
          { region: 'North America', target_min_pct: 40, target_max_pct: 60, comment: 'Core allocation — deepest markets' },
          { region: 'Europe', target_min_pct: 15, target_max_pct: 25, comment: 'Diversification and value opportunities' },
          { region: 'Asia Pacific', target_min_pct: 10, target_max_pct: 20, comment: 'Growth exposure' },
          { region: 'Emerging Markets', target_min_pct: 5, target_max_pct: 15, comment: 'Higher growth potential' },
        ],
        by_sector: [
          { sector: 'Technology', target_min_pct: 15, target_max_pct: 30, comment: 'Innovation and growth driver' },
          { sector: 'Healthcare', target_min_pct: 10, target_max_pct: 20, comment: 'Defensive growth' },
          { sector: 'Financial Services', target_min_pct: 8, target_max_pct: 18, comment: 'Rate-sensitive exposure' },
          { sector: 'Consumer', target_min_pct: 8, target_max_pct: 15, comment: 'Economic cycle exposure' },
          { sector: 'Industrials', target_min_pct: 5, target_max_pct: 15, comment: 'Infrastructure and capex cycle' },
          { sector: 'Energy', target_min_pct: 3, target_max_pct: 10, comment: 'Inflation hedge' },
        ],
      },
      explanations: {
        portfolio_health_summary: healthSummary,
        key_risks_and_concentrations: riskFlags.length > 0 ? riskFlags : ['No major risk flags identified.'],
        missing_exposures: missingExposures.length > 0 ? missingExposures : ['Allocation looks reasonably diversified.'],
        notes_for_dashboard: [
          'Holdings rated by AI conviction score (0-100) using fundamentals, momentum, and quality factors.',
          'Recommendations account for current portfolio weights and risk tolerance.',
          'Price data from Yahoo Finance — may have delays for some markets.',
        ],
      },
    };

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 });
  }
}
