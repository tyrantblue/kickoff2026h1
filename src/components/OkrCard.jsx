import React from 'react';
import { StatusBadge } from './StatusBadge.jsx';

export function OkrCard({ maxKrs, okr }) {
  return (
    <article className="grid h-full grid-rows-[auto_auto_1fr] gap-[18px] rounded-lg border border-[var(--line)] bg-[var(--surface)] p-[22px] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(15,23,42,0.1)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm uppercase text-[var(--text-faint)]">{okr.code}</p>
          <h3 className="mt-1.5 text-[22px] leading-[1.3]">{okr.objective}</h3>
        </div>
        <StatusBadge status={okr.status} />
      </div>
      <p className="leading-[1.7] text-[var(--text-soft)]">{okr.note}</p>
      <div className="grid auto-rows-fr gap-3.5">
        {okr.krs.map((kr) => (
          <div
            className="flex h-full flex-col gap-3 rounded-lg border border-[var(--card-muted-border)] bg-[var(--card-muted)] p-4 transition hover:translate-x-0.5 hover:border-[var(--brand)]"
            key={kr.title}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <strong className="text-[15px]">{kr.title}</strong>
                <p className="mt-1 leading-[1.7] text-[var(--text-soft)]">{kr.target}</p>
              </div>
              <StatusBadge status={kr.status} />
            </div>
            <p className="mt-auto leading-[1.7] text-[var(--text-soft)]">{kr.result}</p>
          </div>
        ))}
        {Array.from({ length: Math.max(0, maxKrs - okr.krs.length) }).map((_, index) => (
          <div
            aria-hidden="true"
            className="invisible flex h-full flex-col gap-3 rounded-lg border border-[var(--card-muted-border)] bg-[var(--card-muted)] p-4"
            key={`${okr.objective}-placeholder-${index}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <strong className="text-[15px]">KR</strong>
                <p className="mt-1 leading-[1.7] text-[var(--text-soft)]">占位</p>
              </div>
              <StatusBadge status="-" />
            </div>
            <p className="mt-auto leading-[1.7] text-[var(--text-soft)]">占位</p>
          </div>
        ))}
      </div>
    </article>
  );
}
