"use client";

import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";

interface MiniChartProps {
  data: { date: string; close: number }[];
  positive?: boolean;
  width?: number;
  height?: number;
}

export function MiniChart({ data, positive = true, width = 120, height = 40 }: MiniChartProps) {
  if (data.length < 2) {
    return <div style={{ width, height }} className="bg-[#0a0a12] rounded" />;
  }

  const minVal = Math.min(...data.map(d => d.close)) * 0.998;
  const maxVal = Math.max(...data.map(d => d.close)) * 1.002;
  const color = positive ? "#38bdf8" : "#ef4444";

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
          <defs>
            <linearGradient id={`miniGrad-${positive ? "up" : "down"}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis domain={[minVal, maxVal]} hide />
          <Area
            type="monotone"
            dataKey="close"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#miniGrad-${positive ? "up" : "down"})`}
            fillOpacity={1}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
