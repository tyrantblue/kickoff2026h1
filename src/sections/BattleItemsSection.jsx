import React from 'react';
import { ReportSection } from '../components/ReportSection.jsx';
import { SectionTitle } from '../components/SectionTitle.jsx';
import { reportData } from '../data/reportData.js';

export function BattleItemsSection({ activeSection, isScrolling, shouldReduceMotion }) {
  return (
    <ReportSection
      activeSection={activeSection}
      id="battles"
      isScrolling={isScrolling}
      labelledBy="battles-title"
      shouldReduceMotion={shouldReduceMotion}
    >
      <SectionTitle
        type="battles"
        eyebrow="Focus"
        title="攻坚事项"
        titleId="battles-title"
        description="H2 重点攻坚不追求过度复杂，先把 AI 使用和自动化基础能力做实。"
      />
      <div className="grid grid-cols-2 gap-[18px] max-[1100px]:grid-cols-1">
        {reportData.battleItems.map((item) => (
          <article
            className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-[22px] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(15,23,42,0.1)]"
            key={item.title}
          >
            <h3 className="text-[22px] leading-[1.3]">{item.title}</h3>
            <p className="mt-3 leading-[1.7] text-[var(--text-soft)]">{item.value}</p>
            <ol className="mt-3.5 list-decimal pl-5 leading-[1.8] text-[var(--text-soft)]">
              {item.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </ReportSection>
  );
}
