import React from 'react';
import { ChartBand } from '../components/ChartBand.jsx';
import { OkrCard } from '../components/OkrCard.jsx';
import { ReportSection } from '../components/ReportSection.jsx';
import { SectionTitle } from '../components/SectionTitle.jsx';
import { reportData } from '../data/reportData.js';

export function OkrReviewSection({ activeSection, isScrolling, shouldReduceMotion }) {
  const maxKrs = Math.max(...reportData.h1Okrs.map((okr) => okr.krs.length));

  return (
    <ReportSection
      activeSection={activeSection}
      id="okr"
      isScrolling={isScrolling}
      labelledBy="okr-title"
      shouldReduceMotion={shouldReduceMotion}
    >
      <SectionTitle
        type="okr"
        eyebrow="H1 Review"
        title="OKR 完成情况"
        titleId="okr-title"
        description={reportData.okrSummary}
      />
      <div className="grid items-stretch grid-cols-3 gap-[18px] max-[1100px]:grid-cols-1">
        {reportData.h1Okrs.map((okr) => (
          <OkrCard key={okr.objective} maxKrs={maxKrs} okr={okr} />
        ))}
      </div>
      <ChartBand />
    </ReportSection>
  );
}
