import { Holding, Account, AllocationRecommendation, DailyBriefing } from './types';
import { InvestmentTip } from './tips-engine';

interface PortfolioPosition {
  ticker: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  pl: number;
  plPct: number;
  sector: string;
  weight: number;
}

export function generateAllocations(
  tips: InvestmentTip[],
  positions: PortfolioPosition[],
  account: Account,
  totalPortfolioValue: number
): AllocationRecommendation[] {
  const recommendations: AllocationRecommendation[] = [];
  const cashAvailable = account.cashBalance;
  const maxPositionValue = totalPortfolioValue * (account.maxPositionPct / 100);

  // Risk multiplier based on tolerance
  const riskMultiplier = account.riskTolerance === 'aggressive' ? 1.5
    : account.riskTolerance === 'conservative' ? 0.6
    : 1.0;

  // 1. Check existing positions for TRIM/SELL/HOLD/ADD signals
  for (const pos of positions) {
    const tip = tips.find(t => t.ticker === pos.ticker);
    if (!tip) continue;

    if (tip.signal === 'STRONG_SELL' || tip.signal === 'SELL') {
      const sellShares = tip.signal === 'STRONG_SELL' ? pos.shares : Math.ceil(pos.shares * 0.5);
      recommendations.push({
        ticker: pos.ticker,
        name: pos.name,
        signal: tip.signal,
        confidence: tip.confidence,
        currentShares: pos.shares,
        currentValue: pos.value,
        recommendedAction: tip.signal === 'STRONG_SELL' ? 'SELL' : 'TRIM',
        recommendedShares: -sellShares,
        recommendedDollarAmount: -(sellShares * pos.currentPrice),
        positionPctOfPortfolio: pos.weight,
        reasoning: `${tip.signal === 'STRONG_SELL' ? 'EXIT POSITION' : 'REDUCE EXPOSURE'} — ${tip.summary}`,
        priority: tip.signal === 'STRONG_SELL' ? 10 : 8,
        riskLevel: tip.riskLevel,
        sector: pos.sector,
        price: pos.currentPrice,
        targets: tip.targets,
      });
    } else if (tip.signal === 'HOLD') {
      recommendations.push({
        ticker: pos.ticker,
        name: pos.name,
        signal: tip.signal,
        confidence: tip.confidence,
        currentShares: pos.shares,
        currentValue: pos.value,
        recommendedAction: 'HOLD',
        recommendedShares: 0,
        recommendedDollarAmount: 0,
        positionPctOfPortfolio: pos.weight,
        reasoning: `HOLD — ${tip.summary}`,
        priority: 3,
        riskLevel: tip.riskLevel,
        sector: pos.sector,
        price: pos.currentPrice,
        targets: tip.targets,
      });
    } else if ((tip.signal === 'BUY' || tip.signal === 'STRONG_BUY') && pos.weight < account.maxPositionPct) {
      const roomToAdd = maxPositionValue - pos.value;
      if (roomToAdd > pos.currentPrice && cashAvailable > pos.currentPrice) {
        const addAmount = Math.min(roomToAdd * 0.5 * riskMultiplier, cashAvailable * 0.15);
        const addShares = Math.floor(addAmount / pos.currentPrice);
        if (addShares > 0) {
          recommendations.push({
            ticker: pos.ticker,
            name: pos.name,
            signal: tip.signal,
            confidence: tip.confidence,
            currentShares: pos.shares,
            currentValue: pos.value,
            recommendedAction: 'ADD',
            recommendedShares: addShares,
            recommendedDollarAmount: addShares * pos.currentPrice,
            positionPctOfPortfolio: pos.weight,
            reasoning: `ADD TO POSITION — ${tip.summary}`,
            priority: tip.signal === 'STRONG_BUY' ? 7 : 5,
            riskLevel: tip.riskLevel,
            sector: pos.sector,
            price: pos.currentPrice,
            targets: tip.targets,
          });
        }
      }
    }
  }

  // 2. Find new opportunities from tips not in portfolio
  const existingTickers = new Set(positions.map(p => p.ticker));
  const newOpportunities = tips
    .filter(t => !existingTickers.has(t.ticker) && (t.signal === 'STRONG_BUY' || t.signal === 'BUY'))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5);

  let remainingCash = cashAvailable;
  for (const tip of newOpportunities) {
    if (remainingCash < tip.price * 2) break;

    // Position size based on confidence and risk tolerance
    const baseAllocation = totalPortfolioValue * 0.03; // Start with 3% of portfolio
    const confidenceMultiplier = tip.confidence / 100;
    const allocation = Math.min(
      baseAllocation * confidenceMultiplier * riskMultiplier,
      remainingCash * 0.2, // Max 20% of remaining cash per new position
      maxPositionValue
    );

    const shares = Math.floor(allocation / tip.price);
    if (shares < 1) continue;

    const dollarAmount = shares * tip.price;
    remainingCash -= dollarAmount;

    recommendations.push({
      ticker: tip.ticker,
      name: tip.name,
      signal: tip.signal,
      confidence: tip.confidence,
      currentShares: 0,
      currentValue: 0,
      recommendedAction: 'NEW_POSITION',
      recommendedShares: shares,
      recommendedDollarAmount: dollarAmount,
      positionPctOfPortfolio: (dollarAmount / totalPortfolioValue) * 100,
      reasoning: `NEW POSITION — ${tip.summary}`,
      priority: tip.signal === 'STRONG_BUY' ? 9 : 6,
      riskLevel: tip.riskLevel,
      sector: tip.sector,
      price: tip.price,
      targets: tip.targets,
    });
  }

  // Sort by priority descending
  recommendations.sort((a, b) => b.priority - a.priority);
  return recommendations;
}

