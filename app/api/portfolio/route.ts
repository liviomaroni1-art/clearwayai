import { NextRequest, NextResponse } from 'next/server';
import { Portfolio, Holding } from '@/lib/types';
import * as fs from 'fs';
import * as path from 'path';

const PORTFOLIO_PATH = path.join(process.cwd(), 'data', 'portfolio.json');

function readPortfolio(): Portfolio {
  try {
    if (fs.existsSync(PORTFOLIO_PATH)) {
      return JSON.parse(fs.readFileSync(PORTFOLIO_PATH, 'utf-8'));
    }
  } catch {}
  return { holdings: [] };
}

function writePortfolio(portfolio: Portfolio) {
  const dir = path.dirname(PORTFOLIO_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(PORTFOLIO_PATH, JSON.stringify(portfolio, null, 2));
}

export async function GET() {
  return NextResponse.json(readPortfolio());
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, holding } = body as { action: 'add' | 'update' | 'delete'; holding: Holding };

    const portfolio = readPortfolio();

    switch (action) {
      case 'add':
        portfolio.holdings.push(holding);
        break;
      case 'update':
        const idx = portfolio.holdings.findIndex(h => h.id === holding.id);
        if (idx >= 0) portfolio.holdings[idx] = holding;
        break;
      case 'delete':
        portfolio.holdings = portfolio.holdings.filter(h => h.id !== holding.id);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    writePortfolio(portfolio);
    return NextResponse.json(portfolio);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update portfolio' }, { status: 500 });
  }
}
