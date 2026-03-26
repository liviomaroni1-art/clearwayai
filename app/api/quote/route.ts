import { NextRequest, NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get('ticker');
  if (!ticker) {
    return NextResponse.json({ error: 'ticker is required' }, { status: 400 });
  }

  try {
    const quote = await (yahooFinance as any).quote(ticker);
    return NextResponse.json({
      ticker: quote.symbol,
      price: quote.regularMarketPrice ?? 0,
      change: quote.regularMarketChange ?? 0,
      changePercent: quote.regularMarketChangePercent ?? 0,
      volume: quote.regularMarketVolume ?? 0,
      marketCap: quote.marketCap ?? 0,
      pe: quote.trailingPE ?? 0,
      eps: quote.epsTrailingTwelveMonths ?? 0,
      sector: '',
      name: quote.shortName ?? quote.longName ?? ticker,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch quote' }, { status: 500 });
  }
}
