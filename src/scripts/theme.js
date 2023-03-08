const LIGHT_THEME = {
  'primary-text': '#25313b',
  'neutral-text': '#777',
  'background': '#fff',
  'hover-background': '#eee',
  'accent-text': '#6680a1',
  'header-text': '#fff',
  'header-background': '#25313b',
  'footer-text': '#fff',
  'footer-neutral-text': '#999',
  'footer-background': '#555',
};
const DARK_THEME = {
  'primary-text': '#8A9EBA',
  'neutral-text': '#36527A',
  'background': '#22272e',
  'hover-background': '#30404D',
  'accent-text': '#5684FF',
  'header-text': '#fff',
  'header-background': '#333A45',
  'footer-text': '#fff',
  'footer-neutral-text': '#999',
  'footer-background': '#555',
};

let THEME;

const normalizeKey = (k) =>
  k
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^theme-/, '');

const preferDarkMode = ({ theme }) => {
  if (theme === 'auto') {
    if (typeof window.matchMedia === 'function') {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      return prefersDarkScheme && prefersDarkScheme.matches;
    }
  }
  return theme === 'dark';
};

export const loadTheme = (props, style) => {
  const isDarkMode = preferDarkMode(props);
  THEME = isDarkMode ? { ...DARK_THEME } : { ...LIGHT_THEME };
  Object.entries(props)
    .filter(([k, v]) => v && /^theme[A-Z]/.test(k))
    .map(([k, v]) => [normalizeKey(k), v])
    .forEach(([k, v]) => (THEME[k] = v));
  Object.entries(THEME).forEach(([k, v]) => style.setProperty(`--${k}`, v));
  return isDarkMode ? 'dark' : 'light';
};
