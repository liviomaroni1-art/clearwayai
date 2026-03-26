import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';
import { Account, Holding } from '@/lib/types';
import { generateTip, InvestmentTip } from '@/lib/tips-engine';
import { generateAllocations, generateDailyBriefing } from '@/lib/fund-manager';
import { calculateRSI, calculateSMA, calculateConfluenceScore, getRegimeFavoredSectors } from '@/lib/calculations';
import { SP500_STOCKS } from '@/lib/sp500';
import { delay } from '@/lib/utils';
import * as fs from 'fs';
import * as path from 'path';

function readJSON(filePath: string, fallback: any) {
  try {
    if (fs.existsSync(filePath)) return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {}
  return fallback;
}

export async function GET() {
  try {
    const portfolio = readJSON(path.join(process.cwd(), 'data', 'portfolio.json'), { holdings: [] });
    const account: Account = readJSON(path.join(process.cwd(), 'data', 'account.json'), {
      cashBalance: 50000, transactions: [], riskTolerance: 'moderate',
      monthlyTarget: 3, maxPositionPct: 10, maxSectorPct: 30,
    });
    const macroCache = readJSON(path.join(process.cwd(), 'data', 'macro-cache.json'), { regime: 'Late Cycle' });
    const regime = macroCache.regime || 'Late Cycle';
    const favoredSectors = getRegimeFavoredSectors(regime);

    // Get all tickers we need: portfolio + top picks
    const holdingTickers = (portfolio.holdings || []).map((h: Holding) => h.ticker);
    const samplePicks = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'META', 'TSLA', 'JPM', 'V', 'UNH',
      'HD', 'PG', 'MA', 'BAC', 'PFE', 'NFLX', 'DIS', 'COST', 'XOM', 'JNJ'];
    const allTickers = Array.from(new Set([...holdingTickers, ...samplePicks]));

    const yf = yahooFinance as any;
    const tips: InvestmentTip[] = [];
    const priceMap: Record<string, { price: number; change: number; sector: string; name: string }> = {};

    // Fetch data in chunks
    for (let i = 0; i < allTickers.length; i += 5) {
      const chunk = allTickers.slice(i, i + 5);
      const results = await Promise.allSettled(
        chunk.map(async (ticker) => {
          const stock = SP500_STOCKS.find(s => s.ticker === ticker);
          const sector = stock?.sector || 'Unknown';
          const [quote, histData] = await Promise.all([
            yf.quote(ticker),
            yf.historical(ticker, {
              period1: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              period2: new Date().toISOString().split('T')[0],
              interval: '1d',
            }),
          ]);

          const bars = (histData || []).map((bar: any) => ({
            date: bar.date instanceof Date ? bar.date.toISOString().split('T')[0] : String(bar.date).split('T')[0],
            open: bar.open ?? 0, high: bar.high ?? 0, low: bar.low ?? 0,
            close: bar.close ?? 0, volume: bar.volume ?? 0,
          }));

          const price = quote.regularMarketPrice ?? 0;
          const pe = quote.trailingPE ?? 0;
          const rsi = calculateRSI(bars);
          const ma50 = calculateSMA(bars, 50);
          const ma200 = calculateSMA(bars, 200);
          const epsGrowth = quote.earningsQuarterlyGrowth ? (quote.earningsQuarterlyGrowth as number) * 100 : 0;
          const { score, reasons } = calculateConfluenceScore(rsi, price, ma50, ma200, epsGrowth, pe, 20, favoredSectors.includes(sector));

          priceMap[ticker] = {
            price,
            change: quote.regularMarketChange ?? 0,
            sector,
            name: quote.shortName ?? stock?.name ?? ticker,
          };

          return generateTip({
            ticker, name: quote.shortName ?? stock?.name ?? ticker,
            price, change: quote.regularMarketChange ?? 0,
            changePercent: quote.regularMarketChangePercent ?? 0,
            rsi, ma50, ma200, pe, epsGrowth,
            marketCap: quote.marketCap ?? 0, sector,
            confluenceScore: score, confluenceReasons: reasons,
          });
        })
      );

      for (const r of results) {
        if (r.status === 'fulfilled' && r.value) tips.push(r.value);
      }
      if (i + 5 < allTickers.length) await delay(300);
    }

    // Build positions
    const positions = (portfolio.holdings || []).map((h: Holding) => {
      const data = priceMap[h.ticker] || { price: h.avgPrice, change: 0, sector: 'Unknown', name: h.ticker };
      const value = h.shares * data.price;
      const invested = h.shares * h.avgPrice;
      return {
        ticker: h.ticker,
        name: data.name,
        shares: h.shares,
        avgPrice: h.avgPrice,
        currentPrice: data.price,
        value,
        pl: value - invested,
        plPct: invested > 0 ? ((value - invested) / invested) * 100 : 0,
        sector: data.sector,
        weight: 0, // will calculate after
      };
    });

    const investedValue = positions.reduce((s: number, p: any) => s + p.value, 0);
    const totalAUM = investedValue + account.cashBalance;
    positions.forEach((p: any) => { p.weight = totalAUM > 0 ? (p.value / totalAUM) * 100 : 0; });

    const allocations = generateAllocations(tips, positions, account, totalAUM);
    const briefing = generateDailyBriefing(positions, account, allocations, regime);

    return NextResponse.json(briefing);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to generate briefing' }, { status: 500 });
  }
}
