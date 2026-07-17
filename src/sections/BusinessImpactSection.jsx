import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ReportSection } from '../components/ReportSection.jsx';
import { SectionTitle } from '../components/SectionTitle.jsx';
import { reportData } from '../data/reportData.js';

export function BusinessImpactSection({ activeSection, isScrolling, shouldReduceMotion }) {
  return (
    <ReportSection
      activeSection={activeSection}
      id="impact"
      isScrolling={isScrolling}
      labelledBy="impact-title"
      shouldReduceMotion={shouldReduceMotion}
    >
      <SectionTitle
        type="impact"
        eyebrow="Business Impact"
        title={reportData.businessImpact.title}
        titleId="impact-title"
        description={reportData.businessImpact.summary}
      />
      <div className="grid grid-cols-2 gap-[18px] max-[1100px]:grid-cols-1">
        {reportData.businessImpact.points.map((point) => (
          <article
            className="grid gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-[22px] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(15,23,42,0.1)]"
            key={point.title}
          >
            <CheckCircle2 className="text-[var(--brand)]" size={20} aria-hidden="true" />
            <h3 className="text-[22px] leading-[1.3]">{point.title}</h3>
            <p className="leading-[1.7] text-[var(--text-soft)]">{point.content}</p>
          </article>
        ))}
      </div>
      <blockquote className="mt-[18px] rounded-r-lg border-l-4 border-[var(--brand)] bg-[var(--surface-muted)] px-5 py-[18px] leading-[1.7] text-[var(--text-soft)]">
        {reportData.businessImpact.conclusion}
      </blockquote>
    </ReportSection>
  );
}
