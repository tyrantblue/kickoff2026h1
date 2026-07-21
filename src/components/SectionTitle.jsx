import React from 'react';
import { Target } from 'lucide-react';
import { sectionIcons } from '../constants/ui.js';

export function SectionTitle({ type, eyebrow, title, description, index = 'NODE', titleId }) {
  const Icon = sectionIcons[type] ?? Target;

  return (
    <div className="relative z-10 mb-6 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 max-[720px]:grid-cols-1">
      <div className="flex min-h-[72px] min-w-[82px] flex-col items-center justify-center border border-[var(--line)] bg-[var(--card-muted)] px-3 py-2 text-center">
        <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-faint)]">Node</span>
        <strong className="text-[28px] leading-none text-[var(--brand)]">{index}</strong>
      </div>
      <div className="min-w-0">
        <div className="inline-flex items-center gap-2 text-[var(--brand)]">
          <Icon size={18} aria-hidden="true" />
          <span className="text-sm uppercase">{eyebrow}</span>
        </div>
        <h2 className="animate-fade-up mt-2 text-[34px] leading-[1.15]" id={titleId}>
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-[860px] leading-[1.7] text-[var(--text-soft)]">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
