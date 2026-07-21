import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { reportData } from '../data/reportData.js';
import { chartAxisStyle } from '../constants/ui.js';

export function ChartBand() {
  return (
    <div className="relative z-10 mt-[18px] grid grid-cols-2 gap-[18px] max-[1100px]:grid-cols-1">
      <article className="border border-[var(--line)] bg-[var(--surface)] p-[18px] transition hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-[var(--shadow)]">
        <h3 className="mb-3 text-[22px] leading-[1.3]">核心目标完成度</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={reportData.completionChart} margin={{ top: 8, right: 18, bottom: 8, left: 18 }}>
            <CartesianGrid stroke="var(--line)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="name" tick={chartAxisStyle} tickLine={false} axisLine={false} />
            <YAxis hide domain={[0, 120]} />
            <Tooltip />
            <Bar dataKey="value" radius={[2, 2, 0, 0]}>
              {reportData.completionChart.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </article>
      <article className="border border-[var(--line)] bg-[var(--surface)] p-[18px] transition hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-[var(--shadow)]">
        <h3 className="mb-3 text-[22px] leading-[1.3]">效率与质量趋势表达</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={reportData.trendChart} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
            <CartesianGrid stroke="var(--line)" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="name"
              interval={0}
              tick={chartAxisStyle}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis hide />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--brand)"
              fill="color-mix(in srgb, var(--brand) 18%, transparent)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </article>
    </div>
  );
}
