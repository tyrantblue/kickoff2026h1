import React from 'react';
export function MetricCard({ metric }) {
  return (
    <article className="animate-float-in relative flex min-h-[170px] flex-col justify-between gap-3.5 overflow-hidden border border-[var(--line)] bg-[var(--surface)] p-[22px] transition before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-[var(--accent)] hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-[var(--shadow)]">
      <span className="relative z-10 text-sm uppercase text-[var(--text-faint)]">{metric.label}</span>
      <strong className="relative z-10 text-[clamp(30px,5vw,44px)] leading-none text-[var(--surface-strong)]">
        {metric.value}
      </strong>
      <p className="relative z-10 text-[var(--text-soft)]">{metric.description}</p>
    </article>
  );
}
