"use client";

import { Holding } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatPL, formatPercent } from "@/lib/utils";
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

interface Props {
  holdings: Holding[];
  prices: Record<string, { price: number; change: number; changePercent: number }>;
  loading: boolean;
}

export function PortfolioSummary({ holdings, prices, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  let totalInvested = 0;
  let currentValue = 0;
  let todayChange = 0;

  for (const h of holdings) {
    totalInvested += h.shares * h.avgPrice;
    const p = prices[h.ticker];
    if (p) {
      currentValue += h.shares * p.price;
      todayChange += h.shares * p.change;
    } else {
      currentValue += h.shares * h.avgPrice;
    }
  }

  const totalPL = currentValue - totalInvested;
  const totalPLPct = totalInvested > 0 ? (totalPL / totalInvested) * 100 : 0;
  const todayPct = currentValue > 0 ? (todayChange / (currentValue - todayChange)) * 100 : 0;

  const stats = [
    {
      label: "Total Invested",
      value: formatCurrency(totalInvested),
      icon: PiggyBank,
      color: "text-muted-foreground",
    },
    {
      label: "Current Value",
      value: formatCurrency(currentValue),
      icon: DollarSign,
      color: "text-foreground",
    },
    {
      label: "Total P&L",
      value: `${formatPL(totalPL)} (${formatPercent(totalPLPct)})`,
      icon: totalPL >= 0 ? TrendingUp : TrendingDown,
      color: totalPL >= 0 ? "text-positive" : "text-negative",
    },
    {
      label: "Today's Change",
      value: `${formatPL(todayChange)} (${formatPercent(todayPct)})`,
      icon: todayChange >= 0 ? TrendingUp : TrendingDown,
      color: todayChange >= 0 ? "text-positive" : "text-negative",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-xs text-muted-foreground font-medium">
                  {stat.label}
                </span>
              </div>
              <p className={`font-mono text-lg font-semibold ${stat.color}`}>
                {stat.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
