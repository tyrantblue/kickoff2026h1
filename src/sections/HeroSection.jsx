import React from 'react';
import { HOME_SECTION_ID } from '../constants/ui.js';
import { reportData } from '../data/reportData.js';
import { MetricCard } from '../components/MetricCard.jsx';
import { ReportSection } from '../components/ReportSection.jsx';

export function HeroSection({ activeSection, isScrolling, shouldReduceMotion }) {
  return (
    <ReportSection
      activeSection={activeSection}
      className="grid min-h-[calc(100vh-138px)] grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] items-stretch gap-8 max-[1100px]:min-h-0 max-[1100px]:grid-cols-1"
      id={HOME_SECTION_ID}
      isScrolling={isScrolling}
      shouldReduceMotion={shouldReduceMotion}
    >
      <div className="relative z-10 flex flex-col justify-center gap-[18px] pr-4">
        <div className="inline-flex w-fit items-center gap-3 border border-[var(--line)] bg-[var(--card-muted)] px-3 py-2 text-sm uppercase text-[var(--text-faint)]">
          <span className="h-2 w-2 bg-[var(--brand)]" aria-hidden="true" />
          {reportData.meta.period}
        </div>
        <h1 className="animate-fade-up max-w-[620px] text-[58px] font-semibold leading-[1.02] max-[820px]:text-[38px]">
          {reportData.meta.title}
        </h1>
        <p className="animate-fade-up max-w-[620px] border-l-4 border-[var(--accent)] pl-5 text-xl leading-[1.6] text-[var(--text-soft)] max-[820px]:text-lg">
          {reportData.meta.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--text-faint)]">
          {['Delivery', 'Quality', 'AI Native', 'Next Route'].map((label) => (
            <span
              className="border border-[var(--line)] bg-[rgba(var(--surface-rgb),0.66)] px-3 py-2"
              key={label}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <div
        className="relative z-10 grid grid-cols-2 content-center gap-4 max-[820px]:grid-cols-1"
        aria-label="核心指标"
      >
        {reportData.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </ReportSection>
  );
}
