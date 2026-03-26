"use client";

import { PortfolioAlert } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, ShieldCheck, AlertTriangle, XCircle, Rocket } from "lucide-react";

const signalConfig = {
  HOLD: {
    icon: ShieldCheck,
    label: "HOLD",
    emoji: "🟢",
    variant: "positive" as const,
  },
  REVIEW: {
    icon: AlertTriangle,
    label: "REVIEW",
    emoji: "🟡",
    variant: "warning" as const,
  },
  EXIT: {
    icon: XCircle,
    label: "EXIT",
    emoji: "🔴",
    variant: "negative" as const,
  },
  ADD_MORE: {
    icon: Rocket,
    label: "ADD MORE",
    emoji: "🚀",
    variant: "positive" as const,
  },
};

interface Props {
  alerts: PortfolioAlert[];
  loading: boolean;
}

export function PortfolioAlerts({ alerts, loading }: Props) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-warning" />
            Portfolio Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-40" />
              </div>
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
          <Bell className="h-4 w-4 text-warning" />
          Portfolio Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No holdings to analyze.</p>
        ) : (
          <div className="space-y-2">
            {alerts.map((alert) => {
              const config = signalConfig[alert.signal];
              return (
                <div
                  key={alert.ticker}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  <span className="text-lg">{config.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-foreground">
                        {alert.ticker}
                      </span>
                      <Badge variant={config.variant} className="text-xs">
                        {config.label}
                      </Badge>
                      <span className="font-mono text-xs text-muted-foreground">
                        Score: {alert.confluenceScore}/10
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {alert.reasons.length > 0
                        ? alert.reasons.join(" · ")
                        : alert.signal === "EXIT"
                        ? "Low confluence — consider reducing position"
                        : alert.signal === "REVIEW"
                        ? "Weakening signals — monitor closely"
                        : "Position healthy"}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {alert.positionPct.toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
