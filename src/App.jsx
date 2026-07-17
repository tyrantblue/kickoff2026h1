import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { BackToTop } from './components/BackToTop.jsx';
import { Header } from './components/Header.jsx';
import { HOME_SECTION_ID, THEME_STORAGE_KEY, themeOptions } from './constants/ui.js';
import { reportData } from './data/reportData.js';
import { BattleItemsSection } from './sections/BattleItemsSection.jsx';
import { BusinessImpactSection } from './sections/BusinessImpactSection.jsx';
import { HeroSection } from './sections/HeroSection.jsx';
import { KissReviewSection } from './sections/KissReviewSection.jsx';
import { OkrReviewSection } from './sections/OkrReviewSection.jsx';
import { PlanSection } from './sections/PlanSection.jsx';
import { SuggestionsSection } from './sections/SuggestionsSection.jsx';

function App() {
  const shouldReduceMotion = useReducedMotion();
  const scrollTimerRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    return window.localStorage.getItem(THEME_STORAGE_KEY) || 'system';
  });
  const [activeSection, setActiveSection] = useState(HOME_SECTION_ID);
  const [isScrolling, setIsScrolling] = useState(false);

  const sectionIds = useMemo(() => {
    return [HOME_SECTION_ID, ...reportData.navItems.map((item) => item.id)];
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
    function updateSectionScrollOffset() {
      const header = document.querySelector('header');
      const main = document.querySelector('main');

      if (!header || !main) {
        return;
      }

      const headerHeight = header.getBoundingClientRect().height;
      const mainPaddingTop = Number.parseFloat(window.getComputedStyle(main).paddingTop) || 0;
      const scrollOffset = Math.round(headerHeight + mainPaddingTop);

      document.documentElement.style.setProperty('--section-scroll-offset', `${scrollOffset}px`);
    }

    updateSectionScrollOffset();
    window.addEventListener('resize', updateSectionScrollOffset);

    return () => {
      window.removeEventListener('resize', updateSectionScrollOffset);
    };
  }, []);

  useEffect(() => {
    function updateActiveSection() {
      setIsScrolling(true);
      window.clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 180);

      const viewportFocusY = window.innerHeight * 0.48;
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
          { id: HOME_SECTION_ID, distance: Number.POSITIVE_INFINITY },
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
      window.clearTimeout(scrollTimerRef.current);
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

    setIsScrolling(true);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', `#${id}`);
    setActiveSection(id);
  }

  const sectionProps = {
    activeSection,
    isScrolling,
    shouldReduceMotion,
  };

  return (
    <div className="min-h-screen">
      <Header
        activeSection={activeSection}
        activeTheme={activeTheme}
        navItems={reportData.navItems}
        onNavigate={handleNavigate}
        onThemeToggle={handleThemeToggle}
        title={reportData.meta.title}
      />
      <main className="mx-auto w-[min(1200px,calc(100%-32px))] py-7 pb-16 max-[820px]:w-[min(1200px,calc(100%-20px))] max-[820px]:pt-5">
        <HeroSection {...sectionProps} />
        <OkrReviewSection {...sectionProps} />
        <BusinessImpactSection {...sectionProps} />
        <KissReviewSection {...sectionProps} />
        <PlanSection {...sectionProps} />
        <BattleItemsSection {...sectionProps} />
        <SuggestionsSection {...sectionProps} />
      </main>
      <BackToTop activeSection={activeSection} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
