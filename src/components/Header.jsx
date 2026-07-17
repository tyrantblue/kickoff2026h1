import React from 'react';
import { HOME_SECTION_ID } from '../constants/ui.js';
import { cn } from '../utils/cn.js';
import oneaixLogo from '../assets/oneaix-logo.png';

export function Header({ activeSection, activeTheme, navItems, onNavigate, onThemeToggle, title }) {
  const { Icon } = activeTheme;

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-6 border-b border-[var(--line)] bg-[rgba(var(--header-rgb),0.88)] px-8 py-[18px] backdrop-blur-2xl transition-colors max-[820px]:flex-col max-[820px]:items-start max-[820px]:px-5">
      <a
        className="inline-flex items-center gap-4 font-bold transition-transform hover:-translate-y-px max-[820px]:gap-3"
        href={`#${HOME_SECTION_ID}`}
        aria-label="回到首页"
        onClick={(event) => {
          event.preventDefault();
          onNavigate(HOME_SECTION_ID);
        }}
      >
        <img
          className="block h-[34px] w-[min(210px,34vw)] object-contain max-[820px]:h-7 max-[820px]:w-[min(170px,56vw)]"
          src={oneaixLogo}
          alt="ONEAIX 壹睿"
        />
        <span className="whitespace-nowrap text-[15px] text-[var(--text)] max-[820px]:text-sm">
          {title}
        </span>
      </a>
      <div className="flex min-w-0 items-center justify-end gap-3.5 max-[820px]:w-full max-[820px]:flex-col max-[820px]:items-start">
        <nav
          className="flex flex-wrap justify-end gap-2 max-[820px]:w-full max-[820px]:justify-start"
          aria-label="汇报章节导航"
        >
          {navItems.map((item) => (
            <a
              aria-current={activeSection === item.id ? 'page' : undefined}
              className={cn(
                'rounded-full px-3 py-2 text-[var(--text-soft)] transition hover:-translate-y-px hover:bg-[var(--surface-muted)] hover:text-[var(--brand)] focus-visible:-translate-y-px focus-visible:bg-[var(--surface-muted)] focus-visible:text-[var(--brand)] focus-visible:outline-none',
                activeSection === item.id &&
                  'bg-[var(--surface-muted)] font-bold text-[var(--brand)] shadow-[inset_0_0_0_1px_rgba(37,99,235,0.18)]',
              )}
              href={`#${item.id}`}
              key={item.id}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="inline-flex min-h-[38px] min-w-28 cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-[var(--text-soft)] transition hover:-translate-y-px hover:border-[var(--brand)] hover:text-[var(--brand)] hover:shadow-[0_10px_24px_rgba(37,99,235,0.12)] focus-visible:-translate-y-px focus-visible:border-[var(--brand)] focus-visible:text-[var(--brand)] focus-visible:outline-none"
          type="button"
          onClick={onThemeToggle}
          aria-label={`当前主题：${activeTheme.label}，点击切换`}
          title={`当前主题：${activeTheme.label}`}
        >
          <Icon size={18} aria-hidden="true" />
          <span>{activeTheme.label}</span>
        </button>
      </div>
    </header>
  );
}
