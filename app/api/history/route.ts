import { NextRequest, NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get('ticker');
  const days = parseInt(request.nextUrl.searchParams.get('days') ?? '200');

  if (!ticker) {
    return NextResponse.json({ error: 'ticker is required' }, { status: 400 });
  }

  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days - 10);

    const result = await (yahooFinance as any).historical(ticker, {
      period1: startDate.toISOString().split('T')[0],
      period2: endDate.toISOString().split('T')[0],
      interval: '1d',
    });

    const bars = (result || []).map((bar: any) => ({
      date: bar.date instanceof Date ? bar.date.toISOString().split('T')[0] : String(bar.date).split('T')[0],
      open: bar.open ?? 0,
      high: bar.high ?? 0,
      low: bar.low ?? 0,
      close: bar.close ?? 0,
      volume: bar.volume ?? 0,
    }));

    return NextResponse.json(bars);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch history' }, { status: 500 });
  }
}
