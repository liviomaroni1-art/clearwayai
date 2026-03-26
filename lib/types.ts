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

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: string;
  note: string;
}

export interface Account {
  cashBalance: number;
  transactions: Transaction[];
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  monthlyTarget: number; // target return %
  maxPositionPct: number; // max % of portfolio in single position
  maxSectorPct: number; // max % in single sector
}

export interface AllocationRecommendation {
  ticker: string;
  name: string;
  signal: string;
  confidence: number;
  currentShares: number;
  currentValue: number;
  recommendedAction: 'BUY' | 'ADD' | 'HOLD' | 'TRIM' | 'SELL' | 'NEW_POSITION';
  recommendedShares: number;
  recommendedDollarAmount: number;
  positionPctOfPortfolio: number;
  reasoning: string;
  priority: number; // 1-10, higher = more urgent
  riskLevel: string;
  sector: string;
  price: number;
  targets: {
    entry: number;
    stopLoss: number;
    target1: number;
    target2: number;
  };
}

export interface DailyBriefing {
  date: string;
  greeting: string;
  marketSentiment: string;
  portfolioHealth: string;
  totalAUM: number;
  cashAvailable: number;
  investedValue: number;
  todayPL: number;
  totalPL: number;
  cashPct: number;
  actionItems: AllocationRecommendation[];
  sectorAllocation: { sector: string; value: number; pct: number }[];
  topPerformers: { ticker: string; plPct: number }[];
  bottomPerformers: { ticker: string; plPct: number }[];
  riskAlerts: string[];
}