export function generateDailyBriefing(
  positions: PortfolioPosition[],
  account: Account,
  recommendations: AllocationRecommendation[],
  macroRegime: string
): DailyBriefing {
  const totalInvested = positions.reduce((sum, p) => sum + (p.shares * p.avgPrice), 0);
  const investedValue = positions.reduce((sum, p) => sum + p.value, 0);
  const totalAUM = investedValue + account.cashBalance;
  const totalPL = investedValue - totalInvested;
  const todayPL = positions.reduce((sum, p) => sum + (p.currentPrice - p.avgPrice) * p.shares * 0.01, 0); // approximate
  const cashPct = totalAUM > 0 ? (account.cashBalance / totalAUM) * 100 : 100;

  // Sector allocation
  const sectorMap = new Map<string, number>();
  for (const p of positions) {
    sectorMap.set(p.sector, (sectorMap.get(p.sector) || 0) + p.value);
  }
  const sectorAllocation = Array.from(sectorMap.entries())
    .map(([sector, value]) => ({ sector, value, pct: totalAUM > 0 ? (value / totalAUM) * 100 : 0 }))
    .sort((a, b) => b.value - a.value);

  // Top/bottom performers
  const sorted = positions.slice().sort((a, b) => b.plPct - a.plPct);
  const topPerformers = sorted.slice(0, 3).map(p => ({ ticker: p.ticker, plPct: p.plPct }));
  const bottomPerformers = sorted.slice(-3).reverse().map(p => ({ ticker: p.ticker, plPct: p.plPct }));

  // Risk alerts
  const riskAlerts: string[] = [];
  if (cashPct < 5) riskAlerts.push('Cash reserves critically low — below 5% of AUM. Consider taking profits.');
  if (cashPct > 50) riskAlerts.push('High cash position (>50%). Capital underdeployed — consider new positions.');

  sectorMap.forEach((value, sector) => {
    const pct = totalAUM > 0 ? (value / totalAUM) * 100 : 0;
    if (pct > account.maxSectorPct) {
      riskAlerts.push(`${sector} allocation at ${pct.toFixed(1)}% exceeds ${account.maxSectorPct}% sector limit.`);
    }
  });

  for (const p of positions) {
    if (p.weight > account.maxPositionPct) {
      riskAlerts.push(`${p.ticker} position at ${p.weight.toFixed(1)}% exceeds ${account.maxPositionPct}% position limit.`);
    }
    if (p.plPct < -15) {
      riskAlerts.push(`${p.ticker} down ${p.plPct.toFixed(1)}% — consider stop-loss review.`);
    }
  }

  const sellActions = recommendations.filter(r => r.recommendedAction === 'SELL' || r.recommendedAction === 'TRIM');
  const buyActions = recommendations.filter(r => r.recommendedAction === 'BUY' || r.recommendedAction === 'ADD' || r.recommendedAction === 'NEW_POSITION');

  // Generate greeting
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  let greeting = `${timeGreeting}. `;
  if (totalPL > 0) {
    greeting += `Your portfolio is up ${((totalPL / totalInvested) * 100).toFixed(1)}% overall. `;
  } else {
    greeting += `Your portfolio is down ${((totalPL / totalInvested) * 100).toFixed(1)}% overall. `;
  }

  if (sellActions.length > 0) {
    greeting += `I have ${sellActions.length} position${sellActions.length > 1 ? 's' : ''} to review for potential exits. `;
  }
  if (buyActions.length > 0) {
    greeting += `${buyActions.length} buying opportunit${buyActions.length > 1 ? 'ies' : 'y'} identified.`;
  }

  // Market sentiment
  let marketSentiment = '';
  switch (macroRegime) {
    case 'Expansion':
      marketSentiment = 'Macro environment is expansionary — favor growth and cyclical sectors. Stay aggressive with quality names.';
      break;
    case 'Late Cycle':
      marketSentiment = 'Late cycle conditions — selectivity is key. Focus on quality earnings and reasonable valuations. Begin building defensive positions.';
      break;
    case 'Slowdown':
      marketSentiment = 'Economic slowdown signals — shift toward defensive sectors. Reduce cyclical exposure and maintain higher cash reserves.';
      break;
    case 'Contraction':
      marketSentiment = 'Contraction phase — capital preservation is priority. Favor utilities, healthcare, and consumer staples. Keep elevated cash position.';
      break;
    default:
      marketSentiment = 'Market conditions are mixed. Maintain balanced allocation across sectors.';
  }

  // Portfolio health
  let portfolioHealth = '';
  if (riskAlerts.length === 0 && totalPL > 0) {
    portfolioHealth = 'Portfolio is healthy and well-balanced. All positions within risk parameters.';
  } else if (riskAlerts.length <= 2) {
    portfolioHealth = 'Portfolio is generally healthy with minor adjustments needed. Review action items below.';
  } else {
    portfolioHealth = 'Portfolio requires attention — multiple risk alerts triggered. Prioritize rebalancing.';
  }

  return {
    date: new Date().toISOString().split('T')[0],
    greeting,
    marketSentiment,
    portfolioHealth,
    totalAUM,
    cashAvailable: account.cashBalance,
    investedValue,
    todayPL,
    totalPL,
    cashPct,
    actionItems: recommendations,
    sectorAllocation,
    topPerformers,
    bottomPerformers,
    riskAlerts,
  };
}
