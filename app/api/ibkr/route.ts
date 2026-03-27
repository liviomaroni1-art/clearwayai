import { NextRequest, NextResponse } from 'next/server';
import { Holding } from '@/lib/types';
import * as fs from 'fs';
import * as path from 'path';

const SETTINGS_PATH = path.join(process.cwd(), 'data', 'settings.json');
const PORTFOLIO_PATH = path.join(process.cwd(), 'data', 'portfolio.json');
const ACCOUNT_PATH = path.join(process.cwd(), 'data', 'account.json');

function readSettings() {
  try {
    if (fs.existsSync(SETTINGS_PATH)) return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf-8'));
  } catch {}
  return {};
}

function writeJSON(filePath: string, data: any) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

async function fetchFlexQuery(token: string, queryId: string): Promise<string> {
  // Step 1: Request the report
  const requestUrl = `https://gdcdyn.interactivebrokers.com/Universal/servlet/FlexStatementService.SendRequest?t=${token}&q=${queryId}&v=3`;
  const requestRes = await fetch(requestUrl);
  const requestText = await requestRes.text();

  // Parse reference code from XML response
  const refMatch = requestText.match(/<ReferenceCode>(\d+)<\/ReferenceCode>/);
  if (!refMatch) {
    const errMatch = requestText.match(/<ErrorMessage>([^<]+)<\/ErrorMessage>/);
    throw new Error(errMatch ? errMatch[1] : 'Failed to request Flex Query. Check your token and query ID.');
  }
  const referenceCode = refMatch[1];

  // Step 2: Wait and fetch the report (IBKR needs a few seconds to generate)
  await new Promise(resolve => setTimeout(resolve, 3000));

  const getUrl = `https://gdcdyn.interactivebrokers.com/Universal/servlet/FlexStatementService.GetStatement?t=${token}&q=${referenceCode}&v=3`;

  // Retry up to 3 times with increasing delay
  for (let attempt = 0; attempt < 3; attempt++) {
    const getRes = await fetch(getUrl);
    const getText = await getRes.text();

    if (getText.includes('<FlexQueryResponse') || getText.includes('<FlexStatement')) {
      return getText;
    }

    // If still generating, wait longer
    if (getText.includes('Statement generation in progress')) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      continue;
    }

    // Check for errors
    const errMatch = getText.match(/<ErrorMessage>([^<]+)<\/ErrorMessage>/);
    if (errMatch) throw new Error(errMatch[1]);
  }

  throw new Error('Flex Query report generation timed out. Try again in a minute.');
}

function parseFlexPositions(xml: string): { holdings: Holding[]; cashBalance: number } {
  const holdings: Holding[] = [];
  let cashBalance = 0;

  // Parse open positions
  const posRegex = /<OpenPosition[^>]*?symbol="([^"]*)"[^>]*?position="([^"]*)"[^>]*?costBasisPrice="([^"]*)"[^>]*?/g;
  let match;
  let idx = 0;

  while ((match = posRegex.exec(xml)) !== null) {
    const ticker = match[1];
    const shares = parseFloat(match[2]);
    const avgPrice = parseFloat(match[3]);

    if (shares !== 0 && avgPrice > 0) {
      holdings.push({
        id: `ibkr-${idx++}`,
        ticker: ticker.replace(/\s+/g, ''),
        shares: Math.abs(shares),
        avgPrice,
        dateBought: new Date().toISOString().split('T')[0],
      });
    }
  }

  // Also try alternative format with separate attributes
  const posRegex2 = /<OpenPosition\s[^>]*>/g;
  let match2;
  while ((match2 = posRegex2.exec(xml)) !== null) {
    const tag = match2[0];
    const sym = tag.match(/symbol="([^"]*)"/);
    const pos = tag.match(/position="([^"]*)"/);
    const cost = tag.match(/costBasisPrice="([^"]*)"/);
    const costMoney = tag.match(/costBasisMoney="([^"]*)"/);

    if (sym && pos) {
      const ticker = sym[1].replace(/\s+/g, '');
      const shares = parseFloat(pos[1]);
      let avgPrice = cost ? parseFloat(cost[1]) : 0;

      // If costBasisPrice is 0, calculate from costBasisMoney
      if (avgPrice === 0 && costMoney && shares !== 0) {
        avgPrice = Math.abs(parseFloat(costMoney[1]) / shares);
      }

      // Don't add duplicates
      if (shares !== 0 && !holdings.find(h => h.ticker === ticker)) {
        holdings.push({
          id: `ibkr-${idx++}`,
          ticker,
          shares: Math.abs(shares),
          avgPrice: avgPrice > 0 ? avgPrice : 0,
          dateBought: new Date().toISOString().split('T')[0],
        });
      }
    }
  }

  // Parse cash balance
  const cashRegex = /<CashReportCurrency[^>]*?currency="BASE_SUMMARY"[^>]*?endingCash="([^"]*)"/;
  const cashMatch = xml.match(cashRegex);
  if (cashMatch) {
    cashBalance = parseFloat(cashMatch[1]);
  } else {
    // Try alternative cash format
    const cashRegex2 = /endingCash="([^"]*)"/;
    const cashMatch2 = xml.match(cashRegex2);
    if (cashMatch2) cashBalance = parseFloat(cashMatch2[1]);
  }

  return { holdings, cashBalance };
}

