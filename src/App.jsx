import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUp,
  BarChart3,
  Brain,
  CheckCircle2,
  ClipboardList,
  Compass,
  Lightbulb,
  Monitor,
  Moon,
  Sun,
  Target,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { reportData } from './data/reportData.js';

const THEME_STORAGE_KEY = 'midyear-report-theme';
const themeOptions = [
  { value: 'system', label: '跟随系统', Icon: Monitor },
  { value: 'light', label: '浅色', Icon: Sun },
  { value: 'dark', label: '深色', Icon: Moon },
];

const statusClassName = {
  已完成: 'status status-done',
  部分完成: 'status status-partial',
  未完成: 'status status-missed',
};

const sectionIcons = {
  okr: Target,
  impact: BarChart3,
  kiss: Compass,
  plan: ClipboardList,
  battles: Brain,
  suggestions: Lightbulb,
};

function App() {
  const [theme, setTheme] = useState(() => {
    return window.localStorage.getItem(THEME_STORAGE_KEY) || 'system';
  });
  const [activeSection, setActiveSection] = useState('hero');

  const sectionIds = useMemo(() => {
    return ['hero', ...reportData.navItems.map((item) => item.id)];
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      root.removeAttribute('data-theme');
      window.localStorage.removeItem(THEME_STORAGE_KEY);
      return;
    }

    root.setAttribute('data-theme', theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    function updateActiveSection() {
      const viewportFocusY = window.innerHeight * 0.45;
      const sections = sectionIds
        .map((id) => {
          const element = document.getElementById(id);

          if (!element) {
            return null;
          }

          return { id, rect: element.getBoundingClientRect() };
        })
        .filter(Boolean);

      const focusedSection = sections.find(({ rect }) => {
        return rect.top <= viewportFocusY && rect.bottom >= viewportFocusY;
      });

      const currentSection =
        focusedSection?.id ??
        sections.reduce(
          (closest, section) => {
            const distance = Math.abs(section.rect.top - viewportFocusY);

            if (distance < closest.distance) {
              return { id: section.id, distance };
            }

            return closest;
          },
          { id: 'hero', distance: Number.POSITIVE_INFINITY },
        ).id;

      setActiveSection((previousSection) => {
        if (previousSection === currentSection) {
          return previousSection;
        }

        const nextHash = `#${currentSection}`;
        if (window.location.hash !== nextHash) {
          window.history.replaceState(null, '', nextHash);
        }

        return currentSection;
      });
    }

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sectionIds]);

  const activeTheme = useMemo(() => {
    return themeOptions.find((option) => option.value === theme) ?? themeOptions[0];
  }, [theme]);

  function handleThemeToggle() {
    const currentIndex = themeOptions.findIndex((option) => option.value === theme);
    const nextIndex = (currentIndex + 1) % themeOptions.length;
    setTheme(themeOptions[nextIndex].value);
  }

  function handleNavigate(id) {
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', `#${id}`);
    setActiveSection(id);
  }

  return (
    <div className={`app-shell focus-${activeSection}`}>
      <Header
        activeSection={activeSection}
        activeTheme={activeTheme}
        onNavigate={handleNavigate}
        onThemeToggle={handleThemeToggle}
      />
      <main>
        <Hero />
        <OkrReview />
        <BusinessImpact />
        <KissReview />
        <PlanSection />
        <BattleItems />
        <Suggestions />
      </main>
      <BackToTop activeSection={activeSection} onNavigate={handleNavigate} />
    </div>
  );
}

