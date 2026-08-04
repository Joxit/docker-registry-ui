/*
 * Copyright (C) 2016-2023 Jones Magloire @Joxit
 *
 * Material 3 theme handling.
 *
 * The light and dark palettes live in `src/styles/tokens.scss` and are
 * selected by setting `data-theme` on the root element. This module decides
 * which theme to use (auto / light / dark) and applies `THEME_*` environment
 * overrides on top, keeping the legacy variables (`--primary-text`, ...)
 * and the Material 3 roles they alias in sync.
 */

const LOCAL_STORAGE_THEME = 'registryUiTheme';

/**
 * Mapping from legacy theme variable (as exposed by `THEME_*` env vars) to
 * the Material 3 role it aliases. Overrides are written to both so existing
 * configuration keeps working and M3-styled components see the value.
 */
const LEGACY_TO_M3 = {
  'primary-text': 'm3-on-surface',
  'neutral-text': 'm3-on-surface-variant',
  'background': 'm3-surface',
  'hover-background': 'm3-surface-container-highest',
  'accent-text': 'm3-primary',
  'header-text': 'm3-header-text',
  'header-accent-text': 'm3-header-accent-text',
  'header-background': 'm3-header-background',
  'footer-text': 'm3-footer-text',
  'footer-neutral-text': 'm3-footer-neutral-text',
  'footer-background': 'm3-footer-background',
};

const normalizeKey = (k) =>
  k
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^theme-/, '');

const preferDarkMode = ({ theme }) => {
  if (theme === 'auto' || theme === '') {
    switch (localStorage.getItem(LOCAL_STORAGE_THEME)) {
      case 'dark':
        return true;
      case 'light':
        return false;
      default:
        if (typeof window.matchMedia === 'function') {
          const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
          return prefersDarkScheme && prefersDarkScheme.matches;
        }
    }
  }
  return theme === 'dark';
};

export const loadTheme = (props, style) => {
  const isDarkMode = preferDarkMode(props);
  const theme = isDarkMode ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  // Apply THEME_* environment overrides to both the legacy variable and the
  // Material 3 role it maps to. Defaults come from tokens.scss.
  Object.entries(props)
    .filter(([k, v]) => v && /^theme[A-Z]/.test(k))
    .forEach(([k, v]) => {
      const key = normalizeKey(k);
      style.setProperty(`--${key}`, v);
      const m3 = LEGACY_TO_M3[key];
      if (m3) {
        style.setProperty(`--${m3}`, v);
      }
    });
  localStorage.setItem(LOCAL_STORAGE_THEME, theme);
  return theme;
};
