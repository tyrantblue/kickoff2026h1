import React from 'react';
import { PlanCard } from '../components/PlanCard.jsx';
import { ReportSection } from '../components/ReportSection.jsx';
import { SectionTitle } from '../components/SectionTitle.jsx';
import { reportData } from '../data/reportData.js';

export function PlanSection({ activeSection, isScrolling, shouldReduceMotion }) {
  const maxKrs = Math.max(...reportData.h2Okrs.map((okr) => okr.krs.length));

  return (
    <ReportSection
      activeSection={activeSection}
      id="plan"
      isScrolling={isScrolling}
      labelledBy="plan-title"
      shouldReduceMotion={shouldReduceMotion}
    >
      <SectionTitle
        type="plan"
        eyebrow="H2 + Q3 Plan"
        index="04"
        title="OKR 规划"
        titleId="plan-title"
        description={reportData.planSummary}
      />
      <div className="relative z-10 grid items-stretch grid-cols-3 gap-[18px] max-[1100px]:grid-cols-1">
        {reportData.h2Okrs.map((okr) => (
          <PlanCard key={okr.objective} maxKrs={maxKrs} okr={okr} />
        ))}
      </div>
    </ReportSection>
  );
}
