"use client";

import { ScreenerStock } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Star } from "lucide-react";

interface Props {
  stocks: ScreenerStock[];
  loading: boolean;
}

export function WatchNowPanel({ stocks, loading }: Props) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Eye className="h-4 w-4 text-accent" />
            Watch Now
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-6 w-12 rounded" />
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
          <Eye className="h-4 w-4 text-accent" />
          Watch Now — Top Confluence Picks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {stocks.length === 0 ? (
          <p className="text-sm text-muted-foreground">Loading screener data...</p>
        ) : (
          <div className="space-y-2">
            {stocks.map((stock, idx) => (
              <div
                key={stock.ticker}
                className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-card/80 transition-colors"
              >
                <div className="flex items-center justify-center h-7 w-7 rounded bg-accent/10 text-accent font-mono text-xs font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-foreground">
                      {stock.ticker}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {stock.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {stock.confluenceReasons.join(" + ")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-foreground">
                    ${stock.price.toFixed(2)}
                  </span>
                  <Badge
                    variant={
                      stock.confluenceScore >= 8
                        ? "positive"
                        : stock.confluenceScore >= 5
                        ? "warning"
                        : "outline"
                    }
                  >
                    <Star className="h-3 w-3 mr-1" />
                    {stock.confluenceScore}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
