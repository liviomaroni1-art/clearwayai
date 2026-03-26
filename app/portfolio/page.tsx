"use client";

import { useState, useEffect, useCallback } from "react";
import { Holding } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatPL, formatPercent, formatLargeNumber } from "@/lib/utils";
import { HoldingDialog } from "@/components/portfolio/holding-dialog";
import { SparklineChart } from "@/components/portfolio/sparkline-chart";
import { Plus, Pencil, Trash2, Briefcase } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface HoldingWithLive extends Holding {
  currentPrice: number;
  change: number;
  changePercent: number;
  totalValue: number;
  pl: number;
  plPercent: number;
  history: { date: string; close: number }[];
}

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [liveData, setLiveData] = useState<HoldingWithLive[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingHolding, setEditingHolding] = useState<Holding | null>(null);

  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      setHoldings(data.holdings || []);

      // Fetch live data for each
      const live: HoldingWithLive[] = [];
      for (const h of data.holdings || []) {
        try {
          const [quoteRes, histRes] = await Promise.all([
            fetch(`/api/quote?ticker=${h.ticker}`),
            fetch(`/api/history?ticker=${h.ticker}&days=7`),
          ]);
          const quote = await quoteRes.json();
          const history = await histRes.json();

          const currentPrice = quote.price || h.avgPrice;
          const totalValue = h.shares * currentPrice;
          const invested = h.shares * h.avgPrice;
          const pl = totalValue - invested;
          const plPercent = invested > 0 ? (pl / invested) * 100 : 0;

          live.push({
            ...h,
            currentPrice,
            change: quote.change || 0,
            changePercent: quote.changePercent || 0,
            totalValue,
            pl,
            plPercent,
            history: Array.isArray(history)
              ? history.map((b: any) => ({ date: b.date, close: b.close }))
              : [],
          });
        } catch {
          live.push({
            ...h,
            currentPrice: h.avgPrice,
            change: 0,
            changePercent: 0,
            totalValue: h.shares * h.avgPrice,
            pl: 0,
            plPercent: 0,
            history: [],
          });
        }
      }
      setLiveData(live);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const handleSave = async (holding: Omit<Holding, "id">, id?: string) => {
    const action = id ? "update" : "add";
    const full: Holding = { ...holding, id: id || uuidv4() };
    await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, holding: full }),
    });
    setDialogOpen(false);
    setEditingHolding(null);
    setLoading(true);
    fetchPortfolio();
  };

  const handleDelete = async (id: string) => {
    const holding = holdings.find((h) => h.id === id);
    if (!holding) return;
    await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", holding }),
    });
    setLoading(true);
    fetchPortfolio();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-sans text-2xl font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-accent" />
          Portfolio
        </h1>
        <Button
          onClick={() => {
            setEditingHolding(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Holding
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Ticker</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Shares</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Avg Price</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Current</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">P&L</th>
                  <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Today</th>
                  <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">7D</th>
                  <th className="p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-border/50">
                      {[...Array(9)].map((_, j) => (
                        <td key={j} className="p-4">
                          <Skeleton className="h-5 w-20" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : liveData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-muted-foreground">
                      No holdings yet. Click &quot;Add Holding&quot; to get started.
                    </td>
                  </tr>
                ) : (
                  liveData.map((h) => (
                    <tr key={h.id} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <span className="font-mono font-semibold text-foreground">{h.ticker}</span>
                          <div className="text-xs text-muted-foreground">{h.dateBought}</div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-right text-foreground">{h.shares}</td>
                      <td className="p-4 font-mono text-right text-foreground">${h.avgPrice.toFixed(2)}</td>
                      <td className="p-4 font-mono text-right text-foreground">${h.currentPrice.toFixed(2)}</td>
                      <td className="p-4 font-mono text-right text-foreground">{formatCurrency(h.totalValue)}</td>
                      <td className={`p-4 font-mono text-right ${h.pl >= 0 ? "text-positive" : "text-negative"}`}>
                        {formatPL(h.pl)}
                        <div className="text-xs">{formatPercent(h.plPercent)}</div>
                      </td>
                      <td className={`p-4 font-mono text-right ${h.change >= 0 ? "text-positive" : "text-negative"}`}>
                        {formatPL(h.change * h.shares)}
                        <div className="text-xs">{formatPercent(h.changePercent)}</div>
                      </td>
                      <td className="p-4">
                        <SparklineChart data={h.history} positive={h.pl >= 0} />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingHolding(h);
                              setDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(h.id)}
                          >
                            <Trash2 className="h-4 w-4 text-negative" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <HoldingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        holding={editingHolding}
        onSave={handleSave}
      />
    </div>
  );
}
