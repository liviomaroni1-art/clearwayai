"use client";

import { useState, useEffect, useCallback } from "react";
import { MacroRegimeBanner } from "@/components/dashboard/macro-regime-banner";
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary";
import { WatchNowPanel } from "@/components/dashboard/watch-now-panel";
import { PortfolioAlerts } from "@/components/dashboard/portfolio-alerts";
import { InvestmentTips } from "@/components/dashboard/investment-tips";
import { MacroData, Holding, ScreenerStock, PortfolioAlert } from "@/lib/types";

export default function DashboardPage() {
  const [macro, setMacro] = useState<MacroData | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [watchStocks, setWatchStocks] = useState<ScreenerStock[]>([]);
  const [alerts, setAlerts] = useState<PortfolioAlert[]>([]);
  const [prices, setPrices] = useState<Record<string, { price: number; change: number; changePercent: number }>>({});
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [refreshInterval, setRefreshInterval] = useState(60);

  const fetchData = useCallback(async () => {
    try {
      const [macroRes, portfolioRes, settingsRes] = await Promise.all([
        fetch("/api/macro"),
        fetch("/api/portfolio"),
        fetch("/api/settings"),
      ]);

      const macroData: MacroData = await macroRes.json();
      const portfolioData = await portfolioRes.json();
      const settingsData = await settingsRes.json();

      setMacro(macroData);
      setHoldings(portfolioData.holdings || []);
      setRefreshInterval(settingsData.refreshInterval || 60);

      // Fetch prices for holdings
      const holdingTickers = (portfolioData.holdings || []).map((h: Holding) => h.ticker);
      const priceMap: Record<string, { price: number; change: number; changePercent: number }> = {};

      for (const ticker of holdingTickers) {
        try {
          const res = await fetch(`/api/quote?ticker=${ticker}`);
          const data = await res.json();
          priceMap[ticker] = {
            price: data.price || 0,
            change: data.change || 0,
            changePercent: data.changePercent || 0,
          };
        } catch {}
      }
      setPrices(priceMap);

      // Fetch screener for watch list (first page)
      try {
        const screenerRes = await fetch("/api/screener?page=0&pageSize=50");
        const screenerData = await screenerRes.json();
        const stocks: ScreenerStock[] = screenerData.stocks || [];

        // Sort by confluence score desc and take top 10
        const sorted = stocks.sort((a, b) => b.confluenceScore - a.confluenceScore);
        setWatchStocks(sorted.slice(0, 10));

        // Generate portfolio alerts
        const stockMap = new Map(stocks.map(s => [s.ticker, s]));
        const totalValue = holdingTickers.reduce(
          (sum: number, t: string) => sum + ((priceMap[t]?.price || 0) * ((portfolioData.holdings || []).find((h: Holding) => h.ticker === t)?.shares || 0)),
          0
        );

        const alertList: PortfolioAlert[] = (portfolioData.holdings || []).map((h: Holding) => {
          const stock = stockMap.get(h.ticker);
          const score = stock?.confluenceScore ?? 5;
          const posValue = (priceMap[h.ticker]?.price || h.avgPrice) * h.shares;
          const positionPct = totalValue > 0 ? (posValue / totalValue) * 100 : 0;

          let signal: PortfolioAlert["signal"] = "HOLD";
          if (score === 10 && positionPct < 5) signal = "ADD_MORE";
          else if (score >= 6) signal = "HOLD";
          else if (score >= 3) signal = "REVIEW";
          else signal = "EXIT";

          return {
            ticker: h.ticker,
            signal,
            confluenceScore: score,
            reasons: stock?.confluenceReasons || [],
            positionPct,
          };
        });
        setAlerts(alertList);
      } catch {}

      setLoading(false);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setCountdown(refreshInterval);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchData();
          return refreshInterval;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [refreshInterval, fetchData]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-sans text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
          <div className="h-2 w-2 rounded-full bg-positive animate-pulse" />
          Refresh in {countdown}s
        </div>
      </div>

      <MacroRegimeBanner data={macro} loading={loading} />
      <PortfolioSummary holdings={holdings} prices={prices} loading={loading} />

      {/* Investment Tips - Full Width */}
      <InvestmentTips loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WatchNowPanel stocks={watchStocks} loading={loading} />
        <PortfolioAlerts alerts={alerts} loading={loading} />
      </div>
    </div>
  );
}
