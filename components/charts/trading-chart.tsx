"use client";

import { useMemo, useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
  BarChart,
  LineChart,
} from "recharts";

interface OHLCV {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ChartProps {
  data: OHLCV[];
  ma50?: number[];
  ma200?: number[];
  rsiData?: number[];
  ticker?: string;
  height?: number;
}

type TimeRange = "1W" | "1M" | "3M" | "6M" | "1Y" | "ALL";

function calculateMA(data: OHLCV[], period: number): (number | null)[] {
  return data.map((_, i) => {
    if (i < period - 1) return null;
    const slice = data.slice(i - period + 1, i + 1);
    return slice.reduce((sum, d) => sum + d.close, 0) / period;
  });
}

function calculateRSI(data: OHLCV[], period: number = 14): (number | null)[] {
  const result: (number | null)[] = new Array(data.length).fill(null);
  if (data.length < period + 1) return result;

  const changes: number[] = [];
  for (let i = 1; i < data.length; i++) {
    changes.push(data[i].close - data[i - 1].close);
  }

  let avgGain = 0, avgLoss = 0;
  for (let i = 0; i < period; i++) {
    if (changes[i] > 0) avgGain += changes[i];
    else avgLoss += Math.abs(changes[i]);
  }
  avgGain /= period;
  avgLoss /= period;

  for (let i = period; i < changes.length; i++) {
    const gain = changes[i] > 0 ? changes[i] : 0;
    const loss = changes[i] < 0 ? Math.abs(changes[i]) : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    result[i + 1] = 100 - (100 / (1 + rs));
  }
  return result;
}

function calculateBollingerBands(data: OHLCV[], period: number = 20, multiplier: number = 2) {
  return data.map((_, i) => {
    if (i < period - 1) return { upper: null, middle: null, lower: null };
    const slice = data.slice(i - period + 1, i + 1);
    const mean = slice.reduce((sum, d) => sum + d.close, 0) / period;
    const variance = slice.reduce((sum, d) => sum + Math.pow(d.close - mean, 2), 0) / period;
    const std = Math.sqrt(variance);
    return {
      upper: mean + multiplier * std,
      middle: mean,
      lower: mean - multiplier * std,
    };
  });
}

function calculateMACD(data: OHLCV[]) {
  const ema = (values: number[], period: number) => {
    const k = 2 / (period + 1);
    const result: number[] = [values[0]];
    for (let i = 1; i < values.length; i++) {
      result.push(values[i] * k + result[i - 1] * (1 - k));
    }
    return result;
  };

  const closes = data.map(d => d.close);
  const ema12 = ema(closes, 12);
  const ema26 = ema(closes, 26);
  const macdLine = ema12.map((v, i) => i >= 25 ? v - ema26[i] : 0);
  const signal = ema(macdLine.slice(25), 9);

  return data.map((_, i) => {
    if (i < 33) return { macd: null, signal: null, histogram: null };
    const macdVal = macdLine[i];
    const sigIdx = i - 25;
    const sigVal = sigIdx >= 0 && sigIdx < signal.length ? signal[sigIdx] : 0;
    return {
      macd: macdVal,
      signal: sigVal,
      histogram: macdVal - sigVal,
    };
  });
}

const CustomCandlestick = (props: any) => {
  const { x, y, width, height, payload } = props;
  if (!payload) return null;
  const { open, close, high, low } = payload;
  const isUp = close >= open;
  const color = isUp ? "#38bdf8" : "#ef4444";
  const bodyTop = Math.min(open, close);
  const bodyBottom = Math.max(open, close);

  const yScale = props.yScale || ((v: number) => y);

  return null; // We'll use bars instead for compatibility
};

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}`;
};

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export function TradingChart({ data, ticker, height = 500 }: ChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("3M");
  const [showMA50, setShowMA50] = useState(true);
  const [showMA200, setShowMA200] = useState(true);
  const [showBB, setShowBB] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [indicator, setIndicator] = useState<"RSI" | "MACD" | "NONE">("RSI");

  const filteredData = useMemo(() => {
    const now = new Date();
    let cutoff = new Date();
    switch (timeRange) {
      case "1W": cutoff.setDate(now.getDate() - 7); break;
      case "1M": cutoff.setMonth(now.getMonth() - 1); break;
      case "3M": cutoff.setMonth(now.getMonth() - 3); break;
      case "6M": cutoff.setMonth(now.getMonth() - 6); break;
      case "1Y": cutoff.setFullYear(now.getFullYear() - 1); break;
      case "ALL": cutoff = new Date(0); break;
    }
    return data.filter(d => new Date(d.date) >= cutoff);
  }, [data, timeRange]);

  const chartData = useMemo(() => {
    const ma50Values = calculateMA(data, 50);
    const ma200Values = calculateMA(data, 200);
    const rsiValues = calculateRSI(data);
    const bbValues = calculateBollingerBands(data);
    const macdValues = calculateMACD(data);

    const startIdx = data.length - filteredData.length;

    return filteredData.map((bar, i) => {
      const dataIdx = startIdx + i;
      const isUp = bar.close >= bar.open;
      return {
        date: bar.date,
        open: bar.open,
        high: bar.high,
        low: bar.low,
        close: bar.close,
        volume: bar.volume,
        // Candle body as stacked bars
        candleBase: Math.min(bar.open, bar.close),
        candleBody: Math.abs(bar.close - bar.open) || 0.01,
        wickHigh: bar.high,
        wickLow: bar.low,
        isUp,
        // Indicators
        ma50: ma50Values[dataIdx],
        ma200: ma200Values[dataIdx],
        rsi: rsiValues[dataIdx],
        bbUpper: bbValues[dataIdx]?.upper,
        bbMiddle: bbValues[dataIdx]?.middle,
        bbLower: bbValues[dataIdx]?.lower,
        macd: macdValues[dataIdx]?.macd,
        macdSignal: macdValues[dataIdx]?.signal,
        macdHist: macdValues[dataIdx]?.histogram,
        // Color-coded volume
        volColor: isUp ? "rgba(56, 189, 248, 0.3)" : "rgba(239, 68, 68, 0.3)",
      };
    });
  }, [data, filteredData]);

  const priceMin = useMemo(() => {
    const lows = chartData.map(d => d.low).filter(Boolean);
    return Math.min(...lows) * 0.99;
  }, [chartData]);

  const priceMax = useMemo(() => {
    const highs = chartData.map(d => d.high).filter(Boolean);
    return Math.max(...highs) * 1.01;
  }, [chartData]);

  const latestPrice = chartData.length > 0 ? chartData[chartData.length - 1] : null;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || payload.length === 0) return null;
    const d = payload[0]?.payload;
    if (!d) return null;
    return (
      <div className="bg-[#0a0a12] border border-[#1e293b] rounded-lg p-3 shadow-xl">
        <p className="text-xs text-[#94a3b8] font-mono mb-1">{d.date}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs font-mono">
          <span className="text-[#94a3b8]">O</span>
          <span className="text-[#e2e8f0] text-right">${d.open?.toFixed(2)}</span>
          <span className="text-[#94a3b8]">H</span>
          <span className="text-[#e2e8f0] text-right">${d.high?.toFixed(2)}</span>
          <span className="text-[#94a3b8]">L</span>
          <span className="text-[#e2e8f0] text-right">${d.low?.toFixed(2)}</span>
          <span className="text-[#94a3b8]">C</span>
          <span className={`text-right ${d.isUp ? "text-[#38bdf8]" : "text-[#ef4444]"}`}>${d.close?.toFixed(2)}</span>
          <span className="text-[#94a3b8]">Vol</span>
          <span className="text-[#e2e8f0] text-right">{(d.volume / 1e6).toFixed(1)}M</span>
        </div>
      </div>
    );
  };

  const timeRanges: TimeRange[] = ["1W", "1M", "3M", "6M", "1Y", "ALL"];
  const indicators: ("RSI" | "MACD" | "NONE")[] = ["RSI", "MACD", "NONE"];

  return (
    <div className="space-y-2">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Time Range */}
        <div className="flex items-center gap-1 bg-[#0a0a12] rounded-lg p-1 border border-[#1e293b]">
          {timeRanges.map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                timeRange === range
                  ? "bg-[#38bdf8]/20 text-[#38bdf8]"
                  : "text-[#64748b] hover:text-[#e2e8f0]"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Overlays */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMA50(!showMA50)}
            className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
              showMA50 ? "border-[#f59e0b] text-[#f59e0b] bg-[#f59e0b]/10" : "border-[#1e293b] text-[#64748b]"
            }`}
          >
            MA50
          </button>
          <button
            onClick={() => setShowMA200(!showMA200)}
            className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
              showMA200 ? "border-[#a78bfa] text-[#a78bfa] bg-[#a78bfa]/10" : "border-[#1e293b] text-[#64748b]"
            }`}
          >
            MA200
          </button>
          <button
            onClick={() => setShowBB(!showBB)}
            className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
              showBB ? "border-[#34d399] text-[#34d399] bg-[#34d399]/10" : "border-[#1e293b] text-[#64748b]"
            }`}
          >
            BB
          </button>
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
              showVolume ? "border-[#38bdf8] text-[#38bdf8] bg-[#38bdf8]/10" : "border-[#1e293b] text-[#64748b]"
            }`}
          >
            VOL
          </button>
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-1 bg-[#0a0a12] rounded-lg p-1 border border-[#1e293b]">
          {indicators.map(ind => (
            <button
              key={ind}
              onClick={() => setIndicator(ind)}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                indicator === ind
                  ? "bg-[#38bdf8]/20 text-[#38bdf8]"
                  : "text-[#64748b] hover:text-[#e2e8f0]"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Price Header */}
      {latestPrice && (
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-mono font-bold text-[#e2e8f0]">
            ${latestPrice.close.toFixed(2)}
          </span>
          <span className={`text-sm font-mono ${latestPrice.isUp ? "text-[#38bdf8]" : "text-[#ef4444]"}`}>
            {latestPrice.isUp ? "+" : ""}{(latestPrice.close - latestPrice.open).toFixed(2)} ({((latestPrice.close - latestPrice.open) / latestPrice.open * 100).toFixed(2)}%)
          </span>
        </div>
      )}

      {/* Main Price Chart */}
      <div style={{ height: height * 0.6 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 10, fill: "#64748b", fontFamily: "IBM Plex Mono" }}
              axisLine={{ stroke: "#1e293b" }}
              tickLine={{ stroke: "#1e293b" }}
              interval="preserveStartEnd"
              minTickGap={40}
            />
            <YAxis
              domain={[priceMin, priceMax]}
              tick={{ fontSize: 10, fill: "#64748b", fontFamily: "IBM Plex Mono" }}
              axisLine={{ stroke: "#1e293b" }}
              tickLine={{ stroke: "#1e293b" }}
              tickFormatter={(v) => `$${v.toFixed(0)}`}
              orientation="right"
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Bollinger Bands */}
            {showBB && (
              <>
                <Line type="monotone" dataKey="bbUpper" stroke="#34d399" strokeWidth={1} dot={false} strokeDasharray="4 2" opacity={0.5} />
                <Line type="monotone" dataKey="bbMiddle" stroke="#34d399" strokeWidth={1} dot={false} opacity={0.3} />
                <Line type="monotone" dataKey="bbLower" stroke="#34d399" strokeWidth={1} dot={false} strokeDasharray="4 2" opacity={0.5} />
              </>
            )}

            {/* Candle wicks as thin bars from low to high */}
            <Bar dataKey="high" fill="transparent" barSize={1}>
              {chartData.map((entry, index) => (
                <rect key={index} />
              ))}
            </Bar>

            {/* Price line (close) as area */}
            <Area
              type="monotone"
              dataKey="close"
              stroke="#38bdf8"
              strokeWidth={1.5}
              fill="url(#priceGradient)"
              fillOpacity={0.1}
            />

            {/* Moving Averages */}
            {showMA50 && (
              <Line type="monotone" dataKey="ma50" stroke="#f59e0b" strokeWidth={1.5} dot={false} connectNulls />
            )}
            {showMA200 && (
              <Line type="monotone" dataKey="ma200" stroke="#a78bfa" strokeWidth={1.5} dot={false} connectNulls />
            )}

            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      {showVolume && (
        <div style={{ height: height * 0.15 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 5, bottom: 0, left: 5 }}>
              <XAxis dataKey="date" hide />
              <YAxis
                tick={{ fontSize: 9, fill: "#64748b", fontFamily: "IBM Plex Mono" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1e6).toFixed(0)}M`}
                orientation="right"
                width={60}
              />
              <Bar dataKey="volume" fill="#38bdf8" opacity={0.3}>
                {chartData.map((entry, index) => (
                  <rect key={index} fill={entry.isUp ? "rgba(56, 189, 248, 0.3)" : "rgba(239, 68, 68, 0.3)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* RSI Indicator */}
      {indicator === "RSI" && (
        <div style={{ height: height * 0.2 }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[#64748b]">RSI(14)</span>
            {chartData.length > 0 && chartData[chartData.length - 1].rsi !== null && (
              <span className={`text-xs font-mono font-semibold ${
                (chartData[chartData.length - 1].rsi ?? 50) > 70 ? "text-[#ef4444]" :
                (chartData[chartData.length - 1].rsi ?? 50) < 30 ? "text-[#38bdf8]" : "text-[#e2e8f0]"
              }`}>
                {(chartData[chartData.length - 1].rsi ?? 0).toFixed(1)}
              </span>
            )}
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 5, bottom: 0, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
              <XAxis dataKey="date" hide />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: "#64748b", fontFamily: "IBM Plex Mono" }}
                axisLine={false}
                tickLine={false}
                ticks={[30, 50, 70]}
                orientation="right"
                width={60}
              />
              <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" opacity={0.5} />
              <ReferenceLine y={30} stroke="#38bdf8" strokeDasharray="3 3" opacity={0.5} />
              <ReferenceLine y={50} stroke="#64748b" strokeDasharray="3 3" opacity={0.3} />
              <Area type="monotone" dataKey="rsi" stroke="#a78bfa" strokeWidth={1.5} fill="url(#rsiGradient)" fillOpacity={0.2} connectNulls dot={false} />
              <defs>
                <linearGradient id="rsiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* MACD Indicator */}
      {indicator === "MACD" && (
        <div style={{ height: height * 0.2 }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[#64748b]">MACD(12,26,9)</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 0, right: 5, bottom: 0, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
              <XAxis dataKey="date" hide />
              <YAxis
                tick={{ fontSize: 9, fill: "#64748b", fontFamily: "IBM Plex Mono" }}
                axisLine={false}
                tickLine={false}
                orientation="right"
                width={60}
              />
              <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" opacity={0.5} />
              <Bar dataKey="macdHist" fill="#38bdf8" opacity={0.4}>
                {chartData.map((entry, index) => (
                  <rect key={index} fill={(entry.macdHist ?? 0) >= 0 ? "rgba(56, 189, 248, 0.4)" : "rgba(239, 68, 68, 0.4)"} />
                ))}
              </Bar>
              <Line type="monotone" dataKey="macd" stroke="#38bdf8" strokeWidth={1.5} dot={false} connectNulls />
              <Line type="monotone" dataKey="macdSignal" stroke="#f59e0b" strokeWidth={1.5} dot={false} connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
