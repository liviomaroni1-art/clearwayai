"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb, TrendingUp, TrendingDown, Target, ChevronRight, Shield, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface Tip {
  ticker: string;
  name: string;
  price: number;
  signal: string;
  confidence: number;
  score: number;
  summary: string;
  reasoning: { category: string; signal: string; detail: string }[];
  targets: { entry: number; stopLoss: number; target1: number; target2: number };
  timeframe: string;
  sector: string;
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

function getRiskBadgeVariant(risk: string) {
  switch (risk) {
    case "LOW": return "positive" as const;
    case "MEDIUM": return "warning" as const;
    case "HIGH": return "negative" as const;
    default: return "outline" as const;
  }
}

interface Props {
  loading: boolean;
}

export function InvestmentTips({ loading: parentLoading }: Props) {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await fetch("/api/tips?top=10");
        const data = await res.json();
        if (data.tips) setTips(data.tips);
      } catch (err) {
        console.error("Failed to fetch tips:", err);
      }
      setLoading(false);
    };
    fetchTips();
  }, []);

  const isLoading = loading || parentLoading;

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-4 w-4 text-warning" />
            Investment Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-64" />
              </div>
              <Skeleton className="h-8 w-16 rounded" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Lightbulb className="h-4 w-4 text-warning" />
          Investment Tips — Top Picks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tips.length === 0 ? (
          <p className="text-sm text-muted-foreground">Analyzing stocks...</p>
        ) : (
          <div className="space-y-2">
            {tips.map((tip) => (
              <div key={tip.ticker}>
                <div
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-card/80 transition-colors cursor-pointer"
                  onClick={() => setExpanded(expanded === tip.ticker ? null : tip.ticker)}
                >
                  {/* Signal Badge */}
                  <div
                    className="flex flex-col items-center justify-center h-11 w-11 rounded-lg shrink-0"
                    style={{ backgroundColor: getSignalColor(tip.signal) + "15", border: `1px solid ${getSignalColor(tip.signal)}30` }}
                  >
                    <span className="text-sm">{getSignalEmoji(tip.signal)}</span>
                    <span className="text-[8px] font-mono font-bold" style={{ color: getSignalColor(tip.signal) }}>
                      {tip.confidence}%
                    </span>
                  </div>

                  {/* Stock Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/stock/${tip.ticker}`}
                        className="font-mono font-semibold text-foreground hover:text-accent transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tip.ticker}
                      </Link>
                      <span className="text-xs text-muted-foreground truncate">{tip.name}</span>
                      <Badge variant={getRiskBadgeVariant(tip.riskLevel)} className="text-[9px] ml-auto shrink-0">
                        {tip.riskLevel} RISK
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{tip.summary}</p>
                  </div>

                  {/* Price + Signal */}
                  <div className="text-right shrink-0">
                    <span className="font-mono text-sm text-foreground">${tip.price.toFixed(2)}</span>
                    <div>
                      <Badge
                        className="text-[10px] font-mono"
                        style={{ backgroundColor: getSignalColor(tip.signal) + "20", color: getSignalColor(tip.signal), border: "none" }}
                      >
                        {tip.signal.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>

                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${expanded === tip.ticker ? "rotate-90" : ""}`} />
                </div>

                {/* Expanded Details */}
                {expanded === tip.ticker && (
                  <div className="ml-14 mr-2 mt-1 mb-2 p-3 rounded-lg bg-background border border-border space-y-3">
                    {/* Reasoning */}
                    <div className="space-y-1.5">
                      {tip.reasoning.map((r, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                            r.signal === "bullish" ? "bg-positive" :
                            r.signal === "bearish" ? "bg-negative" : "bg-warning"
                          }`} />
                          <div>
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase">{r.category}:</span>
                            <span className="text-xs text-foreground ml-1">{r.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Targets */}
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-2 rounded bg-card border border-border">
                        <span className="text-[9px] text-muted-foreground block">Entry</span>
                        <span className="font-mono text-xs text-foreground">${tip.targets.entry.toFixed(2)}</span>
                      </div>
                      <div className="p-2 rounded bg-card border border-border">
                        <span className="text-[9px] text-negative block">Stop Loss</span>
                        <span className="font-mono text-xs text-negative">${tip.targets.stopLoss.toFixed(2)}</span>
                      </div>
                      <div className="p-2 rounded bg-card border border-border">
                        <span className="text-[9px] text-positive block">Target 1</span>
                        <span className="font-mono text-xs text-positive">${tip.targets.target1.toFixed(2)}</span>
                      </div>
                      <div className="p-2 rounded bg-card border border-border">
                        <span className="text-[9px] text-positive block">Target 2</span>
                        <span className="font-mono text-xs text-positive">${tip.targets.target2.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* View Full Analysis Link */}
                    <Link
                      href={`/stock/${tip.ticker}`}
                      className="flex items-center gap-1 text-xs text-accent hover:underline"
                    >
                      View full chart & analysis
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
