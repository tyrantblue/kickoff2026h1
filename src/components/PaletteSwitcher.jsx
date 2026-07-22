import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { paletteIcon as PaletteIcon } from '../constants/ui.js';
import { cn } from '../utils/cn.js';

const panelMotion = {
  initial: {
    opacity: 0,
    y: 6,
    scale: 0.985,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.992,
    transition: {
      duration: 0.12,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export function PaletteSwitcher({ activePalette, onPaletteChange, palettes }) {
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef(null);
  const closeTimerRef = useRef(null);
  const paletteCount = palettes.length;

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openPalette() {
    clearCloseTimer();
    setIsOpen(true);
  }

  function closePalette() {
    clearCloseTimer();
    setIsOpen(false);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 40);
  }

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!switcherRef.current?.contains(event.target)) {
        closePalette();
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closePalette();
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
    <div
      className="relative"
      ref={switcherRef}
      onMouseEnter={openPalette}
      onMouseLeave={scheduleClose}
      onFocus={openPalette}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          scheduleClose();
        }
      }}
    >
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

      {isOpen ? <div className="absolute right-0 top-full h-3 w-full" aria-hidden="true" /> : null}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            {...panelMotion}
            className="absolute right-0 top-[calc(100%+10px)] z-40 grid w-[min(480px,calc(100vw-32px))] gap-2 rounded-xl border border-[rgba(var(--surface-rgb),0.28)] bg-[rgba(var(--surface-rgb),0.64)] p-2.5 text-[var(--text)] shadow-[var(--shadow)] outline outline-1 outline-[rgba(var(--surface-rgb),0.32)] backdrop-blur-xl max-[900px]:right-[-52px] max-[700px]:left-0 max-[700px]:right-auto max-[700px]:w-[min(480px,calc(100vw-20px))]"
            role="dialog"
            aria-label="调色盘"
            onMouseEnter={openPalette}
            onMouseLeave={scheduleClose}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-2">
              <strong className="text-sm">调色盘</strong>
              <span className="text-xs text-[var(--text-faint)]">{paletteCount} 组</span>
            </div>

            <div className="grid max-h-[52vh] grid-cols-3 gap-2 overflow-y-auto pr-1 max-[700px]:grid-cols-2 max-[520px]:grid-cols-1">
              {palettes.map((palette) => (
                <button
                  className={cn(
                    'group grid min-h-[92px] cursor-pointer grid-rows-[auto_1fr_auto] gap-1.5 rounded-lg border border-[rgba(var(--surface-rgb),0.3)] bg-[rgba(var(--surface-rgb),0.34)] p-2 text-left transition hover:-translate-y-0.5 hover:border-[var(--brand)] hover:bg-[rgba(var(--surface-rgb),0.62)] hover:shadow-[var(--shadow)]',
                    activePalette.id === palette.id && 'border-[var(--brand)] bg-[var(--surface-muted)] shadow-[var(--shadow)]',
                  )}
                  key={palette.id}
                  type="button"
                  onClick={() => {
                    onPaletteChange(palette.id);
                    closePalette();
                  }}
                >
                  <span className="min-w-0">
                    <strong className="block truncate text-sm">{palette.name}</strong>
                    <span className="block text-xs text-[var(--text-faint)]">{palette.source}</span>
                  </span>
                  <span
                    className="grid min-h-[34px] overflow-hidden rounded-md border border-[var(--line)]"
                    aria-hidden="true"
                    style={{ gridTemplateColumns: `repeat(${palette.swatches.length}, minmax(0, 1fr))` }}
                  >
                    {palette.swatches.map((color) => (
                      <span className="h-full min-h-[34px]" key={color} style={{ backgroundColor: color }} />
                    ))}
                  </span>
                  <span className="text-[11px] text-[var(--text-faint)]">{palette.swatches.length} 色</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
