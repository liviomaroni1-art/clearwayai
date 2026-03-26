export interface Holding {
  id: string;
  ticker: string;
  shares: number;
  avgPrice: number;
  dateBought: string;
}

export interface Portfolio {
  holdings: Holding[];
}

export interface QuoteData {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  eps: number;
  sector: string;
  name: string;
}

export interface HistoryBar {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ScreenerStock {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  rsi: number;
  ma50: number;
  ma200: number;
  pe: number;
  epsGrowth: number;
  marketCap: number;
  sector: string;
  confluenceScore: number;
  confluenceReasons: string[];
}

export interface MacroData {
  gdpGrowth: number | null;
  unemployment: number | null;
  fedFunds: number | null;
  cpiYoY: number | null;
  consumerSentiment: number | null;
  compositeScore: number;
  regime: 'Expansion' | 'Late Cycle' | 'Slowdown' | 'Contraction';
  favoriteSectors: string[];
  timestamp: string;
}

export interface PortfolioAlert {
  ticker: string;
  signal: 'HOLD' | 'REVIEW' | 'EXIT' | 'ADD_MORE';
  confluenceScore: number;
  reasons: string[];
  positionPct: number;
}

export interface Settings {
  fredApiKey: string;
  refreshInterval: number;
  currency: string;
}
