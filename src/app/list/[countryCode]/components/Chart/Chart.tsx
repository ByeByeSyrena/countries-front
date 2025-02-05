"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartProps {
  data: { year: number; value: number }[];
}

export default function Chart({ data }: ChartProps) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <ResponsiveContainer width={600} height={450}>
      <LineChart data={data}>
        <XAxis dataKey="year" tick={{ fill: "#555" }} />
        <YAxis
         tick={{ fill: "#555" }} 
         tickFormatter={(value) => new Intl.NumberFormat("en", { notation: "compact" }).format(value)}
         />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
