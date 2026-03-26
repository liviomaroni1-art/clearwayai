# StockPulse — Stock Screener & Portfolio Tracker

A full-stack stock screener and portfolio tracker built with Next.js 14, TypeScript, Tailwind CSS, and Yahoo Finance data.

## Features

- **Portfolio Tracker** — Track holdings with live prices, P&L, sparkline charts
- **Macro Regime Engine** — GDP, unemployment, CPI, Fed Funds, sentiment scoring via FRED API
- **Stock Screener** — Filter S&P 500 by RSI, P/E, EPS growth, moving averages, sector, market cap
- **Confluence Alerts** — Scoring engine (0–10) combining technical, fundamental, and macro signals
- **Portfolio Alerts** — HOLD / REVIEW / EXIT / ADD MORE signals for each position

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Recharts
- Yahoo Finance (`yahoo-finance2`)
- Local JSON file storage

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## FRED API Key (Optional)

For macro regime analysis, get a free API key from [FRED](https://fred.stlouisfed.org/docs/api/api_key.html) and enter it in Settings (`/settings`).

Without a key, the macro regime defaults to "Late Cycle".

## Demo Data

The app comes pre-loaded with 8 demo portfolio holdings (AAPL, MSFT, NVDA, GOOGL, AMZN, JPM, JNJ, XOM). Edit them in the Portfolio page or directly in `data/portfolio.json`.

## Project Structure

```
app/
  page.tsx              # Dashboard
  portfolio/page.tsx    # Portfolio tracker
  screener/page.tsx     # Stock screener
  settings/page.tsx     # Settings
  api/
    quote/route.ts      # Single stock quote
    history/route.ts    # Price history (OHLCV)
    screener/route.ts   # Batch S&P 500 screening
    macro/route.ts      # FRED macro data
    portfolio/route.ts  # Portfolio CRUD
    settings/route.ts   # Settings CRUD
components/
  dashboard/            # Dashboard widgets
  portfolio/            # Portfolio components
  ui/                   # Shadcn/ui primitives
lib/
  types.ts              # TypeScript interfaces
  utils.ts              # Formatting utilities
  calculations.ts       # RSI, SMA, confluence scoring
  sp500.ts              # S&P 500 ticker list
data/
  portfolio.json        # Portfolio holdings
  settings.json         # App settings
```
