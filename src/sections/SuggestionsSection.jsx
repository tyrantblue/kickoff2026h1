import React from 'react';
import { ReportSection } from '../components/ReportSection.jsx';
import { SectionTitle } from '../components/SectionTitle.jsx';
import { reportData } from '../data/reportData.js';

export function SuggestionsSection({ activeSection, isScrolling, shouldReduceMotion }) {
  return (
    <ReportSection
      activeSection={activeSection}
      id="suggestions"
      isScrolling={isScrolling}
      labelledBy="suggestions-title"
      shouldReduceMotion={shouldReduceMotion}
    >
      <SectionTitle
        type="suggestions"
        eyebrow="Suggestions"
        index="06"
        title="个人建议"
        titleId="suggestions-title"
        description="围绕开发规范和团队知识流动，提出两点可持续推进的建议。"
      />
      <div className="relative z-10 grid grid-cols-2 gap-[18px] max-[1100px]:grid-cols-1">
        {reportData.suggestions.map((suggestion) => (
          <article
            className="border border-[var(--line)] bg-[var(--surface)] p-[22px] transition hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-[var(--shadow)]"
            key={suggestion.title}
          >
            <h3 className="text-[22px] leading-[1.3]">{suggestion.title}</h3>
            <p className="mt-3 leading-[1.7] text-[var(--text-soft)]">{suggestion.content}</p>
          </article>
        ))}
      </div>
    </ReportSection>
  );
}
