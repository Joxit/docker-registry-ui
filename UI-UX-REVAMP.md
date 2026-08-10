# Docker Registry UI — UI/UX Revamp Plan

Branch: `feat/ui-ux-revamp`
Status: **implemented** (see [Implementation status](#12-implementation-status))
Decisions locked in with the author:
- **Design direction (revised):** modern SaaS shell (sidebar + topbar, clean surfaces, data tables, system font stack) — supersedes the earlier Material 3 direction
- **Component library (revised):** replace `riot-mui` entirely with a custom, dependency-free component system
- **UX depth:** rethink information architecture and workflows, not just visuals

## 1. Goals

1. Move from the dated Material-2 card/table aesthetic to a coherent Material 3 design system.
2. Introduce a real design-token layer (color, shape, elevation, type, spacing, motion) so the UI is consistent and themable.
3. Rethink navigation: breadcrumbs, a proper registry switcher, clearer page structure.
4. Fix the weakest UX surfaces: empty/loading/error states, dense right-aligned tag table, discovery of copy/delete/history actions, mobile behavior, accessibility.
5. Keep **all** existing behavior and configuration backward-compatible (env vars, `THEME_*`, `SINGLE_REGISTRY`, read-only registries, multi-select delete, search shortcuts, `?url=` query param, etc.). This is UI-only; the registry API integration must not change.

Non-goals: changing the tech stack (Riot.js / riot-mui / Rollup stay), changing the docker registry API contract, re-platforming.

## 2. Current-state assessment

### Architecture
- Root chrome: `src/components/docker-registry-ui.riot` — `material-navbar` (title + search + registry dropdown) / routed `<main>` / `material-footer` (theme switch).
- Routes (`src/scripts/router.js`, `@riotjs/route`): `catalog` → `taglist/<image>` → `taghistory/<image>/<tag>`.
- Data layer: `src/scripts/http.js` (XHR wrapper + auth + digest), `src/scripts/docker-image.js` (observable `DockerImage` model with `get-size/date/digest/sha256`, multi-arch manifest handling). This layer is solid — leave it alone.
- Theming: `src/scripts/theme.js` writes 13 CSS vars (`--primary-text`, `--background`, `--accent-text`, header/footer colors…) to `documentElement.style`; light/dark/auto via `localStorage` + `prefers-color-scheme`; `THEME_*` props override.

### Visual/UX problems to fix
- **Design tokens:** colors only. No shape, elevation, type, spacing, or motion scale. Px values scattered in component `<style>` blocks and `src/style.scss` (hardcoded `rgba(0,0,0,.12)` borders, 48px rows, fixed shadows).
- **Header/footer:** generic Material navbar/footer; the registry dropdown is a hidden `more_vert` menu. No breadcrumbs — a tag list has only a back arrow.
- **Catalog:** nested expandable `material-card` tree with stacked-card "slide" animation and `z-index` tricks (`catalog-element.riot`) — fragile and dated. Counts in the title. Search only filters in-page.
- **Tag table (`tag-table.riot`):** dense, **right-aligned** cells, relative dates, sort arrows via `:before` glyphs, hover-only affordances, content digest hidden <1024px, no sticky header. Multi-delete via hidden-label checkbox + `Shift`/`Alt+Click` (undiscoverable).
- **History:** floating 420px-wide tiles (`tag-history-element.riot`) inside cards; no grouping into config vs layers.
- **States:** loading = bare spinner only; no skeletons; empty catalog renders nothing; error page is plain text templates.
- **Accessibility:** checkbox labels hidden, some icon buttons lack labels, focus-visible states not handled, `:host` scoped styles block `user-select` on checkboxes.
- **Responsive:** search hidden <400px, digest hidden <1024px, no adaptive layouts for the table.

## 3. Design system — Material 3 foundation

### 3.1 Token files
New global stylesheet `src/styles/tokens.scss`, imported first in `src/index.js` (before component styles). `:root` holds light tokens; a `[data-theme='dark']` (or the existing inline-style mechanism — see 3.3) holds dark tokens.

Token groups (all as CSS custom properties):

- **Color roles** (M3 semantic roles):
  - `--m3-primary`, `--m3-on-primary`, `--m3-primary-container`, `--m3-on-primary-container`
  - `--m3-secondary`, `--m3-on-secondary`, `--m3-secondary-container`, `--m3-on-secondary-container`
  - `--m3-surface`, `--m3-surface-dim`, `--m3-surface-bright`
  - `--m3-surface-container-lowest/-low/medium(-container)/high/highest`
  - `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-surface-variant`
  - `--m3-outline`, `--m3-outline-variant`
  - `--m3-error`, `--m3-on-error`, `--m3-error-container`, `--m3-on-error-container`
  - `--m3-inverse-surface`, `--m3-inverse-on-surface`, `--m3-inverse-primary`
  - `--m3-state-hover/-focus/-pressed` (state-layer alphas)
- **Shape:** `--shape-xs: 4px; --shape-sm: 8px; --shape-md: 12px; --shape-lg: 16px; --shape-xl: 28px; --shape-full: 9999px`
- **Elevation:** `--elevation-0..5` as M3 tonal shadows (keep `--elevation-1` ~ cards, `--elevation-3` ~ dialogs/popups, `--elevation-5` ~ floating menus)
- **Type scale** (M3): `--type-{display/hl/title/body/label}-{large/medium/small}` as font-size/weight/line-height combos. Primary scale in use: title-large (headers), title-medium (section titles), body-medium/large (cells), label-large (buttons/tabs).
- **Spacing** (4px base): `--space-1: 4px; -2: 8px; -3: 12px; -4: 16px; -6: 24px; -8: 32px; -12: 48px; -16: 64px`
- **Motion:** `--motion-duration-{short:200ms, medium:400ms, long:500ms}`, `--motion-easing-{standard: cubic-bezier(.2,0,0,1); decelerate: cubic-bezier(0,0,0,1); accelerate: cubic-bezier(.3,0,1,1)}`

### 3.2 Theme values (default palette, Docker-blue flavored)

Light:
| Token | Value | | Token | Value |
|---|---|---|---|---|
| primary | `#0b57d0` | | on-primary | `#ffffff` |
| primary-container | `#d8e2ff` | | on-primary-container | `#001a41` |
| secondary | `#575e71` | | secondary-container | `#dbe1f9` |
| surface | `#faf9fd` | | on-surface | `#1a1c20` |
| surface-variant | `#e1e2ec` | | on-surface-variant | `#44464f` |
| outline | `#74777f` | | outline-variant | `#c4c6d0` |
| error | `#ba1a1a` | | on-error | `#ffffff` |
| surface-container-lowest | `#ffffff` | | surface-container | `#eef0f4` |
| surface-container-high | `#e8e9ee` | | surface-container-highest | `#e2e3e9` |

Dark:
| Token | Value | | Token | Value |
|---|---|---|---|---|
| primary | `#acccff` | | on-primary | `#003061` |
| primary-container | `#00458f` | | on-primary-container | `#d8e2ff` |
| secondary | `#bfc6dc` | | secondary-container | `#3f4759` |
| surface | `#121317` | | on-surface | `#e2e2e9` |
| surface-variant | `#44464f` | | on-surface-variant | `#c4c6d0` |
| outline | `#8e9099` | | outline-variant | `#44464f` |
| error | `#ffb4ab` | | on-error | `#690005` |
| surface-container-lowest | `#0c0e13` | | surface-container | `#1c1d21` |
| surface-container-high | `#27272c` | | surface-container-highest | `#323237` |

### 3.3 Backward-compatible theme wiring
`src/scripts/theme.js` keeps its current contract (light/dark/auto, `localStorage` key `registryUiTheme`, `prefers-color-scheme`, `THEME_*` env overrides) but now emits the full M3 token set. Approach:
- Add a **legacy→M3 alias layer**: existing consumers still read `--background`, `--primary-text`, `--accent-text`, `--hover-background`, header/footer vars, so keep emitting them as aliases of the M3 roles they map to:
  - `--primary-text` → `--m3-on-surface`
  - `--neutral-text` → `--m3-on-surface-variant`
  - `--background` → `--m3-surface`
  - `--hover-background` → `--m3-surface-container-highest`
  - `--accent-text` → `--m3-primary`
  - header/footer vars → derived from a new `--m3-header-*`/`--m3-footer-*` set (keep current defaults)
- Normalize `THEME_*` props through the same alias mapping so existing configs keep working (e.g. `THEME_PRIMARY_TEXT` still sets `--primary-text`, which now also propagates to `--m3-on-surface`). Do not re-key the env vars.
- Apply tokens to `documentElement.style` as today (no `[data-theme]` rewrite needed → smallest diff, works with the existing `theme-switch`).

### 3.4 riot-mui restyle layer
New file `src/styles/m3-overrides.scss`, imported after the riot-mui component SCSS in `src/style.scss`. Targets only layout/skin of riot-mui internals, referenced by their class names (as the current code already does, e.g. `.material-card-title-action`):
- Buttons → M3 button variants: filled (primary container), tonal (secondary container), text/icon (transparent, `--shape-full` pill, state-layer hover via `--m3-state-hover`).
- Card → surface-container + `--elevation-1` + `--shape-md`; remove hardcoded `box-shadow` from `material-tabs` in `style.scss`.
- Checkbox/switch → M3 control colors (primary selected, outline unselected, state layers).
- Input/popup/dropdown/snackbar → M3 surface/outline/error tokens, `--shape-sm`, elevation per hierarchy.
- **Remove the old flat table chrome** in `src/style.scss`: `rgba(0,0,0,.12)` borders → `--m3-outline-variant`, right-aligned cells → left-aligned defaults, 13px font → `--type-body-medium`.

> Note: riot-mui is pinned to a fork commit (`github:joxit/riot-5-mui#a477acc`). If a token needs to change in the fork (e.g. button paddings), prefer CSS overrides here over bumping the pin; only touch the pin if a structural class is missing.

## 4. Information architecture & navigation

### 4.1 Navigation model
Adopt the M3 **top app bar + content sections** model (lowest risk vs. a sidebar; catalog/taglist/history are a 1-level-deep drill-down, not a multi-section app):
- **Top app bar** (`docker-registry-ui.riot`): logo/title (left, unchanged behavior), global search (center, current `search-bar`), registry indicator + switcher (right).
- **Breadcrumbs** — new `src/components/breadcrumbs.riot`: rendered under the app bar.
  - Catalog: `Repositories`
  - Tag list: `Repositories / <namespace> / <image>`
  - History: `Repositories / <image> / <tag>`
  - Each segment is a link back; replaces the lone back-arrow affordance.
- Footer: keep minimal (version + license + theme switch); align with M3 surface container.

### 4.2 Registry switcher workflow (replaces `dialogs-menu`)
New `src/components/registry-menu.riot` (rename of `dialogs-menu` or in-place rework):
- Button shows **current registry URL** (truncated) with an expand icon, not a bare `more_vert`.
- Dropdown lists saved registries (from `getRegistryServers()`), marks the active one, and offers Add / Change / Remove.
- Add/Change/Remove dialogs keep their logic (`add-registry-url.riot`, `change-registry-url.riot`, `remove-registry-url.riot`) but restyled as M3 dialogs (title/content/actions, `--elevation-3`, `--shape-xl`).
- Respect `readOnlyRegistries` (hide add/remove) and `singleRegistry` (hide the whole menu) exactly as today.
- Keep `?url=` query-param behavior and localStorage sync untouched.

### 4.3 Page structure (per screen)
- **Catalog:** toolbar (title + counts + per-repo tag counts unchanged semantics) + search filter + repository list.
- **Tag list:** toolbar (back → breadcrumb, image name, counts) + tag table + pagination (bottom; keep top only while beneficial).
- **History:** toolbar (image:tag, arch tabs, Dockerfile action) + metadata sections.

## 5. Screen-by-screen redesign

### 5.1 Catalog (`catalog.riot`, `catalog-element.riot`)
- Replace the nested stacked-card animation with a **M3 list/tree**: rows with leading icon (`send` kept), repository name, tag-count badge (`--m3-secondary-container` pill), expand chevron (`expand_more` rotating), indent guides for nested namespaces. Drop the `z-index`/negative-margin collapse trick; use `max-height` transition or simply show/hide subtrees.
- Row hover → `--m3-state-hover`; selected/expanded → `--m3-secondary-container`.
- Keep `CATALOG_MIN_BRANCHES`/`MAX_BRANCHES` branching behavior (logic in `src/scripts/repositories.js` unchanged).
- Empty state (see 6.3).
- Loading → skeleton rows (see 6.2) instead of only a spinner.

### 5.2 Tag list (`tag-table.riot`, subcomponents in `tag-list/`)
- Restyle as an M3 **data table**: sticky header (reuse `position: sticky`), left-aligned columns, `--m3-outline-variant` row dividers, hover + focus-visible row states.
- Column order proposal (respect `SHOW_CONTENT_DIGEST`, `SHOW_TAG_HISTORY`, `DELETE_IMAGES` flags): checkbox (when multi-delete) | **Tag** (with copy) | Size | Creation date | Arch (badges) | Content digest (with copy) | History | Delete.
- Sort: keep date/size/tag column sorting, restyle the sort indicator as a visible arrow icon (Material Symbols `arrow_upward`/`arrow_downward`) rather than `:before` glyphs.
- Copy affordances: make `copy-to-clipboard.riot` a real icon button (Content Copy) with label, not a trailing ghost; keep `docker pull` copy.
- Multi-delete workflow: 
  - Header checkbox keeps `Alt+Click` select-all and `Shift+Click` range behaviors (README documented features — must not break).
  - When `toDelete` is non-empty, show an **M3 selection bar** (floating, `--elevation-3`) with "N selected" + Delete + Clear instead of replacing the header cell with a lone delete icon.
  - `confirm-delete-image.riot` dialog: list affected `name:tag`, add the "same SHA deletes all matching tags" warning text, use M3 dialog + error-tinted delete button.
- Empty/filtered-no-match state per 6.3.

### 5.3 History (`tag-history.riot`, `tag-history-element.riot`)
- Replace floating 420px tiles with **sectioned M3 cards**: "Image config" card (os/arch/author/created/version/labels…), then "Layers" card(s) with one definition row per layer (created / created_by / size / id), each row with its existing icon.
- Keep arch tabs for multi-arch (`material-tabs`, restyled) and the Dockerfile button.
- Dockerfile dialog (`dockerfile.riot`): restyle content as a code panel (`--m3-surface-variant`, mono font, keyword highlight kept) inside an M3 dialog.

### 5.4 Dialogs (all in `dialogs/`)
Uniform M3 dialog treatment: surface container + `--elevation-3` + `--shape-xl`, title (title-large), content (body-medium), action row with **filled** (primary) confirm and **text** cancel. Applies to add/change/remove registry, confirm-delete, dockerfile.

### 5.5 Search (`search-bar.riot`)
- Keep global in-page filtering + `Ctrl+F`/`F3` shortcut behavior.
- Restyle to an M3 search bar in the app bar; add a **clear (X) button** and match-count/empty hint.
- Keep hiding under 400px on mobile, but ensure a visible search entry point (see 7).

### 5.6 Version notification
Keep `version-notification.riot` behavior; restyle to M3 (pill/alert with link + dismiss).

## 6. States & responsive

### 6.1 Motion
Centralize in tokens. Add subtle page transitions (fade/slide on route change), list-row appearance, and state-layer transitions using `--motion-*`. Wrap all motion in `@media (prefers-reduced-motion: reduce)` → durations near 0.

### 6.2 Loading
Add skeleton components (`src/components/skeletons/*.riot` or CSS-only shimmer rows) for catalog and tag-table while `loadend` is false; keep the spinner for short ops (e.g. dialogs).

### 6.3 Empty / error
- **Empty catalog** (0 repos): icon + "No repositories found" + CTA (Add registry when allowed; else guidance link to FAQ).
- **Filtered no-match:** "No results for '<query>'" with clear-search action.
- **Error page** (`error-page.riot`): keep all existing codes/templates (404, mixed content, incorrect URL, pagination, branching config) but restyle into an M3 layout (surface card, `--m3-error` accent, code blocks on `--m3-surface-variant`).

### 6.4 Responsive
- App bar: search collapses into the bar under 600px (icon → expandable field) instead of disappearing entirely.
- Tag table: under ~700px render each tag as a **stacked card** (name, meta rows, actions) — reuse the same `DockerImage` model so no data changes.
- Catalog tree: keep indent but reduce density on small screens.
- Pagination: fewer visible page buttons on small widths (already parametrized via `getPageLabels`).

## 7. Accessibility
- Visible `:focus-visible` ring using `--m3-primary` (2px offset) on all interactive elements.
- `aria-label`s on all icon-only buttons (copy, delete, history, back, sort, theme switch).
- Un-hide checkbox labels or add accessible names for the tag multi-delete checkboxes.
- Left-align table text; ensure contrast against `--m3-*` roles (M3 palettes above meet 4.5:1 for body text).
- Keep keyboard flows: `Ctrl+F`/`F3` focus, `Alt+Click`/`Shift+Click` multi-select (document in README already), dialog focus trap (verify riot-mui popup behavior; add trap if missing).

## 8. Implementation roadmap

Ordered by dependency (each step ends green: `npm run build`, `npm test`, `npm run format`).

1. **Tokens + base** — add `src/styles/tokens.scss`; rewire `src/scripts/theme.js` to emit M3 + legacy aliases; strip hardcoded shadows/borders in `src/style.scss` to tokens.
   → verify: light/dark still render, env `THEME_*` overrides still work.
2. **riot-mui override layer** — `src/styles/m3-overrides.scss`; restyle navbar/footer/button/card/checkbox/switch/input/popup/dropdown/snackbar/tabs.
3. **Chrome & IA** — breadcrumbs component + route wiring; rework registry menu (current-URL button, list, add/change/remove restyled); app-bar search restyle.
4. **Catalog redesign** — list/tree rows, badges, states, skeletons.
5. **Tag table redesign** — M3 table, sort indicators, copy buttons, selection bar, confirm-delete dialog, responsive stacked cards.
6. **History + dialogs** — sectioned cards, Dockerfile panel, uniform M3 dialogs.
7. **States, motion, a11y, responsive polish** — skeletons, empty states, error page, focus rings, aria labels, reduced-motion, mobile pass.
8. **Docs & screenshots** — update `README.md` (theme/option tables unchanged values, new screenshots), `Developing.md` if needed; update `screenshot.png`/`docker-registry-ui.gif`.

### Files touched (primary)
- New: `src/styles/tokens.scss`, `src/styles/m3-overrides.scss`, `src/components/breadcrumbs.riot`, skeletons, empty-state, selection-bar components.
- Reworked: `src/style.scss`, `src/scripts/theme.js`, `src/index.js` (import order), `docker-registry-ui.riot`, `search-bar.riot`, `dialogs/dialogs-menu.riot` (+ registry dialogs), `catalog/*`, `tag-list/*` (esp. `tag-table.riot`), `tag-history/*`, `error-page.riot`, `version-notification.riot`.
- Untouched (by design): `src/scripts/http.js`, `docker-image.js`, `utils.js`, `router.js`, `repositories.js`, `taglist-order.js`, `cache-request.js`, `error.js`, `test/*`.

## 9. Verification / quality gates
- `npm test` (mocha) — existing unit tests must stay green (utils, taglist-order, repositories, docker-image).
- `npm run build` (rollup) — clean build of `dist/`.
- `npm run format` (prettier) — no formatting drift.
- Manual: `npm start` → http://localhost:8000 with the dev registry; walk catalog → tag list (sort, copy, multi-delete) → history (arch tabs, dockerfile); toggle light/dark; test `?url=`, read-only registries, `SINGLE_REGISTRY=true`.
- New unit tests: theme token emission (light/dark + `THEME_*` override mapping to legacy+M3), breadcrumb/label helpers if extracted as pure functions.
- Screenshots updated in README/demo.

## 10. Open decisions (confirm during implementation)
1. Header top-app-bar color: brand-primary (`--m3-primary`) vs neutral surface. Recommend **primary** for Docker-blue identity (matches current dark header).
2. Whether the catalog keeps a tree (branching) as the default or a flat sortable list with namespaces flattened. Recommend **keep branching** (feature is documented/configurable), just restyled.
3. Mobile tag rendering: stacked cards (recommended) vs horizontally scrollable table.
4. Whether to add a grid/list view toggle on catalog (nice-to-have, defer).

## 11. Out of scope / deferred
- Auth UI beyond the existing basic-auth/bearer dialog (browser prompts) — no change.
- Server-side features, garbage collection integration, push/pull of images.
- i18n (app is English-only) — a future item, noted.
- Migrating off Riot.js / riot-mui — explicitly out of scope for this effort.

## 12. Implementation status

### Revision history
- **Iteration 1 (Material 3):** tokens + riot-mui override layer + chrome/IA + screen restyles. Committed, then **rejected** by the author because the overall layout (Material navbar/cards/tables) still looked unchanged.
- **Iteration 2 (modern SaaS, current):** full rewrite. `riot-mui` removed; custom design system; sidebar + topbar shell; data-table pages; new widget components. See commits after `79c794a`.

### Current state
- Design tokens (`src/styles/tokens.scss`), base/components/layout SCSS, custom widgets (`app-dialog`, `app-snackbar`, `app-tabs`, `app-checkbox`, `text-field`), shell (`docker-registry-ui.riot`), registry panel, catalog, tag list, history, error page, search, version notification — **done**.
- `riot-mui` dependency removed from `package.json`, `index.js`, `style.scss`, and `index.html`.
- Theme overrides (`THEME_*`) still supported via `src/scripts/theme.js` (mapped onto the new tokens).

### Remaining / known gaps
- `screenshot.png` and `docker-registry-ui.gif` in the repo root still show the old design — regenerate with a browser once the UI is visually reviewed.
- Visual QA in a real browser (light/dark, sidebar behavior on mobile, catalog expand, multi-delete, history tabs, registry switch/add/remove) not yet performed by a human.
- Prettier is intentionally not clean on `.riot` files (its HTML parser mangles riot attribute expressions) — pre-existing repo condition.
- `dist/` rebuilds drift slightly (riot compiler `expr` counters) — pre-existing toolchain quirk; Docker copies the committed `dist/`.
- The `THEME_HEADER_*` / `THEME_FOOTER_*` env vars are now legacy aliases (kept for compatibility, no longer affect the layout).
