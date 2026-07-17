import React from 'react';
import { Target } from 'lucide-react';
import { sectionIcons } from '../constants/ui.js';

export function SectionTitle({ type, eyebrow, title, description, titleId }) {
  const Icon = sectionIcons[type] ?? Target;

  return (
    <div className="mb-6 flex flex-col gap-2.5">
      <div className="inline-flex items-center gap-2 text-[var(--brand)]">
        <Icon size={18} aria-hidden="true" />
        <span className="text-sm uppercase">{eyebrow}</span>
      </div>
      <h2 className="animate-fade-up text-[34px] leading-[1.15]" id={titleId}>
        {title}
      </h2>
      {description ? (
        <p className="max-w-[860px] leading-[1.7] text-[var(--text-soft)]">{description}</p>
      ) : null}
    </div>
  );
}
