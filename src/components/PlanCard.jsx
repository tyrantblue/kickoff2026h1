import React from 'react';
import { StatusBadge } from './StatusBadge.jsx';

export function PlanCard({ okr }) {
  return (
    <article className="flex flex-col gap-[18px] rounded-lg border border-[var(--line)] bg-[var(--surface)] p-[22px] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(15,23,42,0.1)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase text-[var(--text-faint)]">{okr.code}</p>
          <h3 className="mt-1.5 text-[22px] leading-[1.3]">{okr.objective}</h3>
        </div>
        <StatusBadge>规划</StatusBadge>
      </div>
      <p className="leading-[1.7] text-[var(--text-soft)]">{okr.note}</p>
      <div className="flex flex-col gap-3.5">
        {okr.krs.map((kr) => (
          <div
            className="grid gap-2.5 rounded-lg border border-[var(--card-muted-border)] bg-[var(--card-muted)] p-4 transition hover:translate-x-0.5 hover:border-[var(--brand)]"
            key={kr.title}
          >
            <strong className="text-[15px]">{kr.title}</strong>
            <p className="leading-[1.7] text-[var(--text-soft)]">{kr.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
