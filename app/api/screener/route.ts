import { NextRequest, NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';
import { SP500_STOCKS } from '@/lib/sp500';
import { calculateRSI, calculateSMA, calculateConfluenceScore, getRegimeFavoredSectors } from '@/lib/calculations';
import { ScreenerStock, MacroData } from '@/lib/types';
import { delay } from '@/lib/utils';
import * as fs from 'fs';
import * as path from 'path';

function getMacroRegime(): MacroData['regime'] {
  try {
    const cachePath = path.join(process.cwd(), 'data', 'macro-cache.json');
    if (fs.existsSync(cachePath)) {
      const data = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
      return data.regime || 'Expansion';
    }
  } catch {}
  return 'Expansion';
}

export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get('page') ?? '0');
  const pageSize = parseInt(request.nextUrl.searchParams.get('pageSize') ?? '50');

  try {
    const regime = getMacroRegime();
    const favoredSectors = getRegimeFavoredSectors(regime);

    const start = page * pageSize;
    const end = Math.min(start + pageSize, SP500_STOCKS.length);
    const batch = SP500_STOCKS.slice(start, end);

    const sectorPEs: Record<string, number[]> = {};
    const results: ScreenerStock[] = [];

    // Process in chunks of 10 with 300ms delay
    for (let i = 0; i < batch.length; i += 10) {
      const chunk = batch.slice(i, i + 10);

      const chunkResults = await Promise.allSettled(
        chunk.map(async (stock) => {
          try {
            const yf = yahooFinance as any;
            const [quote, histData] = await Promise.all([
              yf.quote(stock.ticker),
              yf.historical(stock.ticker, {
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

            // Track sector PEs
            if (pe > 0) {
              if (!sectorPEs[stock.sector]) sectorPEs[stock.sector] = [];
              sectorPEs[stock.sector].push(pe);
            }

            const epsCurrentYear = quote.epsTrailingTwelveMonths ?? 0;
            const epsGrowth = quote.earningsQuarterlyGrowth
              ? (quote.earningsQuarterlyGrowth as number) * 100
              : 0;

            return {
              ticker: stock.ticker,
              name: stock.name,
              price,
              change: quote.regularMarketChange ?? 0,
              changePercent: quote.regularMarketChangePercent ?? 0,
              rsi,
              ma50,
              ma200,
              pe,
              epsGrowth,
              marketCap: quote.marketCap ?? 0,
              sector: stock.sector,
              confluenceScore: 0,
              confluenceReasons: [] as string[],
            };
          } catch {
            return null;
          }
        })
      );

      for (const r of chunkResults) {
        if (r.status === 'fulfilled' && r.value) {
          results.push(r.value);
        }
      }

      if (i + 10 < batch.length) {
        await delay(300);
      }
    }

    // Calculate sector averages and confluence scores
    for (const stock of results) {
      const sectorAvgPE = sectorPEs[stock.sector]
        ? sectorPEs[stock.sector].reduce((a, b) => a + b, 0) / sectorPEs[stock.sector].length
        : 0;

      const { score, reasons } = calculateConfluenceScore(
        stock.rsi,
        stock.price,
        stock.ma50,
        stock.ma200,
        stock.epsGrowth,
        stock.pe,
        sectorAvgPE,
        favoredSectors.includes(stock.sector)
      );
      stock.confluenceScore = score;
      stock.confluenceReasons = reasons;
    }

    return NextResponse.json({
      stocks: results,
      total: SP500_STOCKS.length,
      page,
      pageSize,
      regime,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Screener failed' }, { status: 500 });
  }
}
