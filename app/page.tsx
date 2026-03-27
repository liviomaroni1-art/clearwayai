"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatPL, formatPercent } from "@/lib/utils";
import Link from "next/link";
import {
  Wallet, TrendingUp, TrendingDown, PieChart as PieChartIcon, AlertTriangle,
  Target, Briefcase, Shield, Zap, ChevronRight,
  BarChart3, Activity, ArrowUpRight, ArrowDownRight, Eye, Crosshair,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";

interface Analysis {
  summary: { total_value: number; cash_value: number; cash_percentage: number; unrealized_pnl_value: number; unrealized_pnl_percentage: number; diversification_score: number; comment: string };
  allocation: { by_region: { region: string; weight_pct: number }[]; by_country: { country: string; weight_pct: number }[]; by_sector: { sector: string; weight_pct: number }[]; by_asset_type: { asset_type: string; weight_pct: number }[]; by_currency: { currency: string; weight_pct: number }[] };
  factor_exposures: { value: number; growth: number; quality: number; momentum: number; size: number; dividend_yield: number; risk: number; comment: string };
  risk: { volatility_annualized: number; max_drawdown_pct: number; beta_vs_benchmark: number; concentration_top10_pct: number; largest_single_position_pct: number; risk_flags: string[] };
  holdings: { ticker: string; name: string; asset_type: string; region: string; country: string; sector: string; currency: string; quantity: number; average_cost: number; current_price: number; market_value: number; unrealized_pnl_value: number; unrealized_pnl_pct: number; income_yield_pct: number; factor_scores: { value: number; growth: number; quality: number; momentum: number; dividend_yield: number; risk: number }; ai_conviction_score: number; recommendation: string; time_horizon: string; tags: string[]; comment: string }[];
  ideas: { top_buys: { ticker: string; current_weight_pct: number; suggested_target_weight_pct: number; rationale: string; key_risks: string }[]; top_sells: { ticker: string; current_weight_pct: number; suggested_target_weight_pct: number; rationale: string; key_risks: string }[] };
  target_allocation: { by_region: { region: string; target_min_pct: number; target_max_pct: number; comment: string }[]; by_sector: { sector: string; target_min_pct: number; target_max_pct: number; comment: string }[] };
  explanations: { portfolio_health_summary: string[]; key_risks_and_concentrations: string[]; missing_exposures?: string[]; notes_for_dashboard: string[] };
}

const COLORS = ["#38bdf8", "#a78bfa", "#f59e0b", "#22c55e", "#ef4444", "#ec4899", "#06b6d4", "#f97316", "#8b5cf6", "#14b8a6", "#64748b"];

function getRecColor(rec: string) {
  switch (rec) { case "Strong Buy": return "#22c55e"; case "Buy": return "#38bdf8"; case "Hold": return "#f59e0b"; case "Reduce": return "#f97316"; case "Sell": return "#ef4444"; default: return "#64748b"; }
}

export default function DashboardPage() {
  const [data, setData] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedHolding, setExpandedHolding] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "holdings" | "ideas" | "risk">("overview");

  const fetchData = useCallback(async () => {
    try { const res = await fetch("/api/analysis"); const json = await res.json(); if (!json.error) setData(json); } catch (err) { console.error(err); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) return (<div className="space-y-6"><Skeleton className="h-10 w-64" /><div className="grid grid-cols-2 lg:grid-cols-5 gap-4">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div><Skeleton className="h-96 rounded-xl" /></div>);
  if (!data) return <Card><CardContent className="p-8 text-center text-muted-foreground">Failed to load analysis. Refresh to retry.</CardContent></Card>;

  const s = data.summary;
  const tabs = [{ id: "overview" as const, label: "Overview", icon: BarChart3 }, { id: "holdings" as const, label: "Positions", icon: Briefcase }, { id: "ideas" as const, label: "Trade Ideas", icon: Crosshair }, { id: "risk" as const, label: "Risk & Factors", icon: Shield }];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div><h1 className="font-sans text-2xl font-bold text-foreground flex items-center gap-2"><Shield className="h-6 w-6 text-accent" />Portfolio Analyst</h1><p className="text-sm text-muted-foreground mt-1">IBKR Account — Institutional Analysis</p></div>
        <div className="flex items-center gap-2"><Link href="/transactions"><Button variant="outline" size="sm"><Wallet className="h-4 w-4 mr-2" />Account</Button></Link><Button variant="outline" size="sm" onClick={() => { setLoading(true); fetchData(); }}><Activity className="h-4 w-4 mr-2" />Refresh</Button></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Total Value", value: formatCurrency(s.total_value), icon: Briefcase, color: "text-foreground" },
          { label: "Cash", value: `${formatCurrency(s.cash_value)} (${s.cash_percentage.toFixed(1)}%)`, icon: Wallet, color: "text-accent" },
          { label: "Unrealized P&L", value: `${formatPL(s.unrealized_pnl_value)} (${formatPercent(s.unrealized_pnl_percentage)})`, icon: s.unrealized_pnl_value >= 0 ? TrendingUp : TrendingDown, color: s.unrealized_pnl_value >= 0 ? "text-positive" : "text-negative" },
          { label: "Diversification", value: `${s.diversification_score}/100`, icon: PieChartIcon, color: s.diversification_score > 60 ? "text-positive" : s.diversification_score > 40 ? "text-warning" : "text-negative" },
          { label: "Positions", value: String(data.holdings.length), icon: Target, color: "text-foreground" },
        ].map(({ label, value, icon: Icon, color }) => (<Card key={label}><CardContent className="p-3"><div className="flex items-center gap-1.5 mb-1"><Icon className={`h-3.5 w-3.5 ${color}`} /><span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span></div><p className={`font-mono text-sm font-bold ${color}`}>{value}</p></CardContent></Card>))}
      </div>

      <Card className="border-accent/20 bg-accent/5"><CardContent className="p-4"><div className="flex items-start gap-3"><Zap className="h-5 w-5 text-accent shrink-0 mt-0.5" /><div><h3 className="font-sans font-semibold text-foreground text-sm mb-1">AI Portfolio Assessment</h3><p className="text-sm text-foreground/90">{s.comment}</p>
        {data.explanations.missing_exposures && data.explanations.missing_exposures.length > 0 && (<div className="mt-2 space-y-1">{data.explanations.missing_exposures.map((e, i) => (<p key={i} className="text-xs text-warning flex items-center gap-1.5"><AlertTriangle className="h-3 w-3 shrink-0" />{e}</p>))}</div>)}
      </div></div></CardContent></Card>

      {data.risk.risk_flags.length > 0 && (<Card className="border-warning/30"><CardContent className="p-3"><div className="space-y-1.5">{data.risk.risk_flags.map((f, i) => (<div key={i} className="flex items-start gap-2 text-sm"><span className="text-warning shrink-0">⚠</span><span className="text-foreground/80">{f}</span></div>))}</div></CardContent></Card>)}

      <div className="flex items-center gap-1 bg-card rounded-lg p-1 border border-border overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (<button key={id} onClick={() => setActiveTab(id)} className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-md transition-colors whitespace-nowrap ${activeTab === id ? "bg-accent/15 text-accent font-medium" : "text-muted-foreground hover:text-foreground"}`}><Icon className="h-4 w-4" />{label}</button>))}
      </div>

      {activeTab === "overview" && (<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Sector Allocation</CardTitle></CardHeader><CardContent>
          <div style={{ height: 180 }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data.allocation.by_sector} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="weight_pct" nameKey="sector">{data.allocation.by_sector.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip content={({ active, payload }) => { if (!active || !payload?.length) return null; return <div className="bg-card border border-border rounded p-2 text-xs font-mono"><span className="text-foreground">{payload[0].name}: </span><span className="text-accent">{(payload[0].value as number).toFixed(1)}%</span></div>; }} /></PieChart></ResponsiveContainer></div>
          <div className="space-y-1 mt-1">{data.allocation.by_sector.map((sec, i) => (<div key={sec.sector} className="flex items-center justify-between text-xs"><div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} /><span className="text-muted-foreground">{sec.sector}</span></div><span className="font-mono text-foreground">{sec.weight_pct.toFixed(1)}%</span></div>))}</div>
        </CardContent></Card>

        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Geographic & Asset Allocation</CardTitle></CardHeader><CardContent className="space-y-4">
          <div><p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">By Region</p>{data.allocation.by_region.map((r, i) => (<div key={r.region} className="flex items-center justify-between py-1"><div className="flex items-center gap-2"><div className="h-2 w-2 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} /><span className="text-xs text-muted-foreground">{r.region}</span></div><div className="flex items-center gap-2"><div className="h-1.5 bg-border rounded-full w-16"><div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(100, r.weight_pct)}%` }} /></div><span className="font-mono text-xs text-foreground w-12 text-right">{r.weight_pct.toFixed(1)}%</span></div></div>))}</div>
          <div className="border-t border-border pt-3"><p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">By Asset Type</p>{data.allocation.by_asset_type.map(a => (<div key={a.asset_type} className="flex items-center justify-between py-1"><span className="text-xs text-muted-foreground">{a.asset_type}</span><span className="font-mono text-xs text-foreground">{a.weight_pct.toFixed(1)}%</span></div>))}</div>
        </CardContent></Card>

        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Target vs Actual (Sector)</CardTitle></CardHeader><CardContent><div className="space-y-2">
          {data.target_allocation.by_sector.slice(0, 8).map(t => { const actual = data.allocation.by_sector.find(sec => sec.sector === t.sector)?.weight_pct || 0; const inRange = actual >= t.target_min_pct && actual <= t.target_max_pct; return (<div key={t.sector}><div className="flex items-center justify-between text-xs mb-0.5"><span className="text-muted-foreground">{t.sector}</span><div className="flex items-center gap-2"><span className={`font-mono ${inRange ? "text-positive" : "text-warning"}`}>{actual.toFixed(1)}%</span><span className="text-[10px] text-muted-foreground">({t.target_min_pct}–{t.target_max_pct}%)</span></div></div><div className="h-1.5 bg-border rounded-full"><div className="h-full rounded-full" style={{ width: `${Math.min(100, (actual / Math.max(t.target_max_pct, 1)) * 100)}%`, backgroundColor: inRange ? "#22c55e" : actual < t.target_min_pct ? "#f59e0b" : "#ef4444" }} /></div></div>); })}
        </div></CardContent></Card>
      </div>)}

      {activeTab === "holdings" && (<Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-border">{["Instrument", "Qty", "Avg Cost", "Price", "Mkt Value", "P&L", "P&L %", "AI Score", "Signal"].map(h => (<th key={h} className="p-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider text-right first:text-left">{h}</th>))}</tr></thead>
        <tbody>{data.holdings.map(h => (<tr key={h.ticker} className="border-b border-border/50 hover:bg-card/50 transition-colors cursor-pointer" onClick={() => setExpandedHolding(expandedHolding === h.ticker ? null : h.ticker)}>
          <td className="p-3 text-left"><div className="flex items-center gap-2"><Link href={`/stock/${h.ticker}`} className="font-mono font-bold text-foreground hover:text-accent" onClick={e => e.stopPropagation()}>{h.ticker}</Link><div className="flex gap-1">{h.tags.slice(0, 2).map(t => <Badge key={t} variant="outline" className="text-[8px] py-0 px-1">{t}</Badge>)}</div></div><span className="text-[10px] text-muted-foreground">{h.name}</span></td>
          <td className="p-3 font-mono text-xs text-right">{h.quantity}</td><td className="p-3 font-mono text-xs text-right">${h.average_cost.toFixed(2)}</td><td className="p-3 font-mono text-xs text-right">${h.current_price.toFixed(2)}</td><td className="p-3 font-mono text-xs text-right">{formatCurrency(h.market_value)}</td>
          <td className={`p-3 font-mono text-xs text-right ${h.unrealized_pnl_value >= 0 ? "text-positive" : "text-negative"}`}>{formatPL(h.unrealized_pnl_value)}</td>
          <td className={`p-3 font-mono text-xs text-right ${h.unrealized_pnl_pct >= 0 ? "text-positive" : "text-negative"}`}>{formatPercent(h.unrealized_pnl_pct)}</td>
          <td className="p-3 text-right"><div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold" style={{ backgroundColor: getRecColor(h.recommendation) + "15", color: getRecColor(h.recommendation) }}>{h.ai_conviction_score}</div></td>
          <td className="p-3 text-right"><Badge className="text-[10px] font-mono" style={{ backgroundColor: getRecColor(h.recommendation) + "20", color: getRecColor(h.recommendation), border: "none" }}>{h.recommendation}</Badge></td>
        </tr>))}</tbody></table></div>
        {expandedHolding && (() => { const h = data.holdings.find(x => x.ticker === expandedHolding); if (!h) return null; const factors = [{ name: "Value", value: h.factor_scores.value }, { name: "Growth", value: h.factor_scores.growth }, { name: "Quality", value: h.factor_scores.quality }, { name: "Momentum", value: h.factor_scores.momentum }, { name: "Dividend", value: h.factor_scores.dividend_yield }, { name: "Risk", value: h.factor_scores.risk }];
          return (<div className="p-4 border-t border-accent/20 bg-accent/5"><div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div><p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Factor Scores</p><div style={{ height: 160 }}><ResponsiveContainer width="100%" height="100%"><RadarChart data={factors}><PolarGrid stroke="#1e293b" /><PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} /><PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} /><Radar dataKey="value" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} /></RadarChart></ResponsiveContainer></div></div>
            <div><p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Analysis</p><p className="text-sm text-foreground">{h.comment}</p><div className="mt-3 space-y-1.5 text-xs"><div className="flex justify-between"><span className="text-muted-foreground">Sector</span><span className="text-foreground">{h.sector}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Region</span><span className="text-foreground">{h.region}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Asset Type</span><span className="text-foreground">{h.asset_type}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Yield</span><span className="text-foreground">{h.income_yield_pct.toFixed(2)}%</span></div></div></div>
            <div className="flex items-center justify-center"><Link href={`/stock/${h.ticker}`}><Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-2" />Full Chart & Analysis</Button></Link></div>
          </div></div>); })()}
      </CardContent></Card>)}

      {activeTab === "ideas" && (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-positive/20"><CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><ArrowUpRight className="h-4 w-4 text-positive" />Top Buy Ideas</CardTitle><CardDescription>High conviction — add or increase</CardDescription></CardHeader><CardContent>
          {data.ideas.top_buys.length === 0 ? <p className="text-sm text-muted-foreground py-4">No strong buy signals right now.</p> : (<div className="space-y-3">{data.ideas.top_buys.map(b => (<div key={b.ticker} className="p-3 rounded-lg border border-positive/20 bg-positive/5"><div className="flex items-center justify-between mb-1"><Link href={`/stock/${b.ticker}`} className="font-mono font-bold text-foreground hover:text-accent">{b.ticker}</Link><div className="flex items-center gap-2 font-mono text-xs"><span className="text-muted-foreground">{b.current_weight_pct.toFixed(1)}%</span><ChevronRight className="h-3 w-3 text-muted-foreground" /><span className="text-positive font-bold">{b.suggested_target_weight_pct.toFixed(1)}%</span></div></div><p className="text-xs text-foreground/80">{b.rationale}</p><p className="text-[10px] text-muted-foreground mt-1">Risk: {b.key_risks}</p></div>))}</div>)}
        </CardContent></Card>
        <Card className="border-negative/20"><CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><ArrowDownRight className="h-4 w-4 text-negative" />Positions to Reduce / Exit</CardTitle><CardDescription>Low conviction or elevated risk</CardDescription></CardHeader><CardContent>
          {data.ideas.top_sells.length === 0 ? <p className="text-sm text-muted-foreground py-4">No sell signals. All positions OK.</p> : (<div className="space-y-3">{data.ideas.top_sells.map(sell => (<div key={sell.ticker} className="p-3 rounded-lg border border-negative/20 bg-negative/5"><div className="flex items-center justify-between mb-1"><Link href={`/stock/${sell.ticker}`} className="font-mono font-bold text-foreground hover:text-accent">{sell.ticker}</Link><div className="flex items-center gap-2 font-mono text-xs"><span className="text-muted-foreground">{sell.current_weight_pct.toFixed(1)}%</span><ChevronRight className="h-3 w-3 text-muted-foreground" /><span className="text-negative font-bold">{sell.suggested_target_weight_pct.toFixed(1)}%</span></div></div><p className="text-xs text-foreground/80">{sell.rationale}</p><p className="text-[10px] text-muted-foreground mt-1">Risk: {sell.key_risks}</p></div>))}</div>)}
        </CardContent></Card>
      </div>)}

      {activeTab === "risk" && (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Factor Exposures</CardTitle></CardHeader><CardContent>
          <div style={{ height: 250 }}><ResponsiveContainer width="100%" height="100%"><RadarChart data={[{ factor: "Value", score: data.factor_exposures.value }, { factor: "Growth", score: data.factor_exposures.growth }, { factor: "Quality", score: data.factor_exposures.quality }, { factor: "Momentum", score: data.factor_exposures.momentum }, { factor: "Dividend", score: data.factor_exposures.dividend_yield }, { factor: "Risk", score: data.factor_exposures.risk }]}><PolarGrid stroke="#1e293b" /><PolarAngleAxis dataKey="factor" tick={{ fontSize: 11, fill: "#94a3b8" }} /><PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} /><Radar dataKey="score" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.25} strokeWidth={2} /></RadarChart></ResponsiveContainer></div>
          <p className="text-xs text-muted-foreground mt-2">{data.factor_exposures.comment}</p>
        </CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Risk Metrics</CardTitle></CardHeader><CardContent className="space-y-3">
          {[{ label: "Beta vs S&P 500", value: data.risk.beta_vs_benchmark.toFixed(2), warn: data.risk.beta_vs_benchmark > 1.3 }, { label: "Est. Annualized Vol", value: `${data.risk.volatility_annualized.toFixed(1)}%`, warn: data.risk.volatility_annualized > 25 }, { label: "Max Position Drawdown", value: `${data.risk.max_drawdown_pct.toFixed(1)}%`, warn: data.risk.max_drawdown_pct < -20 }, { label: "Top Holdings Concentration", value: `${data.risk.concentration_top10_pct.toFixed(1)}%`, warn: data.risk.concentration_top10_pct > 90 }, { label: "Largest Position", value: `${data.risk.largest_single_position_pct.toFixed(1)}%`, warn: data.risk.largest_single_position_pct > 20 }].map(({ label, value, warn }) => (<div key={label} className="flex items-center justify-between p-2.5 rounded-lg border border-border"><span className="text-sm text-foreground">{label}</span><span className={`font-mono text-sm font-semibold ${warn ? "text-warning" : "text-foreground"}`}>{value}</span></div>))}
          {data.risk.risk_flags.length > 0 && (<div className="mt-3 pt-3 border-t border-border"><p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Risk Flags</p>{data.risk.risk_flags.map((f, i) => (<div key={i} className="flex items-start gap-2 py-1"><AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" /><span className="text-xs text-foreground/80">{f}</span></div>))}</div>)}
        </CardContent></Card>
      </div>)}
    </div>
  );
}
