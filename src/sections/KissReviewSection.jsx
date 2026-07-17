import React from 'react';
import { ReportSection } from '../components/ReportSection.jsx';
import { SectionTitle } from '../components/SectionTitle.jsx';
import { reportData } from '../data/reportData.js';

export function KissReviewSection({ activeSection, isScrolling, shouldReduceMotion }) {
  return (
    <ReportSection
      activeSection={activeSection}
      id="kiss"
      isScrolling={isScrolling}
      labelledBy="kiss-title"
      shouldReduceMotion={shouldReduceMotion}
    >
      <SectionTitle
        type="kiss"
        eyebrow="KISS"
        title="KISS 复盘"
        titleId="kiss-title"
        description="从继续保持、需要改进、开始尝试、停止减少四个角度沉淀 H1 经验。"
      />
      <div className="grid grid-cols-2 gap-[18px] max-[1100px]:grid-cols-1">
        {reportData.kiss.map((item) => (
          <article
            className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-[22px] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(15,23,42,0.1)]"
            key={item.title}
          >
            <span className="mb-2.5 inline-flex rounded-full bg-[var(--surface-muted)] px-2.5 py-1.5 text-[13px] font-bold text-[var(--brand)]">
              {item.label}
            </span>
            <h3 className="text-[22px] leading-[1.3]">{item.title}</h3>
            <ul className="mt-3.5 list-disc pl-5 leading-[1.8] text-[var(--text-soft)]">
              {item.items.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </ReportSection>
  );
}
