import React, { useEffect, useRef, useState } from 'react';
import { paletteIcon as PaletteIcon } from '../constants/ui.js';
import { cn } from '../utils/cn.js';

export function PaletteSwitcher({ activePalette, onPaletteChange, palettes }) {
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!switcherRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={switcherRef}>
      <button
        className={cn(
          'inline-flex min-h-[38px] cursor-pointer items-center justify-center gap-2 border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-[var(--text-soft)] transition hover:-translate-y-px hover:border-[var(--brand)] hover:text-[var(--brand)] hover:shadow-[var(--shadow)] focus-visible:-translate-y-px focus-visible:border-[var(--brand)] focus-visible:text-[var(--brand)] focus-visible:outline-none',
          isOpen && 'border-[var(--brand)] text-[var(--brand)] shadow-[var(--shadow)]',
        )}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => {
          setIsOpen((currentOpen) => !currentOpen);
        }}
      >
        <PaletteIcon size={18} aria-hidden="true" />
        <span className="whitespace-nowrap">{activePalette.name}</span>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 top-[calc(100%+10px)] z-30 grid w-[360px] gap-2 border border-[var(--line)] bg-[var(--surface)] p-3 text-[var(--text)] shadow-[var(--shadow)] outline outline-1 outline-[rgba(var(--surface-rgb),0.62)] backdrop-blur-xl transition-none animate-fade-up max-[820px]:left-0 max-[820px]:right-auto max-[460px]:w-[calc(100vw-40px)]"
          role="dialog"
          aria-label="调色盘"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-2">
            <strong className="text-sm">调色盘</strong>
            <span className="text-xs text-[var(--text-faint)]">10 组</span>
          </div>
          <div className="grid max-h-[420px] gap-2 overflow-y-auto pr-1">
            {palettes.map((palette) => (
              <button
                className={cn(
                  'grid cursor-pointer grid-cols-[1fr_auto] items-center gap-3 border border-[var(--line)] bg-[var(--card-muted)] p-3 text-left transition hover:-translate-y-px hover:border-[var(--brand)]',
                  activePalette.id === palette.id && 'border-[var(--brand)] bg-[var(--surface-muted)]',
                )}
                key={palette.id}
                type="button"
                onClick={() => {
                  onPaletteChange(palette.id);
                  setIsOpen(false);
                }}
              >
                <span className="min-w-0">
                  <strong className="block text-sm">{palette.name}</strong>
                  <span className="block text-xs text-[var(--text-faint)]">{palette.source}</span>
                </span>
                <span className="flex overflow-hidden border border-[var(--line)]" aria-hidden="true">
                  {palette.swatches.map((color) => (
                    <span
                      className="h-7 w-7"
                      key={color}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
