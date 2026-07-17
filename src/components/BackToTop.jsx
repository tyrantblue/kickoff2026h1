import React from 'react';
import { ArrowUp } from 'lucide-react';
import { HOME_SECTION_ID } from '../constants/ui.js';
import { cn } from '../utils/cn.js';

export function BackToTop({ activeSection, onNavigate }) {
  return (
    <a
      className={cn(
        'fixed bottom-6 right-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface-strong)] text-white shadow-[var(--shadow)] transition hover:-translate-y-0.5 hover:bg-[var(--brand)] focus-visible:outline-none',
        activeSection === HOME_SECTION_ID && 'pointer-events-none translate-y-2 opacity-0',
      )}
      href={`#${HOME_SECTION_ID}`}
      aria-label="返回顶部"
      onClick={(event) => {
        event.preventDefault();
        onNavigate(HOME_SECTION_ID);
      }}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </a>
  );
}
