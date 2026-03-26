"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ScreenerStock } from "@/lib/types";
import { SP500_SECTORS } from "@/lib/sp500";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  formatCurrency,
  formatPercent,
  formatLargeNumber,
} from "@/lib/utils";
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

type SortField =
  | "ticker"
  | "price"
  | "rsi"
  | "ma50"
  | "ma200"
  | "pe"
  | "epsGrowth"
  | "marketCap"
  | "confluenceScore";

export default function ScreenerPage() {
  const [allStocks, setAllStocks] = useState<ScreenerStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Filters
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [rsiRange, setRsiRange] = useState<[number, number]>([0, 100]);
  const [minPE, setMinPE] = useState("");
  const [maxPE, setMaxPE] = useState("");
  const [minEpsGrowth, setMinEpsGrowth] = useState("");
  const [aboveMA50, setAboveMA50] = useState(false);
  const [aboveMA200, setAboveMA200] = useState(false);
  const [belowMA50, setBelowMA50] = useState(false);
  const [belowMA200, setBelowMA200] = useState(false);
  const [minMarketCap, setMinMarketCap] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Sort
  const [sortField, setSortField] = useState<SortField>("confluenceScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  // Pagination for display
  const [displayPage, setDisplayPage] = useState(0);
  const displayPageSize = 25;

  const fetchPage = useCallback(
    async (page: number) => {
      try {
        const res = await fetch(`/api/screener?page=${page}&pageSize=50`);
        const data = await res.json();
        if (data.stocks) {
          setAllStocks((prev) => {
            const existing = new Set(prev.map((s) => s.ticker));
            const newStocks = data.stocks.filter(
              (s: ScreenerStock) => !existing.has(s.ticker)
            );
            return [...prev, ...newStocks];
          });
          setTotalPages(Math.ceil(data.total / 50));
        }
      } catch (err) {
        console.error("Screener fetch error:", err);
      }
    },
    []
  );

  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      await fetchPage(0);
      setLoading(false);
    };
    loadInitial();
  }, [fetchPage]);

  const loadMore = async () => {
    const nextPage = loadingPage + 1;
    if (nextPage < totalPages) {
      setLoadingPage(nextPage);
      await fetchPage(nextPage);
    }
  };

  const filteredStocks = useMemo(() => {
    let result = [...allStocks];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.ticker.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q)
      );
    }

    if (selectedSectors.length > 0) {
      result = result.filter((s) => selectedSectors.includes(s.sector));
    }

    result = result.filter(
      (s) => s.rsi >= rsiRange[0] && s.rsi <= rsiRange[1]
    );

    if (minPE) result = result.filter((s) => s.pe >= parseFloat(minPE));
    if (maxPE) result = result.filter((s) => s.pe <= parseFloat(maxPE) && s.pe > 0);
    if (minEpsGrowth)
      result = result.filter((s) => s.epsGrowth >= parseFloat(minEpsGrowth));
    if (aboveMA50) result = result.filter((s) => s.ma50 > 0 && s.price > s.ma50);
    if (aboveMA200) result = result.filter((s) => s.ma200 > 0 && s.price > s.ma200);
    if (belowMA50) result = result.filter((s) => s.ma50 > 0 && s.price < s.ma50);
    if (belowMA200) result = result.filter((s) => s.ma200 > 0 && s.price < s.ma200);
    if (minMarketCap)
      result = result.filter(
        (s) => s.marketCap >= parseFloat(minMarketCap) * 1e9
      );

    // Sort
    result.sort((a, b) => {
      let aVal: number | string = a[sortField];
      let bVal: number | string = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return result;
  }, [
    allStocks,
    searchQuery,
    selectedSectors,
    rsiRange,
    minPE,
    maxPE,
    minEpsGrowth,
    aboveMA50,
    aboveMA200,
    belowMA50,
    belowMA200,
    minMarketCap,
    sortField,
    sortDir,
  ]);

  const paginatedStocks = useMemo(() => {
    const start = displayPage * displayPageSize;
    return filteredStocks.slice(start, start + displayPageSize);
  }, [filteredStocks, displayPage]);

  const totalDisplayPages = Math.ceil(filteredStocks.length / displayPageSize);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
    return sortDir === "asc" ? (
      <ArrowUp className="h-3 w-3 text-accent" />
    ) : (
      <ArrowDown className="h-3 w-3 text-accent" />
    );
  };

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector]
    );
    setDisplayPage(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-sans text-2xl font-bold text-foreground flex items-center gap-2">
          <Search className="h-6 w-6 text-accent" />
          Stock Screener
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-mono">
            {filteredStocks.length} / {allStocks.length} stocks
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          {loadingPage + 1 < totalPages && (
            <Button variant="outline" size="sm" onClick={loadMore}>
              Load More
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by ticker or name..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setDisplayPage(0);
          }}
          className="pl-10"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <Card className="lg:w-72 shrink-0">
            <CardContent className="p-4 space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-sans font-semibold text-sm">Filters</span>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="lg:hidden">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Sectors */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">Sectors</Label>
                <div className="flex flex-wrap gap-1.5">
                  {SP500_SECTORS.map((sector) => (
                    <Badge
                      key={sector}
                      variant={selectedSectors.includes(sector) ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => toggleSector(sector)}
                    >
                      {sector}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* RSI Range */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                  RSI Range: {rsiRange[0]} – {rsiRange[1]}
                </Label>
                <Slider
                  value={rsiRange}
                  onValueChange={(v) => {
                    setRsiRange(v as [number, number]);
                    setDisplayPage(0);
                  }}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>

              {/* P/E */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">P/E Ratio</Label>
                <div className="flex gap-2">
                  <Input placeholder="Min" value={minPE} onChange={(e) => { setMinPE(e.target.value); setDisplayPage(0); }} className="font-mono" />
                  <Input placeholder="Max" value={maxPE} onChange={(e) => { setMaxPE(e.target.value); setDisplayPage(0); }} className="font-mono" />
                </div>
              </div>

              {/* EPS Growth */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">Min EPS Growth %</Label>
                <Input placeholder="10" value={minEpsGrowth} onChange={(e) => { setMinEpsGrowth(e.target.value); setDisplayPage(0); }} className="font-mono" />
              </div>

              {/* MA Toggles */}
              <div className="space-y-3">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">Moving Averages</Label>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Above 50MA</Label>
                  <Switch checked={aboveMA50} onCheckedChange={(v) => { setAboveMA50(v); setDisplayPage(0); }} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Above 200MA</Label>
                  <Switch checked={aboveMA200} onCheckedChange={(v) => { setAboveMA200(v); setDisplayPage(0); }} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Below 50MA</Label>
                  <Switch checked={belowMA50} onCheckedChange={(v) => { setBelowMA50(v); setDisplayPage(0); }} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Below 200MA</Label>
                  <Switch checked={belowMA200} onCheckedChange={(v) => { setBelowMA200(v); setDisplayPage(0); }} />
                </div>
              </div>

              {/* Min Market Cap */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">Min Market Cap ($B)</Label>
                <Input placeholder="10" value={minMarketCap} onChange={(e) => { setMinMarketCap(e.target.value); setDisplayPage(0); }} className="font-mono" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Table */}
        <Card className="flex-1 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {[
                      { field: "ticker" as SortField, label: "Ticker", align: "left" },
                      { field: "price" as SortField, label: "Price", align: "right" },
                      { field: "rsi" as SortField, label: "RSI", align: "right" },
                      { field: "ma50" as SortField, label: "50MA", align: "right" },
                      { field: "ma200" as SortField, label: "200MA", align: "right" },
                      { field: "pe" as SortField, label: "P/E", align: "right" },
                      { field: "epsGrowth" as SortField, label: "EPS Gr%", align: "right" },
                      { field: "marketCap" as SortField, label: "Mkt Cap", align: "right" },
                      { field: "confluenceScore" as SortField, label: "Score", align: "right" },
                    ].map(({ field, label, align }) => (
                      <th
                        key={field}
                        className={`p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors ${
                          align === "right" ? "text-right" : "text-left"
                        }`}
                        onClick={() => toggleSort(field)}
                      >
                        <div className={`flex items-center gap-1 ${align === "right" ? "justify-end" : ""}`}>
                          {label}
                          <SortIcon field={field} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    [...Array(10)].map((_, i) => (
                      <tr key={i} className="border-b border-border/50">
                        {[...Array(9)].map((_, j) => (
                          <td key={j} className="p-3">
                            <Skeleton className="h-5 w-16" />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : paginatedStocks.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-muted-foreground">
                        No stocks match your filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedStocks.map((stock) => (
                      <tr key={stock.ticker} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                        <td className="p-3">
                          <div>
                            <Link href={`/stock/${stock.ticker}`} className="font-mono font-semibold text-foreground hover:text-accent transition-colors">{stock.ticker}</Link>
                            <div className="text-xs text-muted-foreground">{stock.sector}</div>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-right text-foreground">
                          ${stock.price.toFixed(2)}
                          <div className={`text-xs ${stock.changePercent >= 0 ? "text-positive" : "text-negative"}`}>
                            {formatPercent(stock.changePercent)}
                          </div>
                        </td>
                        <td className={`p-3 font-mono text-right ${
                          stock.rsi < 30 ? "text-positive" : stock.rsi > 70 ? "text-negative" : "text-foreground"
                        }`}>
                          {stock.rsi.toFixed(1)}
                        </td>
                        <td className="p-3 font-mono text-right text-muted-foreground">
                          ${stock.ma50.toFixed(2)}
                        </td>
                        <td className="p-3 font-mono text-right text-muted-foreground">
                          ${stock.ma200.toFixed(2)}
                        </td>
                        <td className="p-3 font-mono text-right text-foreground">
                          {stock.pe > 0 ? stock.pe.toFixed(1) : "—"}
                        </td>
                        <td className={`p-3 font-mono text-right ${
                          stock.epsGrowth > 0 ? "text-positive" : "text-negative"
                        }`}>
                          {formatPercent(stock.epsGrowth)}
                        </td>
                        <td className="p-3 font-mono text-right text-muted-foreground">
                          ${formatLargeNumber(stock.marketCap)}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-end gap-1.5">
                            <Badge
                              variant={
                                stock.confluenceScore >= 7 ? "positive" :
                                stock.confluenceScore >= 4 ? "warning" : "outline"
                              }
                            >
                              <Star className="h-3 w-3 mr-1" />
                              {stock.confluenceScore}
                            </Badge>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalDisplayPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-border">
                <span className="text-sm text-muted-foreground font-mono">
                  Page {displayPage + 1} of {totalDisplayPages}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={displayPage === 0}
                    onClick={() => setDisplayPage((p) => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={displayPage >= totalDisplayPages - 1}
                    onClick={() => setDisplayPage((p) => p + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
