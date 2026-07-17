import React from 'react';
export function MetricCard({ metric }) {
  return (
    <article className="animate-float-in flex min-h-[170px] flex-col justify-between gap-3.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-[22px] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(15,23,42,0.1)]">
      <span className="text-sm uppercase text-[var(--text-faint)]">{metric.label}</span>
      <strong className="text-[clamp(30px,5vw,44px)] leading-none">{metric.value}</strong>
      <p className="text-[var(--text-soft)]">{metric.description}</p>
    </article>
  );
}
