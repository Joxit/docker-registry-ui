const LIGHT_THEME = {
  'primary-text': '#25313b',
  'neutral-text': '#777',
  'background': '#fff',
  'hover-background': '#eee',
};
const DARK_THEME = {
  'primary-text': '#8A9EBA',
  'neutral-text': '#36527A',
  'background': '#22272e',
  'hover-background': '#30404D',
};

let THEME;

const normalizeKey = (k) =>
  k
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^theme-/, '');

export const loadTheme = (props, style) => {
  THEME = props.theme == 'dark' ? DARK_THEME : LIGHT_THEME;
  Object.entries(props)
    .filter(([k, v]) => v && /^theme[A-Z]/.test(k))
    .map(([k, v]) => [normalizeKey(k), v])
    .forEach(([k, v]) => (THEME[k] = v));
  Object.entries(THEME).forEach(([k, v]) => style.setProperty(`--${k}`, v));
};
