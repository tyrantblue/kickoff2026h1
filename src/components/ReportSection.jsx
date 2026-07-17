import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn.js';

export function ReportSection({
  activeSection,
  children,
  className = '',
  id,
  isScrolling,
  labelledBy,
  shouldReduceMotion,
}) {
  const isActive = activeSection === id;
  const motionState =
    isScrolling || shouldReduceMotion
      ? { opacity: 1, scale: 1 }
      : {
          opacity: isActive ? 1 : 0.58,
          scale: isActive ? 1 : 0.985,
        };

  return (
    <motion.section
      animate={motionState}
      aria-labelledby={labelledBy}
      className={cn(
        'mb-6 min-h-[calc(100vh-136px)] scroll-mt-[92px] rounded-lg border bg-[rgba(var(--surface-rgb),0.92)] p-7 shadow-[var(--shadow)] will-change-[opacity,transform] max-[820px]:min-h-0 max-[820px]:scroll-mt-[152px] max-[820px]:p-[22px_18px]',
        isActive ? 'border-[var(--brand)]' : 'border-[var(--line)]',
        className,
      )}
      id={id}
      initial={false}
      transition={
        isScrolling
          ? { duration: 0 }
          : {
              type: 'spring',
              stiffness: 92,
              damping: 20,
              mass: 0.95,
            }
      }
    >
      {children}
    </motion.section>
  );
}
