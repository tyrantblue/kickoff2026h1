import React from 'react';
import { HOME_SECTION_ID } from '../constants/ui.js';
import { reportData } from '../data/reportData.js';
import { MetricCard } from '../components/MetricCard.jsx';
import { ReportSection } from '../components/ReportSection.jsx';

export function HeroSection({ activeSection, isScrolling, shouldReduceMotion }) {
  return (
    <ReportSection
      activeSection={activeSection}
      className="grid min-h-[calc(100vh-138px)] grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-stretch gap-6 max-[1100px]:min-h-0 max-[1100px]:grid-cols-1"
      id={HOME_SECTION_ID}
      isScrolling={isScrolling}
      shouldReduceMotion={shouldReduceMotion}
    >
      <div className="flex flex-col justify-center gap-[18px] pr-4">
        <p className="text-sm uppercase text-[var(--text-faint)]">{reportData.meta.period}</p>
        <h1 className="animate-fade-up text-[52px] leading-[1.05] max-[820px]:text-[38px]">
          {reportData.meta.title}
        </h1>
        <p className="animate-fade-up max-w-[620px] text-xl leading-[1.6] text-[var(--text-soft)] max-[820px]:text-lg">
          {reportData.meta.summary}
        </p>
      </div>
      <div className="grid grid-cols-2 content-center gap-4 max-[820px]:grid-cols-1" aria-label="核心指标">
        {reportData.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </ReportSection>
  );
}
