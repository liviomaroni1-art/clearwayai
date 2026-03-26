"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";

interface Props {
  data: { date: string; close: number }[];
  positive: boolean;
}

export function SparklineChart({ data, positive }: Props) {
  if (data.length < 2) {
    return <div className="sparkline-container bg-card rounded" />;
  }

  return (
    <div className="sparkline-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="close"
            stroke={positive ? "#38bdf8" : "#ef4444"}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
