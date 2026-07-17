import {
  BarChart3,
  Brain,
  ClipboardList,
  Compass,
  Lightbulb,
  Monitor,
  Moon,
  Sun,
  Target,
} from 'lucide-react';

export const THEME_STORAGE_KEY = 'midyear-report-theme';
export const HOME_SECTION_ID = 'oneaix';

export const themeOptions = [
  { value: 'system', label: '\u8ddf\u968f\u7cfb\u7edf', Icon: Monitor },
  { value: 'light', label: '\u6d45\u8272', Icon: Sun },
  { value: 'dark', label: '\u6df1\u8272', Icon: Moon },
];

export const sectionIcons = {
  okr: Target,
  impact: BarChart3,
  kiss: Compass,
  plan: ClipboardList,
  battles: Brain,
  suggestions: Lightbulb,
};

export const chartAxisStyle = {
  fill: 'var(--text-faint)',
  fontSize: 13,
};

export function getStatusClassName(status) {
  if (status?.includes('\u5df2\u5b8c\u6210')) {
    return 'bg-teal-500/15 text-teal-700 dark:text-teal-300';
  }

  if (status?.includes('\u90e8\u5206')) {
    return 'bg-amber-500/15 text-amber-700 dark:text-amber-300';
  }

  if (status?.includes('\u672a\u5b8c\u6210')) {
    return 'bg-red-500/15 text-red-700 dark:text-red-300';
  }

  return 'bg-blue-500/15 text-blue-700 dark:text-blue-300';
}
