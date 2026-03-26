import { NextRequest, NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';
import { SP500_STOCKS } from '@/lib/sp500';
import { calculateRSI, calculateSMA, calculateConfluenceScore, getRegimeFavoredSectors } from '@/lib/calculations';
import { ScreenerStock } from '@/lib/types';
import { generateTip, InvestmentTip } from '@/lib/tips-engine';
import { delay } from '@/lib/utils';
import * as fs from 'fs';
import * as path from 'path';

function getMacroRegime(): string {
  try {
    const cachePath = path.join(process.cwd(), 'data', 'macro-cache.json');
    if (fs.existsSync(cachePath)) {
      const data = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
      return data.regime || 'Expansion';
    }
  } catch {}
  return 'Expansion';
}

async function fetchStockData(ticker: string, sector: string): Promise<ScreenerStock | null> {
  try {
    const yf = yahooFinance as any;
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
      open: bar.open ?? 0,
      high: bar.high ?? 0,
      low: bar.low ?? 0,
      close: bar.close ?? 0,
      volume: bar.volume ?? 0,
    }));

    const price = quote.regularMarketPrice ?? 0;
    const pe = quote.trailingPE ?? 0;
    const rsi = calculateRSI(bars);
    const ma50 = calculateSMA(bars, 50);
    const ma200 = calculateSMA(bars, 200);
    const epsGrowth = quote.earningsQuarterlyGrowth ? (quote.earningsQuarterlyGrowth as number) * 100 : 0;

    const regime = getMacroRegime() as any;
    const favoredSectors = getRegimeFavoredSectors(regime);
    const { score, reasons } = calculateConfluenceScore(rsi, price, ma50, ma200, epsGrowth, pe, 20, favoredSectors.includes(sector));

    return {
      ticker,
      name: quote.shortName ?? quote.longName ?? ticker,
      price,
      change: quote.regularMarketChange ?? 0,
      changePercent: quote.regularMarketChangePercent ?? 0,
      rsi,
      ma50,
      ma200,
      pe,
      epsGrowth,
      marketCap: quote.marketCap ?? 0,
      sector,
      confluenceScore: score,
      confluenceReasons: reasons,
    };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const tickers = request.nextUrl.searchParams.get('tickers');
  const top = request.nextUrl.searchParams.get('top');

  try {
    let tickerList: { ticker: string; sector: string }[] = [];

    if (tickers) {
      const tickerArray = tickers.split(',').map(t => t.trim().toUpperCase());
      tickerList = tickerArray.map(t => {
        const stock = SP500_STOCKS.find(s => s.ticker === t);
        return { ticker: t, sector: stock?.sector ?? 'Unknown' };
      });
    } else {
      // Get top picks - sample diverse set of well-known stocks
      const sampleTickers = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'META', 'TSLA', 'JPM', 'JNJ', 'XOM',
        'V', 'UNH', 'HD', 'PG', 'MA', 'BAC', 'PFE', 'NFLX', 'DIS', 'COST'];
      tickerList = sampleTickers.map(t => {
        const stock = SP500_STOCKS.find(s => s.ticker === t);
        return { ticker: t, sector: stock?.sector ?? 'Unknown' };
      });
    }

    const tips: InvestmentTip[] = [];

    // Process in chunks of 5 with delay
    for (let i = 0; i < tickerList.length; i += 5) {
      const chunk = tickerList.slice(i, i + 5);
      const results = await Promise.allSettled(
        chunk.map(({ ticker, sector }) => fetchStockData(ticker, sector))
      );

      for (const r of results) {
        if (r.status === 'fulfilled' && r.value) {
          tips.push(generateTip(r.value));
        }
      }

      if (i + 5 < tickerList.length) await delay(300);
    }

    // Sort by confidence desc
    tips.sort((a, b) => {
      const signalOrder = { STRONG_BUY: 5, BUY: 4, HOLD: 3, SELL: 2, STRONG_SELL: 1 };
      return signalOrder[b.signal] - signalOrder[a.signal] || b.confidence - a.confidence;
    });

    const topN = top ? parseInt(top) : tips.length;
    return NextResponse.json({ tips: tips.slice(0, topN) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to generate tips' }, { status: 500 });
  }
}