export async function GET() {
  const settings = readSettings();
  const hasCredentials = settings.ibkrToken && settings.ibkrQueryId;

  return NextResponse.json({
    connected: hasCredentials,
    token: settings.ibkrToken ? '***' + settings.ibkrToken.slice(-4) : null,
    queryId: settings.ibkrQueryId || null,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'save_credentials') {
      const settings = readSettings();
      settings.ibkrToken = body.token;
      settings.ibkrQueryId = body.queryId;
      writeJSON(SETTINGS_PATH, settings);
      return NextResponse.json({ success: true });
    }

    if (action === 'sync') {
      const settings = readSettings();
      if (!settings.ibkrToken || !settings.ibkrQueryId) {
        return NextResponse.json({ error: 'IBKR credentials not configured. Go to Settings to add your Flex Query token and ID.' }, { status: 400 });
      }

      // Fetch from IBKR
      const xml = await fetchFlexQuery(settings.ibkrToken, settings.ibkrQueryId);
      const { holdings, cashBalance } = parseFlexPositions(xml);

      if (holdings.length === 0 && cashBalance === 0) {
        return NextResponse.json({
          error: 'No positions or cash found in the Flex Query response. Make sure your query includes Open Positions and Cash Report sections.',
          rawLength: xml.length,
        }, { status: 400 });
      }

      // Update portfolio.json
      writeJSON(PORTFOLIO_PATH, { holdings });

      // Update account.json cash balance
      let account;
      try {
        account = JSON.parse(fs.readFileSync(ACCOUNT_PATH, 'utf-8'));
      } catch {
        account = { cashBalance: 0, transactions: [], riskTolerance: 'moderate', monthlyTarget: 3, maxPositionPct: 15, maxSectorPct: 35 };
      }

      const oldBalance = account.cashBalance;
      account.cashBalance = cashBalance;

      // Add sync transaction
      if (Math.abs(cashBalance - oldBalance) > 0.01) {
        account.transactions.unshift({
          id: `sync-${Date.now()}`,
          type: cashBalance > oldBalance ? 'deposit' : 'withdrawal',
          amount: Math.abs(cashBalance - oldBalance),
          date: new Date().toISOString().split('T')[0],
          note: `IBKR Sync — balance adjusted from $${oldBalance.toFixed(2)} to $${cashBalance.toFixed(2)}`,
        });
      }

      writeJSON(ACCOUNT_PATH, account);

      return NextResponse.json({
        success: true,
        positions: holdings.length,
        cashBalance,
        holdings,
        syncedAt: new Date().toISOString(),
      });
    }

    if (action === 'disconnect') {
      const settings = readSettings();
      delete settings.ibkrToken;
      delete settings.ibkrQueryId;
      writeJSON(SETTINGS_PATH, settings);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'IBKR sync failed' }, { status: 500 });
  }
}