function Header({ activeSection, activeTheme, onNavigate, onThemeToggle }) {
  const { Icon } = activeTheme;

  return (
    <header className="site-header">
      <a
        className="brand"
        href="#hero"
        aria-label="回到首页"
        onClick={(event) => {
          event.preventDefault();
          onNavigate('hero');
        }}
      >
        <span className="brand-mark">H1</span>
        <span>{reportData.meta.title}</span>
      </a>
      <div className="header-actions">
        <nav className="site-nav" aria-label="汇报章节导航">
          {reportData.navItems.map((item) => (
            <a
              aria-current={activeSection === item.id ? 'page' : undefined}
              className={activeSection === item.id ? 'nav-link-active' : undefined}
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
          className="theme-toggle"
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

function Hero() {
  return (
    <section className="hero-section section-panel panel-hero" id="hero">
      <div className="hero-copy">
        <p className="eyebrow">{reportData.meta.period}</p>
        <h1>{reportData.meta.title}</h1>
        <p className="hero-summary">{reportData.meta.summary}</p>
      </div>
      <div className="metric-grid" aria-label="核心指标">
        {reportData.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </section>
  );
}

function MetricCard({ metric }) {
  return (
    <article className="metric-card">
      <span>{metric.label}</span>
      <strong>{metric.value}</strong>
      <p>{metric.description}</p>
    </article>
  );
}

function SectionTitle({ id, type, eyebrow, title, description }) {
  const Icon = sectionIcons[type] ?? Target;

  return (
    <div className="section-title" id={id}>
      <div className="section-kicker">
        <Icon size={18} aria-hidden="true" />
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function OkrReview() {
  return (
    <section className="section-panel panel-okr" aria-labelledby="okr">
      <SectionTitle
        id="okr"
        type="okr"
        eyebrow="H1 Review"
        title="OKR 完成情况"
        description={reportData.okrSummary}
      />
      <div className="okr-layout">
        {reportData.h1Okrs.map((okr) => (
          <OkrCard key={okr.objective} okr={okr} />
        ))}
      </div>
      <ChartBand />
    </section>
  );
}

function OkrCard({ okr }) {
  return (
    <article className="okr-card">
      <div className="okr-card-header">
        <div>
          <p>{okr.code}</p>
          <h3>{okr.objective}</h3>
        </div>
        <span className={statusClassName[okr.status]}>{okr.status}</span>
      </div>
      <p className="okr-note">{okr.note}</p>
      <div className="kr-list">
        {okr.krs.map((kr) => (
          <div className="kr-row" key={kr.title}>
            <div>
              <strong>{kr.title}</strong>
              <p>{kr.target}</p>
            </div>
            <span className={statusClassName[kr.status]}>{kr.status}</span>
            <p>{kr.result}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function ChartBand() {
  return (
    <div className="chart-band">
      <article className="chart-card">
        <h3>核心目标完成度</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={reportData.completionChart}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis hide domain={[0, 120]} />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {reportData.completionChart.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </article>
      <article className="chart-card">
        <h3>效率与质量趋势表达</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={reportData.trendChart}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              fill="#dbeafe"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </article>
    </div>
  );
}

function BusinessImpact() {
  return (
    <section className="section-panel panel-impact" aria-labelledby="impact">
      <SectionTitle
        id="impact"
        type="impact"
        eyebrow="Business Impact"
        title={reportData.businessImpact.title}
        description={reportData.businessImpact.summary}
      />
      <div className="impact-grid">
        {reportData.businessImpact.points.map((point) => (
          <article className="impact-card" key={point.title}>
            <CheckCircle2 size={20} aria-hidden="true" />
            <h3>{point.title}</h3>
            <p>{point.content}</p>
          </article>
        ))}
      </div>
      <blockquote>{reportData.businessImpact.conclusion}</blockquote>
    </section>
  );
}

function KissReview() {
  return (
    <section className="section-panel panel-kiss" aria-labelledby="kiss">
      <SectionTitle
        id="kiss"
        type="kiss"
        eyebrow="KISS"
        title="KISS 复盘"
        description="从继续保持、需要改进、开始尝试、停止减少四个角度沉淀 H1 经验。"
      />
      <div className="kiss-grid">
        {reportData.kiss.map((item) => (
          <article className="kiss-card" key={item.title}>
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <ul>
              {item.items.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function PlanSection() {
  return (
    <section className="section-panel panel-plan" aria-labelledby="plan">
      <SectionTitle
        id="plan"
        type="plan"
        eyebrow="H2 + Q3 Plan"
        title="OKR 规划"
        description={reportData.planSummary}
      />
      <div className="okr-layout">
        {reportData.h2Okrs.map((okr) => (
          <PlanCard key={okr.objective} okr={okr} />
        ))}
      </div>
    </section>
  );
}

function PlanCard({ okr }) {
  return (
    <article className="okr-card plan-card">
      <div className="okr-card-header">
        <div>
          <p>{okr.code}</p>
          <h3>{okr.objective}</h3>
        </div>
        <span className="status status-plan">规划</span>
      </div>
      <p className="okr-note">{okr.note}</p>
      <div className="plan-kr-list">
        {okr.krs.map((kr) => (
          <div className="plan-kr" key={kr.title}>
            <strong>{kr.title}</strong>
            <p>{kr.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function BattleItems() {
  return (
    <section className="section-panel panel-battles" aria-labelledby="battles">
      <SectionTitle
        id="battles"
        type="battles"
        eyebrow="Focus"
        title="攻坚事项"
        description="H2 重点攻坚不追求过度复杂，先把 AI 使用和自动化基础能力做实。"
      />
      <div className="focus-list">
        {reportData.battleItems.map((item) => (
          <article className="focus-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.value}</p>
            <ol>
              {item.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}

function Suggestions() {
  return (
    <section className="section-panel panel-suggestions" aria-labelledby="suggestions">
      <SectionTitle
        id="suggestions"
        type="suggestions"
        eyebrow="Suggestions"
        title="个人建议"
        description="围绕开发规范和团队知识流动，提出两点可持续推进的建议。"
      />
      <div className="suggestion-grid">
        {reportData.suggestions.map((suggestion) => (
          <article className="suggestion-card" key={suggestion.title}>
            <h3>{suggestion.title}</h3>
            <p>{suggestion.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BackToTop({ activeSection, onNavigate }) {
  return (
    <a
      className={activeSection === 'hero' ? 'back-to-top is-hidden' : 'back-to-top'}
      href="#hero"
      aria-label="返回顶部"
      onClick={(event) => {
        event.preventDefault();
        onNavigate('hero');
      }}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </a>
  );
}

export default App;
