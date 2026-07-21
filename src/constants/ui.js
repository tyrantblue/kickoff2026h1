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
    return 'bg-[color-mix(in_srgb,var(--brand)_16%,transparent)] text-[var(--brand-strong)]';
  }

  if (status?.includes('\u90e8\u5206')) {
    return 'bg-[color-mix(in_srgb,var(--warning)_20%,transparent)] text-[var(--warning)]';
  }

  if (status?.includes('\u672a\u5b8c\u6210')) {
    return 'bg-[color-mix(in_srgb,var(--danger)_16%,transparent)] text-[var(--danger)]';
  }

  return 'bg-[color-mix(in_srgb,var(--brand)_16%,transparent)] text-[var(--brand-strong)]';
}
