"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TradingChart } from "@/components/charts/trading-chart";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  AlertTriangle,
  BarChart3,
  DollarSign,
  Activity,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  eps: number;
  sector: string;
}

interface HistoryBar {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface Tip {
  signal: string;
  confidence: number;
  score: number;
  summary: string;
  reasoning: {
    category: string;
    signal: string;
    detail: string;
    weight: number;
  }[];
  targets: {
    entry: number;
    stopLoss: number;
    target1: number;
    target2: number;
  };
  timeframe: string;
  riskLevel: string;
}

function getSignalColor(signal: string): string {
  switch (signal) {
    case "STRONG_BUY": return "#22c55e";
    case "BUY": return "#38bdf8";
    case "HOLD": return "#f59e0b";
    case "SELL": return "#f97316";
    case "STRONG_SELL": return "#ef4444";
    default: return "#64748b";
  }
}

function getSignalLabel(signal: string): string {
  return signal.replace("_", " ");
}

function getSignalEmoji(signal: string): string {
  switch (signal) {
    case "STRONG_BUY": return "🚀";
    case "BUY": return "📈";
    case "HOLD": return "⏸️";
    case "SELL": return "📉";
    case "STRONG_SELL": return "🔴";
    default: return "•";
  }
}

function formatLargeNumber(value: number): string {
  if (value >= 1e12) return (value / 1e12).toFixed(2) + "T";
  if (value >= 1e9) return (value / 1e9).toFixed(2) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(2) + "M";
  return value.toFixed(2);
}

export default function StockDetailPage() {
  const params = useParams();
  const ticker = (params.ticker as string)?.toUpperCase();

  const [quote, setQuote] = useState<StockData | null>(null);
  const [history, setHistory] = useState<HistoryBar[]>([]);
  const [tip, setTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!ticker) return;
    setLoading(true);

    try {
      const [quoteRes, histRes, tipRes] = await Promise.all([
        fetch(`/api/quote?ticker=${ticker}`),
        fetch(`/api/history?ticker=${ticker}&days=365`),
        fetch(`/api/tips?tickers=${ticker}`),
      ]);

      const quoteData = await quoteRes.json();
      const histData = await histRes.json();
      const tipData = await tipRes.json();

      if (!quoteData.error) setQuote(quoteData);
      if (Array.isArray(histData)) setHistory(histData);
      if (tipData.tips?.length > 0) setTip(tipData.tips[0]);
    } catch (err) {
      console.error("Failed to fetch stock data:", err);
    }
    setLoading(false);
  }, [ticker]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-[500px] w-full rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="space-y-6">
        <Link href="/screener" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Screener
        </Link>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Failed to load data for {ticker}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isUp = quote.change >= 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/screener" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-sans text-2xl font-bold text-foreground">{ticker}</h1>
              <Badge variant="outline" className="text-xs">{quote.sector || "N/A"}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{quote.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-mono text-3xl font-bold text-foreground">${quote.price.toFixed(2)}</p>
            <p className={`font-mono text-sm ${isUp ? "text-positive" : "text-negative"}`}>
              {isUp ? "+" : ""}{quote.change.toFixed(2)} ({isUp ? "+" : ""}{quote.changePercent.toFixed(2)}%)
            </p>
          </div>
          {tip && (
            <div
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg border"
              style={{ borderColor: getSignalColor(tip.signal), backgroundColor: getSignalColor(tip.signal) + "15" }}
            >
              <span className="text-lg">{getSignalEmoji(tip.signal)}</span>
              <span className="text-xs font-mono font-bold" style={{ color: getSignalColor(tip.signal) }}>
                {getSignalLabel(tip.signal)}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">{tip.confidence}% conf</span>
            </div>
          )}
        </div>
      </div>

      {/* Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { label: "Market Cap", value: `$${formatLargeNumber(quote.marketCap)}`, icon: DollarSign },
          { label: "P/E Ratio", value: quote.pe > 0 ? quote.pe.toFixed(1) : "N/A", icon: BarChart3 },
          { label: "EPS", value: `$${quote.eps.toFixed(2)}`, icon: Activity },
          { label: "Volume", value: formatLargeNumber(quote.volume), icon: Zap },
          { label: "Day Range", value: `${isUp ? "▲" : "▼"} ${Math.abs(quote.changePercent).toFixed(2)}%`, icon: isUp ? TrendingUp : TrendingDown },
          { label: "Confluence", value: tip ? `${tip.score}/10` : "—", icon: Target },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="bg-card/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
              </div>
              <span className="font-mono text-sm font-semibold text-foreground">{value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardContent className="p-4">
          <TradingChart data={history} ticker={ticker} height={500} />
        </CardContent>
      </Card>

      {/* Analysis Panels */}
      {tip && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Investment Signal */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-accent" />
                Investment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Summary */}
              <div className="p-3 rounded-lg border border-border bg-background">
                <p className="text-sm text-foreground leading-relaxed">{tip.summary}</p>
              </div>

              {/* Signal Details */}
              <div className="space-y-2">
                {tip.reasoning.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-card/50 transition-colors">
                    <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                      r.signal === "bullish" ? "bg-positive" :
                      r.signal === "bearish" ? "bg-negative" : "bg-warning"
                    }`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground uppercase tracking-wider">{r.category}</span>
                        <Badge variant={r.signal === "bullish" ? "positive" : r.signal === "bearish" ? "negative" : "warning"} className="text-[10px]">
                          {r.signal}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price Targets & Risk */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4 text-accent" />
                Trade Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Risk Level */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" style={{ color: tip.riskLevel === "HIGH" ? "#ef4444" : tip.riskLevel === "MEDIUM" ? "#f59e0b" : "#22c55e" }} />
                  <span className="text-sm text-foreground">Risk Level</span>
                </div>
                <Badge variant={tip.riskLevel === "HIGH" ? "negative" : tip.riskLevel === "MEDIUM" ? "warning" : "positive"}>
                  {tip.riskLevel}
                </Badge>
              </div>

              {/* Timeframe */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                <span className="text-sm text-foreground">Timeframe</span>
                <span className="font-mono text-sm text-muted-foreground">{tip.timeframe}</span>
              </div>

              {/* Price Targets */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price Targets</h4>

                {[
                  { label: "Entry", value: tip.targets.entry, color: "#38bdf8" },
                  { label: "Stop Loss", value: tip.targets.stopLoss, color: "#ef4444" },
                  { label: "Target 1", value: tip.targets.target1, color: "#22c55e" },
                  { label: "Target 2", value: tip.targets.target2, color: "#22c55e" },
                ].map(({ label, value, color }) => {
                  const pctFromCurrent = ((value - quote.price) / quote.price) * 100;
                  return (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-sm text-foreground">{label}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm text-foreground">${value.toFixed(2)}</span>
                        <span className={`font-mono text-xs ml-2 ${pctFromCurrent >= 0 ? "text-positive" : "text-negative"}`}>
                          {pctFromCurrent >= 0 ? "+" : ""}{pctFromCurrent.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Risk/Reward */}
              <div className="p-3 rounded-lg border border-border bg-background">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Risk/Reward Ratio</span>
                  <span className="font-mono text-sm font-semibold text-positive">
                    1:{((Math.abs(tip.targets.target1 - tip.targets.entry)) / Math.abs(tip.targets.entry - tip.targets.stopLoss)).toFixed(1)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
