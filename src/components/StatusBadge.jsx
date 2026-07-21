import React from 'react';
import { getStatusClassName } from '../constants/ui.js';
import { cn } from '../utils/cn.js';

export function StatusBadge({ status, children }) {
  return (
    <span
      className={cn(
        'inline-flex min-w-[72px] shrink-0 items-center justify-center whitespace-nowrap border px-3 py-[7px] text-[13px] font-semibold leading-none',
        children
          ? 'border-[var(--route-line)] bg-[color-mix(in_srgb,var(--brand)_14%,transparent)] text-[var(--brand-strong)]'
          : getStatusClassName(status),
      )}
    >
      {children ?? status}
    </span>
  );
}
