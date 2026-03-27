import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';
import { Holding, Account } from '@/lib/types';
import { SP500_STOCKS } from '@/lib/sp500';
import { calculateRSI, calculateSMA } from '@/lib/calculations';
import { generateFullAnalysis } from '@/lib/portfolio-analyst';
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

    const holdings: Holding[] = portfolio.holdings || [];
    const tickers = holdings.map((h: Holding) => h.ticker);

    const yf = yahooFinance as any;
    const liveData: Record<string, any> = {};

    // Fetch data in chunks of 5
    for (let i = 0; i < tickers.length; i += 5) {
      const chunk = tickers.slice(i, i + 5);
      const results = await Promise.allSettled(
        chunk.map(async (ticker: string) => {
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
          const rsi = calculateRSI(bars);
          const ma50 = calculateSMA(bars, 50);
          const ma200 = calculateSMA(bars, 200);

          liveData[ticker] = {
            ticker,
            price,
            change: quote.regularMarketChange ?? 0,
            changePercent: quote.regularMarketChangePercent ?? 0,
            pe: quote.trailingPE ?? 0,
            eps: quote.epsTrailingTwelveMonths ?? 0,
            marketCap: quote.marketCap ?? 0,
            volume: quote.regularMarketVolume ?? 0,
            dividendYield: (quote.dividendYield ?? 0) * 100,
            beta: quote.beta ?? 1,
            fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh ?? price,
            fiftyTwoWeekLow: quote.fiftyTwoWeekLow ?? price,
            rsi,
            ma50,
            ma200,
            epsGrowth: quote.earningsQuarterlyGrowth ? (quote.earningsQuarterlyGrowth as number) * 100 : 0,
            name: quote.shortName ?? quote.longName ?? ticker,
          };
        })
      );
      if (i + 5 < tickers.length) await delay(300);
    }

    const analysis = generateFullAnalysis(holdings, account, liveData, regime);
    return NextResponse.json(analysis);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 });
  }
}
