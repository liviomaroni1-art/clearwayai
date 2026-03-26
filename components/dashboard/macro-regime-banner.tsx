"use client";

import { MacroData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3 } from "lucide-react";

const regimeConfig = {
  Expansion: { color: "positive" as const, icon: TrendingUp, label: "EXPANSION" },
  "Late Cycle": { color: "warning" as const, icon: BarChart3, label: "LATE CYCLE" },
  Slowdown: { color: "warning" as const, icon: AlertTriangle, label: "SLOWDOWN" },
  Contraction: { color: "negative" as const, icon: TrendingDown, label: "CONTRACTION" },
};

interface Props {
  data: MacroData | null;
  loading: boolean;
}

export function MacroRegimeBanner({ data, loading }: Props) {
  if (loading || !data) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-96" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const config = regimeConfig[data.regime];
  const Icon = config.icon;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className={`flex items-center justify-center h-12 w-12 rounded-lg ${
            config.color === "positive" ? "bg-positive/10" :
            config.color === "warning" ? "bg-warning/10" : "bg-negative/10"
          }`}>
            <Icon className={`h-6 w-6 ${
              config.color === "positive" ? "text-positive" :
              config.color === "warning" ? "text-warning" : "text-negative"
            }`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-sans font-semibold text-foreground">Macro Regime</span>
              <Badge variant={config.color}>{config.label}</Badge>
              <span className="font-mono text-sm text-muted-foreground">
                Score: {data.compositeScore.toFixed(1)}/10
              </span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground font-mono">
              {data.gdpGrowth !== null && <span>GDP: {data.gdpGrowth.toFixed(1)}%</span>}
              {data.unemployment !== null && <span>Unemp: {data.unemployment.toFixed(1)}%</span>}
              {data.fedFunds !== null && <span>Fed: {data.fedFunds.toFixed(2)}%</span>}
              {data.cpiYoY !== null && <span>CPI: {data.cpiYoY.toFixed(1)}</span>}
              {data.consumerSentiment !== null && <span>Sentiment: {data.consumerSentiment.toFixed(1)}</span>}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="text-xs text-muted-foreground">Favored:</span>
              {data.favoriteSectors.map((s) => (
                <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
