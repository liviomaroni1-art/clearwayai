import { NextRequest, NextResponse } from 'next/server';
import { Account, Transaction } from '@/lib/types';
import * as fs from 'fs';
import * as path from 'path';

const ACCOUNT_PATH = path.join(process.cwd(), 'data', 'account.json');

function readAccount(): Account {
  try {
    if (fs.existsSync(ACCOUNT_PATH)) {
      return JSON.parse(fs.readFileSync(ACCOUNT_PATH, 'utf-8'));
    }
  } catch {}
  return {
    cashBalance: 50000,
    transactions: [
      { id: 'init-1', type: 'deposit', amount: 50000, date: '2024-01-01', note: 'Initial IBKR deposit' },
    ],
    riskTolerance: 'moderate',
    monthlyTarget: 3,
    maxPositionPct: 10,
    maxSectorPct: 30,
  };
}

function writeAccount(account: Account) {
  const dir = path.dirname(ACCOUNT_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(ACCOUNT_PATH, JSON.stringify(account, null, 2));
}

export async function GET() {
  return NextResponse.json(readAccount());
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;
    const account = readAccount();

    switch (action) {
      case 'deposit': {
        const { amount, note, date } = body;
        const txn: Transaction = {
          id: `txn-${Date.now()}`,
          type: 'deposit',
          amount: parseFloat(amount),
          date: date || new Date().toISOString().split('T')[0],
          note: note || 'Deposit',
        };
        account.cashBalance += txn.amount;
        account.transactions.unshift(txn);
        break;
      }
      case 'withdrawal': {
        const { amount, note, date } = body;
        const amt = parseFloat(amount);
        if (amt > account.cashBalance) {
          return NextResponse.json({ error: 'Insufficient cash balance' }, { status: 400 });
        }
        const txn: Transaction = {
          id: `txn-${Date.now()}`,
          type: 'withdrawal',
          amount: amt,
          date: date || new Date().toISOString().split('T')[0],
          note: note || 'Withdrawal',
        };
        account.cashBalance -= txn.amount;
        account.transactions.unshift(txn);
        break;
      }
      case 'update_settings': {
        const { riskTolerance, monthlyTarget, maxPositionPct, maxSectorPct } = body;
        if (riskTolerance) account.riskTolerance = riskTolerance;
        if (monthlyTarget !== undefined) account.monthlyTarget = parseFloat(monthlyTarget);
        if (maxPositionPct !== undefined) account.maxPositionPct = parseFloat(maxPositionPct);
        if (maxSectorPct !== undefined) account.maxSectorPct = parseFloat(maxSectorPct);
        break;
      }
      case 'adjust_cash': {
        // When a trade is executed, adjust cash
        const { amount: tradeAmount, ticker, tradeType } = body;
        const amt = parseFloat(tradeAmount);
        if (tradeType === 'buy') {
          if (amt > account.cashBalance) {
            return NextResponse.json({ error: 'Insufficient cash' }, { status: 400 });
          }
          account.cashBalance -= amt;
          account.transactions.unshift({
            id: `txn-${Date.now()}`,
            type: 'withdrawal',
            amount: amt,
            date: new Date().toISOString().split('T')[0],
            note: `Bought ${ticker}`,
          });
        } else {
          account.cashBalance += amt;
          account.transactions.unshift({
            id: `txn-${Date.now()}`,
            type: 'deposit',
            amount: amt,
            date: new Date().toISOString().split('T')[0],
            note: `Sold ${ticker}`,
          });
        }
        break;
      }
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    writeAccount(account);
    return NextResponse.json(account);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
