const LIGHT_THEME = {
  'primary-text': '#25313b',
  'neutral-text': '#777777',
  'background': '#ffffff',
  'hover-background': '#eeeeee',
  'accent-text': '#5f7796',
  'header-text': '#ffffff',
  'header-accent-text': '#7b9ac2',
  'header-background': '#25313b',
  'footer-text': '#ffffff',
  'footer-neutral-text': '#adbacd',
  'footer-background': '#344251',
};
const DARK_THEME = {
  'primary-text': '#98a8bd',
  'neutral-text': '#6d7fab',
  'background': '#22272e',
  'hover-background': '#343a4b',
  'accent-text': '#5c88ff',
  'header-text': '#ffffff',
  'header-accent-text': '#7ea1ff',
  'header-background': '#333a45',
  'footer-text': '#ffffff',
  'footer-neutral-text': '#98afcf',
  'footer-background': '#344251',
};

const LOCAL_STORAGE_THEME = 'registryUiTheme';

let THEME;

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
  THEME = isDarkMode ? { ...DARK_THEME } : { ...LIGHT_THEME };
  Object.entries(props)
    .filter(([k, v]) => v && /^theme[A-Z]/.test(k))
    .map(([k, v]) => [normalizeKey(k), v])
    .forEach(([k, v]) => (THEME[k] = v));
  Object.entries(THEME).forEach(([k, v]) => style.setProperty(`--${k}`, v));
  const theme = isDarkMode ? 'dark' : 'light';
  localStorage.setItem(LOCAL_STORAGE_THEME, theme);
  return theme;
};
