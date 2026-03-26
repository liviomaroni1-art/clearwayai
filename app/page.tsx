"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MacroRegimeBanner } from "@/components/dashboard/macro-regime-banner";
import {
  formatCurrency,
  formatPL,
  formatPercent,
} from "@/lib/utils";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart,
  AlertTriangle,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Briefcase,
  Shield,
  Zap,
  ChevronRight,
  Clock,
  BarChart3,
} from "lucide-react";
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface Briefing {
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
  actionItems: ActionItem[];
  sectorAllocation: { sector: string; value: number; pct: number }[];
  topPerformers: { ticker: string; plPct: number }[];
  bottomPerformers: { ticker: string; plPct: number }[];
  riskAlerts: string[];
}

interface ActionItem {
  ticker: string;
  name: string;
  signal: string;
  confidence: number;
  currentShares: number;
  currentValue: number;
  recommendedAction: string;
  recommendedShares: number;
  recommendedDollarAmount: number;
  positionPctOfPortfolio: number;
  reasoning: string;
  priority: number;
  riskLevel: string;
  sector: string;
  price: number;
  targets: { entry: number; stopLoss: number; target1: number; target2: number };
}

interface MacroData {
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

const SECTOR_COLORS = [
  "#38bdf8", "#a78bfa", "#f59e0b", "#22c55e", "#ef4444",
  "#ec4899", "#06b6d4", "#f97316", "#8b5cf6", "#14b8a6", "#e879f9",
];

function getActionColor(action: string) {
  switch (action) {
    case "NEW_POSITION": return "#22c55e";
    case "ADD": return "#38bdf8";
    case "BUY": return "#38bdf8";
    case "HOLD": return "#f59e0b";
    case "TRIM": return "#f97316";
    case "SELL": return "#ef4444";
    default: return "#64748b";
  }
}

function getActionEmoji(action: string) {
  switch (action) {
    case "NEW_POSITION": return "🆕";
    case "ADD": return "➕";
    case "BUY": return "📈";
    case "HOLD": return "⏸️";
    case "TRIM": return "✂️";
    case "SELL": return "🔴";
    default: return "•";
  }
}

export default function FundManagerDashboard() {
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [macro, setMacro] = useState<MacroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(60);

  const fetchData = useCallback(async () => {
    try {
      const [briefingRes, macroRes] = await Promise.all([
        fetch("/api/briefing"),
        fetch("/api/macro"),
      ]);
      const briefingData = await briefingRes.json();
      const macroData = await macroRes.json();
      if (!briefingData.error) setBriefing(briefingData);
      if (!macroData.error) setMacro(macroData);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { fetchData(); return 60; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <Skeleton className="h-64 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!briefing) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Failed to load briefing. Check your connection and try again.
        </CardContent>
      </Card>
    );
  }

  const totalPLPct = briefing.investedValue > 0
    ? (briefing.totalPL / (briefing.investedValue - briefing.totalPL)) * 100 : 0;

  const pieData = [
    ...briefing.sectorAllocation.map(s => ({ name: s.sector, value: s.value })),
    ...(briefing.cashAvailable > 0 ? [{ name: "Cash", value: briefing.cashAvailable }] : []),
  ];

  const actionItems = briefing.actionItems.filter(a => a.recommendedAction !== "HOLD");
  const holdItems = briefing.actionItems.filter(a => a.recommendedAction === "HOLD");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" />
            Fund Manager
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Personal Hedge Fund Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/transactions">
            <Button variant="outline" size="sm">
              <Wallet className="h-4 w-4 mr-2" />
              Transactions
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
            <div className="h-2 w-2 rounded-full bg-positive animate-pulse" />
            {countdown}s
          </div>
        </div>
      </div>

      {/* Daily Briefing */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10 shrink-0 mt-0.5">
              <Zap className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-foreground text-sm mb-1">Daily Briefing — {briefing.date}</h3>
              <p className="text-sm text-foreground/90 leading-relaxed">{briefing.greeting}</p>
              <p className="text-xs text-muted-foreground mt-2">{briefing.marketSentiment}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macro Regime */}
      <MacroRegimeBanner data={macro} loading={false} />

      {/* AUM Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            label: "Total AUM",
            value: formatCurrency(briefing.totalAUM),
            icon: Briefcase,
            color: "text-foreground",
            sub: "",
          },
          {
            label: "Cash Available",
            value: formatCurrency(briefing.cashAvailable),
            icon: Wallet,
            color: "text-accent",
            sub: `${briefing.cashPct.toFixed(1)}% of AUM`,
          },
          {
            label: "Invested",
            value: formatCurrency(briefing.investedValue),
            icon: PieChart,
            color: "text-foreground",
            sub: `${(100 - briefing.cashPct).toFixed(1)}% deployed`,
          },
          {
            label: "Total P&L",
            value: formatPL(briefing.totalPL),
            icon: briefing.totalPL >= 0 ? TrendingUp : TrendingDown,
            color: briefing.totalPL >= 0 ? "text-positive" : "text-negative",
            sub: formatPercent(totalPLPct),
          },
          {
            label: "Positions",
            value: String(briefing.actionItems.length),
            icon: BarChart3,
            color: "text-foreground",
            sub: `${actionItems.length} action items`,
          },
        ].map(({ label, value, icon: Icon, color, sub }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{label}</span>
              </div>
              <p className={`font-mono text-lg font-bold ${color}`}>{value}</p>
              {sub && <p className="font-mono text-xs text-muted-foreground mt-0.5">{sub}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Risk Alerts */}
      {briefing.riskAlerts.length > 0 && (
        <Card className="border-warning/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Risk Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1.5">
              {briefing.riskAlerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-warning mt-0.5">⚠</span>
                  <span className="text-foreground/80">{alert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Items + Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Action Items - 2 cols */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-accent" />
                Action Items — What To Do Today
              </CardTitle>
              <Badge variant="outline" className="font-mono text-xs">{actionItems.length} actions</Badge>
            </div>
            <CardDescription>Position sizing based on your ${formatCurrency(briefing.cashAvailable).replace('$', '')} available cash and {briefing.cashPct < 20 ? 'conservative' : 'active'} deployment strategy</CardDescription>
          </CardHeader>
          <CardContent>
            {actionItems.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No immediate actions needed. Portfolio is well-positioned.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {actionItems.map((item) => (
                  <div key={item.ticker} className="rounded-lg border border-border p-3 hover:bg-card/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getActionEmoji(item.recommendedAction)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link href={`/stock/${item.ticker}`} className="font-mono font-bold text-foreground hover:text-accent transition-colors">
                            {item.ticker}
                          </Link>
                          <span className="text-xs text-muted-foreground">{item.name}</span>
                          <Badge
                            className="text-[10px] font-mono"
                            style={{ backgroundColor: getActionColor(item.recommendedAction) + "20", color: getActionColor(item.recommendedAction), border: "none" }}
                          >
                            {item.recommendedAction.replace("_", " ")}
                          </Badge>
                          <Badge variant={item.riskLevel === "HIGH" ? "negative" : item.riskLevel === "LOW" ? "positive" : "warning"} className="text-[9px]">
                            {item.riskLevel}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.reasoning}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-mono text-sm font-bold" style={{ color: getActionColor(item.recommendedAction) }}>
                          {item.recommendedDollarAmount >= 0 ? "+" : ""}{formatCurrency(item.recommendedDollarAmount)}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">
                          {item.recommendedShares > 0 ? "+" : ""}{item.recommendedShares} shares @ ${item.price.toFixed(2)}
                        </div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          → {item.positionPctOfPortfolio.toFixed(1)}% of portfolio
                        </div>
                      </div>
                    </div>
                    {/* Price targets */}
                    <div className="flex items-center gap-4 mt-2 ml-9 text-[10px] font-mono text-muted-foreground">
                      <span>Entry: <span className="text-foreground">${item.targets.entry.toFixed(2)}</span></span>
                      <span>SL: <span className="text-negative">${item.targets.stopLoss.toFixed(2)}</span></span>
                      <span>TP1: <span className="text-positive">${item.targets.target1.toFixed(2)}</span></span>
                      <span>TP2: <span className="text-positive">${item.targets.target2.toFixed(2)}</span></span>
                      <span className="ml-auto">Confidence: <span className="text-accent">{item.confidence}%</span></span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Hold positions summary */}
            {holdItems.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">
                  <span className="font-semibold">HOLD</span> — {holdItems.length} position{holdItems.length > 1 ? "s" : ""} maintaining current allocation:
                </p>
                <div className="flex flex-wrap gap-2">
                  {holdItems.map(h => (
                    <Link key={h.ticker} href={`/stock/${h.ticker}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-card font-mono text-xs">
                        ⏸️ {h.ticker} · {formatCurrency(h.currentValue)} · {h.positionPctOfPortfolio.toFixed(1)}%
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sector Allocation Pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <PieChart className="h-4 w-4 text-accent" />
              Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={entry.name === "Cash" ? "#64748b" : SECTOR_COLORS[index % SECTOR_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0];
                      return (
                        <div className="bg-card border border-border rounded p-2 text-xs font-mono">
                          <span className="text-foreground">{d.name}: </span>
                          <span className="text-accent">{formatCurrency(d.value as number)}</span>
                        </div>
                      );
                    }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-2">
              {pieData.map((entry, i) => (
                <div key={entry.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: entry.name === "Cash" ? "#64748b" : SECTOR_COLORS[i % SECTOR_COLORS.length] }} />
                    <span className="text-muted-foreground">{entry.name}</span>
                  </div>
                  <span className="font-mono text-foreground">
                    {briefing.totalAUM > 0 ? ((entry.value / briefing.totalAUM) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance + Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top/Bottom Performers */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-accent" />
              Position Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Top Performers</p>
                {briefing.topPerformers.map(p => (
                  <div key={p.ticker} className="flex items-center justify-between py-1">
                    <Link href={`/stock/${p.ticker}`} className="font-mono text-sm text-foreground hover:text-accent transition-colors">{p.ticker}</Link>
                    <span className="font-mono text-sm text-positive">{formatPercent(p.plPct)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Underperformers</p>
                {briefing.bottomPerformers.map(p => (
                  <div key={p.ticker} className="flex items-center justify-between py-1">
                    <Link href={`/stock/${p.ticker}`} className="font-mono text-sm text-foreground hover:text-accent transition-colors">{p.ticker}</Link>
                    <span className={`font-mono text-sm ${p.plPct >= 0 ? "text-positive" : "text-negative"}`}>{formatPercent(p.plPct)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Health */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              Portfolio Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-sm text-foreground">{briefing.portfolioHealth}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Cash Ratio</p>
                <p className={`font-mono text-lg font-bold ${
                  briefing.cashPct < 5 ? "text-negative" : briefing.cashPct > 40 ? "text-warning" : "text-positive"
                }`}>
                  {briefing.cashPct.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Risk Alerts</p>
                <p className={`font-mono text-lg font-bold ${
                  briefing.riskAlerts.length === 0 ? "text-positive" : briefing.riskAlerts.length <= 2 ? "text-warning" : "text-negative"
                }`}>
                  {briefing.riskAlerts.length}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Active Positions</span>
              <span className="font-mono text-foreground">{briefing.actionItems.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Sectors Diversified</span>
              <span className="font-mono text-foreground">{briefing.sectorAllocation.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Largest Position</span>
              <span className="font-mono text-foreground">
                {briefing.actionItems.length > 0
                  ? `${briefing.actionItems.reduce((max, a) => a.positionPctOfPortfolio > max.positionPctOfPortfolio ? a : max, briefing.actionItems[0]).ticker} (${briefing.actionItems.reduce((max, a) => a.positionPctOfPortfolio > max.positionPctOfPortfolio ? a : max, briefing.actionItems[0]).positionPctOfPortfolio.toFixed(1)}%)`
                  : "—"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
