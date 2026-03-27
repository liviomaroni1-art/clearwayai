"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatPL, formatPercent } from "@/lib/utils";
import Link from "next/link";
import {
  Wallet, TrendingUp, TrendingDown, PieChart, AlertTriangle, Target,
  DollarSign, Briefcase, Shield, Zap, ChevronDown, ChevronUp,
  BarChart3, Globe, ArrowUpRight, ArrowDownRight, RefreshCw, Activity,
} from "lucide-react";
import {
  PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

const COLORS = ["#38bdf8","#a78bfa","#f59e0b","#22c55e","#ef4444","#ec4899","#06b6d4","#f97316","#8b5cf6","#14b8a6","#64748b"];

function convictionColor(score: number) {
  if (score >= 75) return "#22c55e";
  if (score >= 60) return "#38bdf8";
  if (score >= 40) return "#f59e0b";
  if (score >= 25) return "#f97316";
  return "#ef4444";
}

function recBadgeVariant(rec: string): "positive" | "negative" | "warning" | "outline" {
  if (rec === "Strong Buy") return "positive";
  if (rec === "Buy") return "positive";
  if (rec === "Hold") return "warning";
  if (rec === "Reduce") return "negative";
  if (rec === "Sell") return "negative";
  return "outline";
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTicker, setExpandedTicker] = useState<string | null>(null);
  const [tab, setTab] = useState<"overview" | "positions" | "ideas" | "risk">("overview");
  const [syncing, setSyncing] = useState(false);

  const fetchAnalysis = useCallback(async () => {
    try {
      const res = await fetch("/api/analysis");
      const json = await res.json();
      if (json.error) setError(json.error);
      else setData(json);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAnalysis(); }, [fetchAnalysis]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/ibkr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync" }),
      });
      const result = await res.json();
      if (!result.error) {
        setLoading(true);
        await fetchAnalysis();
      }
    } catch {}
    setSyncing(false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({length:4}).map((_,i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Card><CardContent className="p-8 text-center">
        <p className="text-negative mb-2">Analysis failed</p>
        <p className="text-sm text-muted-foreground">{error || "No data"}</p>
        <Button onClick={() => { setLoading(true); setError(null); fetchAnalysis(); }} className="mt-4">Retry</Button>
      </CardContent></Card>
    );
  }

  const s = data.summary;
  const alloc = data.allocation;
  const factors = data.factor_exposures;
  const risk = data.risk;
  const holdings = data.holdings || [];
  const ideas = data.ideas || { top_buys: [], top_sells: [] };
  const explanations = data.explanations || {};
  const isUp = s.unrealized_pnl_value >= 0;

  const radarData = [
    { factor: "Value", score: factors.value },
    { factor: "Growth", score: factors.growth },
    { factor: "Quality", score: factors.quality },
    { factor: "Momentum", score: factors.momentum },
    { factor: "Risk", score: factors.risk },
  ];

  const sectorPie = (alloc.by_sector || []).map((x: any) => ({ name: x.sector, value: x.weight_pct }));
  const regionPie = (alloc.by_region || []).map((x: any) => ({ name: x.region, value: x.weight_pct }));
  if (s.cash_percentage > 0.5) {
    sectorPie.push({ name: "Cash", value: s.cash_percentage });
    regionPie.push({ name: "Cash", value: s.cash_percentage });
  }

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "positions" as const, label: `Positions (${holdings.length})` },
    { id: "ideas" as const, label: "Trade Ideas" },
    { id: "risk" as const, label: "Risk & Factors" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" />
            Portfolio Analyst
          </h1>
          <p className="text-sm text-muted-foreground">Institutional-grade portfolio analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSync} disabled={syncing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Syncing..." : "IBKR Sync"}
          </Button>
          <Link href="/transactions"><Button variant="outline" size="sm"><Wallet className="h-4 w-4 mr-2" />Account</Button></Link>
        </div>
      </div>

      {/* AI Summary */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-foreground leading-relaxed">{s.comment}</p>
              {(explanations.missing_exposures || []).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(explanations.missing_exposures || []).map((m: string, i: number) => (
                    <Badge key={i} variant="warning" className="text-[10px]">{m}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total AUM", value: formatCurrency(s.total_value), icon: Briefcase, color: "text-foreground" },
          { label: "Cash", value: `${formatCurrency(s.cash_value)} (${s.cash_percentage.toFixed(1)}%)`, icon: Wallet, color: "text-accent" },
          { label: "Unrealized P&L", value: formatPL(s.unrealized_pnl_value), icon: isUp ? TrendingUp : TrendingDown, color: isUp ? "text-positive" : "text-negative" },
          { label: "P&L %", value: formatPercent(s.unrealized_pnl_percentage), icon: Activity, color: isUp ? "text-positive" : "text-negative" },
          { label: "Diversification", value: `${s.diversification_score}/100`, icon: PieChart, color: s.diversification_score > 50 ? "text-positive" : "text-warning" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className={`h-3.5 w-3.5 ${color}`} />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
              </div>
              <p className={`font-mono text-lg font-bold ${color}`}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-card rounded-lg p-1 border border-border">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === t.id ? "bg-accent/15 text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
          >{t.label}</button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sector Allocation */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><PieChart className="h-4 w-4 text-accent" />Sector Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie data={sectorPie} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                      {sectorPie.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      return <div className="bg-card border border-border rounded p-2 text-xs font-mono">
                        {payload[0].name}: {(payload[0].value as number).toFixed(1)}%
                      </div>;
                    }} />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 mt-2">
                {sectorPie.map((s: any, i: number) => (
                  <div key={s.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-muted-foreground">{s.name}</span>
                    </div>
                    <span className="font-mono text-foreground">{s.value.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Region Allocation */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Globe className="h-4 w-4 text-accent" />Geographic Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie data={regionPie} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                      {regionPie.map((_: any, i: number) => <Cell key={i} fill={COLORS[(i + 3) % COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      return <div className="bg-card border border-border rounded p-2 text-xs font-mono">
                        {payload[0].name}: {(payload[0].value as number).toFixed(1)}%
                      </div>;
                    }} />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 mt-2">
                {regionPie.map((r: any, i: number) => (
                  <div key={r.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: COLORS[(i + 3) % COLORS.length] }} />
                      <span className="text-muted-foreground">{r.name}</span>
                    </div>
                    <span className="font-mono text-foreground">{r.value.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Health */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Shield className="h-4 w-4 text-accent" />Portfolio Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(explanations.portfolio_health_summary || []).map((b: string, i: number) => (
                <p key={i} className="text-xs text-foreground/80 leading-relaxed">{b}</p>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2 rounded border border-border text-center">
                  <p className="text-[9px] text-muted-foreground uppercase">Positions</p>
                  <p className="font-mono text-lg font-bold text-foreground">{holdings.length}</p>
                </div>
                <div className="p-2 rounded border border-border text-center">
                  <p className="text-[9px] text-muted-foreground uppercase">Risk Alerts</p>
                  <p className={`font-mono text-lg font-bold ${risk.risk_flags.length === 0 ? "text-positive" : "text-negative"}`}>{risk.risk_flags.length}</p>
                </div>
              </div>
              {risk.risk_flags.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  {risk.risk_flags.map((f: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <AlertTriangle className="h-3 w-3 text-warning mt-0.5 shrink-0" />
                      <span className="text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* POSITIONS TAB */}
      {tab === "positions" && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["Ticker","Price","Value","P&L","Weight","AI Score","Signal","Tags"].map(h => (
                      <th key={h} className="p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h: any) => (
                    <>
                      <tr key={h.ticker} className="border-b border-border/50 hover:bg-card/50 cursor-pointer transition-colors"
                        onClick={() => setExpandedTicker(expandedTicker === h.ticker ? null : h.ticker)}>
                        <td className="p-3">
                          <Link href={`/stock/${h.ticker}`} className="font-mono font-semibold text-foreground hover:text-accent" onClick={e => e.stopPropagation()}>
                            {h.ticker}
                          </Link>
                          <div className="text-[10px] text-muted-foreground">{h.name}</div>
                          <div className="text-[10px] text-muted-foreground">{h.sector} · {h.country}</div>
                        </td>
                        <td className="p-3 font-mono text-sm text-foreground">
                          ${h.current_price.toFixed(2)}
                          <div className="text-[10px] text-muted-foreground">{h.quantity} shares</div>
                        </td>
                        <td className="p-3 font-mono text-sm text-foreground">{formatCurrency(h.market_value)}</td>
                        <td className={`p-3 font-mono text-sm ${h.unrealized_pnl_value >= 0 ? "text-positive" : "text-negative"}`}>
                          {formatPL(h.unrealized_pnl_value)}
                          <div className="text-[10px]">{formatPercent(h.unrealized_pnl_pct)}</div>
                        </td>
                        <td className="p-3 font-mono text-sm text-muted-foreground">
                          {(data.summary.total_value > 0 ? (h.market_value / data.summary.total_value) * 100 : 0).toFixed(1)}%
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="font-mono text-sm font-bold" style={{ color: convictionColor(h.ai_conviction_score) }}>
                              {h.ai_conviction_score}
                            </div>
                            <div className="w-12 h-1.5 rounded-full bg-border overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${h.ai_conviction_score}%`, backgroundColor: convictionColor(h.ai_conviction_score) }} />
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant={recBadgeVariant(h.recommendation)} className="text-[10px]">{h.recommendation}</Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            {(h.tags || []).map((t: string) => (
                              <Badge key={t} variant="outline" className="text-[9px]">{t}</Badge>
                            ))}
                          </div>
                        </td>
                      </tr>
                      {expandedTicker === h.ticker && (
                        <tr key={h.ticker + "-detail"} className="bg-background">
                          <td colSpan={8} className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">AI Assessment</p>
                                <p className="text-sm text-foreground">{h.comment}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Factor Scores</p>
                                <div className="grid grid-cols-3 gap-2">
                                  {Object.entries(h.factor_scores || {}).map(([k, v]) => (
                                    <div key={k} className="text-center p-1.5 rounded border border-border">
                                      <p className="text-[9px] text-muted-foreground uppercase">{k}</p>
                                      <p className="font-mono text-sm font-bold" style={{ color: (v as number) > 60 ? "#22c55e" : (v as number) > 40 ? "#f59e0b" : "#ef4444" }}>
                                        {v as number}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TRADE IDEAS TAB */}
      {tab === "ideas" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2"><ArrowUpRight className="h-4 w-4 text-positive" />Top Buy Ideas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ideas.top_buys.length === 0 ? (
                <p className="text-sm text-muted-foreground">No strong buy signals in current holdings.</p>
              ) : ideas.top_buys.map((b: any) => (
                <div key={b.ticker} className="p-3 rounded-lg border border-positive/20 bg-positive/5">
                  <div className="flex items-center justify-between mb-1">
                    <Link href={`/stock/${b.ticker}`} className="font-mono font-bold text-foreground hover:text-accent">{b.ticker}</Link>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-muted-foreground">{b.current_weight_pct.toFixed(1)}%</span>
                      <span className="text-muted-foreground">&rarr;</span>
                      <span className="text-positive font-semibold">{b.suggested_target_weight_pct.toFixed(1)}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/80">{b.rationale}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Risk: {b.key_risks}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2"><ArrowDownRight className="h-4 w-4 text-negative" />Reduce / Exit Ideas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ideas.top_sells.length === 0 ? (
                <p className="text-sm text-muted-foreground">No sell signals in current holdings.</p>
              ) : ideas.top_sells.map((s: any) => (
                <div key={s.ticker} className="p-3 rounded-lg border border-negative/20 bg-negative/5">
                  <div className="flex items-center justify-between mb-1">
                    <Link href={`/stock/${s.ticker}`} className="font-mono font-bold text-foreground hover:text-accent">{s.ticker}</Link>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-muted-foreground">{s.current_weight_pct.toFixed(1)}%</span>
                      <span className="text-muted-foreground">&rarr;</span>
                      <span className="text-negative font-semibold">{s.suggested_target_weight_pct.toFixed(1)}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/80">{s.rationale}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Risk: {s.key_risks}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* RISK & FACTORS TAB */}
      {tab === "risk" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Factor Radar */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4 text-accent" />Factor Exposures</CardTitle>
              <CardDescription className="text-xs">{factors.comment}</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="factor" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: "#64748b" }} />
                    <Radar dataKey="score" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Risk Metrics */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Shield className="h-4 w-4 text-accent" />Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Annualized Volatility", value: `${risk.volatility_annualized.toFixed(1)}%`, warn: risk.volatility_annualized > 30 },
                { label: "Beta vs S&P 500", value: risk.beta_vs_benchmark.toFixed(2), warn: risk.beta_vs_benchmark > 1.5 },
                { label: "Top 10 Concentration", value: `${risk.concentration_top10_pct.toFixed(1)}%`, warn: risk.concentration_top10_pct > 80 },
                { label: "Largest Position", value: `${risk.largest_single_position_pct.toFixed(1)}%`, warn: risk.largest_single_position_pct > 20 },
              ].map(({ label, value, warn }) => (
                <div key={label} className="flex items-center justify-between p-2.5 rounded-lg border border-border">
                  <span className="text-sm text-foreground">{label}</span>
                  <span className={`font-mono text-sm font-semibold ${warn ? "text-warning" : "text-foreground"}`}>{value}</span>
                </div>
              ))}
              {risk.risk_flags.length > 0 && (
                <div className="pt-2 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Risk Flags</p>
                  {risk.risk_flags.map((f: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <AlertTriangle className="h-3 w-3 text-warning mt-0.5 shrink-0" />
                      <span className="text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
