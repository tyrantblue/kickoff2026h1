import React from 'react';
import { getStatusClassName } from '../constants/ui.js';
import { cn } from '../utils/cn.js';

export function StatusBadge({ status, children }) {
  return (
    <span
      className={cn(
        'inline-flex min-w-[72px] items-center justify-center rounded-full px-3 py-[7px] text-[13px] font-semibold',
        children ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300' : getStatusClassName(status),
      )}
    >
      {children ?? status}
    </span>
  );
}
