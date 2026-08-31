# Production Header Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the current glass header while making its desktop, keyboard, mobile, route, and logo behavior release-ready.

**Architecture:** `SiteHeader` will own all navigation state and lifecycle effects. A focused `BrandLogo` component will render the existing official wordmarks; compact product scenes will keep `BrandMark`. Styling remains in the existing CSS system and content remains in `enterpriseContent.js`.

**Tech Stack:** React 19, React Router 7, Lucide React, CSS, Vitest, Testing Library

**Repository note:** This workspace has no Git metadata, so commit steps are replaced by explicit verification checkpoints.

---

### Task 1: Official Wordmark Variants

**Files:**
- Create: `src/components/BrandLogo.jsx`
- Create: `src/components/BrandLogo.test.jsx`
- Modify: `src/components/SiteFooter.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write the failing logo-variant test**

```jsx
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BrandLogo from './BrandLogo';

describe('BrandLogo', () => {
  it('uses the official wordmark for the requested surface', () => {
    const { container, rerender } = render(<BrandLogo variant="dark" />);
    expect(container.querySelector('img')).toHaveAttribute('src', '/assets/logo-dark.svg');

    rerender(<BrandLogo variant="light" />);
    expect(container.querySelector('img')).toHaveAttribute('src', '/assets/logo-light.svg');
  });
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npm test -- --run src/components/BrandLogo.test.jsx`

Expected: FAIL because `BrandLogo.jsx` does not exist.

- [ ] **Step 3: Implement the wordmark component**

```jsx
export default function BrandLogo({ variant = 'dark' }) {
  const source = variant === 'light' ? '/assets/logo-light.svg' : '/assets/logo-dark.svg';
  return <img className={`brand-logo brand-logo--${variant}`} src={source} alt="" aria-hidden="true" />;
}
```

- [ ] **Step 4: Use the light wordmark in the footer**

Replace the footer's `BrandMark` import and branded link with:

```jsx
import BrandLogo from './BrandLogo';

<Link className="brand" to="/" aria-label="Controllo home">
  <BrandLogo variant="light" />
</Link>
```

- [ ] **Step 5: Add stable wordmark dimensions**

```css
.brand-logo {
  display: block;
  width: 148px;
  height: 32px;
  object-fit: contain;
  object-position: left center;
}
.site-footer .brand-logo { width: 164px; height: 38px; }
```

- [ ] **Step 6: Run the focused test and verify it passes**

Run: `npm test -- --run src/components/BrandLogo.test.jsx`

Expected: 1 test passed.

### Task 2: Header State and Interaction Behavior

**Files:**
- Create: `src/components/SiteHeader.test.jsx`
- Modify: `src/components/SiteHeader.jsx`
- Modify: `src/components/SiteLayout.jsx`
- Modify: `src/context/MotionContext.jsx`
- Modify: `src/App.test.jsx`

- [ ] **Step 1: Write failing interaction tests**

Create focused tests that render `SiteHeader` in `MemoryRouter` and assert:

```jsx
expect(screen.queryByRole('button', { name: /pause motion/i })).not.toBeInTheDocument();
expect(screen.getAllByRole('link', { name: /readiness tour/i })[0]).toHaveAttribute('href', '/demo');

await user.click(screen.getByRole('button', { name: 'Platform' }));
expect(screen.getByRole('button', { name: 'Platform' })).toHaveAttribute('aria-expanded', 'true');

await user.keyboard('{Escape}');
expect(screen.getByRole('button', { name: 'Platform' })).toHaveAttribute('aria-expanded', 'false');
expect(screen.getByRole('button', { name: 'Platform' })).toHaveFocus();

await user.click(screen.getByRole('button', { name: /open menu/i }));
expect(document.body).toHaveStyle({ overflow: 'hidden' });
await user.keyboard('{Escape}');
expect(document.body).not.toHaveStyle({ overflow: 'hidden' });

renderHeader('/platform/risk-management');
expect(screen.getByRole('button', { name: 'Platform' })).toHaveAttribute('aria-current', 'page');
expect(document.querySelector('.site-header .brand-logo')).toHaveAttribute('src', '/assets/logo-dark.svg');
```

For hover, temporarily mock `matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1081px)')` with `matches: true`, call `user.hover(Platform)`, and assert the panel appears.

- [ ] **Step 2: Run the focused tests and verify they fail**

Run: `npm test -- --run src/components/SiteHeader.test.jsx src/App.test.jsx`

Expected: FAIL because the pause control still exists and the new close, logo, active-state, and scroll-lock behavior is absent.

- [ ] **Step 3: Move header state into `SiteHeader`**

Implement these owned values and refs:

```jsx
const [menuOpen, setMenuOpen] = useState(false);
const [openGroup, setOpenGroup] = useState(null);
const headerRef = useRef(null);
const menuButtonRef = useRef(null);
const triggerRefs = useRef(new Map());
const closeTimerRef = useRef(null);
const { pathname } = useLocation();
```

Use `window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1081px)').matches` before opening from pointer hover. Use a 160 ms close timer and clear it when the pointer re-enters the group or panel.

- [ ] **Step 4: Add deterministic close effects**

Add effects with cleanup for:

```jsx
// Route change
setMenuOpen(false);
setOpenGroup(null);

// Outside pointer
if (!headerRef.current?.contains(event.target)) closeAll();

// Escape
const focusTarget = menuOpen ? menuButtonRef.current : triggerRefs.current.get(openGroup);
closeAll();
requestAnimationFrame(() => focusTarget?.focus());

// Mobile body lock
const previousOverflow = document.body.style.overflow;
document.body.style.overflow = menuOpen ? 'hidden' : previousOverflow;
return () => { document.body.style.overflow = previousOverflow; };
```

- [ ] **Step 5: Render accessible group and mobile controls**

Each group trigger must render:

```jsx
<button
  ref={(node) => node && triggerRefs.current.set(group.label, node)}
  type="button"
  aria-expanded={openGroup === group.label}
  aria-controls={`nav-panel-${group.label.toLowerCase()}`}
  aria-current={isGroupActive(group) ? 'page' : undefined}
  onClick={() => setOpenGroup((current) => current === group.label ? null : group.label)}
>
```

The mobile menu button controls `primary-navigation`. The header home link uses `<BrandLogo variant="dark" />`. Add a mobile readiness-tour link inside the primary navigation and keep the existing desktop readiness-tour link.

- [ ] **Step 6: Remove manual motion state from the header path**

`SiteLayout` renders `<SiteHeader />` and no longer owns menu state or Escape listeners. `MotionContext` exposes only `motionEnabled: !useReducedMotion()`; remove `paused`, `toggleMotion`, and unused state. Replace the old pause/resume test with an assertion that no manual motion button is rendered.

- [ ] **Step 7: Run focused tests and verify they pass**

Run: `npm test -- --run src/components/SiteHeader.test.jsx src/components/BrandLogo.test.jsx src/App.test.jsx`

Expected: all focused header, logo, and application tests pass.

### Task 3: Responsive and Hover Styling

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Add robust desktop states**

Add active trigger styling and a pointer bridge:

```css
.nav-group > button[aria-current='page'],
.primary-nav > a.active { color: var(--teal); }
.nav-group:has(> button[aria-expanded='true'])::after {
  content: '';
  position: absolute;
  left: -12px;
  right: -12px;
  top: 42px;
  height: 12px;
}
.nav-group > button[aria-expanded='true'] { color: var(--teal); }
```

Keep the current glass bar, mega-panel shape, spacing, and colors.

- [ ] **Step 2: Add viewport-safe mobile navigation**

Within the existing `max-width: 1080px` rules, set the open navigation to `max-height: calc(100dvh - 112px); overflow-y: auto; overscroll-behavior: contain;`. Keep accordion panels in normal flow.

Add:

```css
.primary-nav__mobile-cta { display: none; }
@media (max-width: 760px) {
  .primary-nav__mobile-cta { display: inline-flex; margin-top: 8px; }
  .brand-logo { width: 132px; height: 28px; }
}
```

- [ ] **Step 3: Run the full automated suite**

Run: `npm test -- --run`

Expected: all test files and tests pass.

- [ ] **Step 4: Run the production build**

Run: `npm run build`

Expected: Vite exits successfully and writes `dist/`.

- [ ] **Step 5: Browser verification**

Start the development server and inspect 375 x 812, 768 x 1024, 1024 x 768, and 1440 x 1000. Confirm every item in the approved spec's Browser checks, including real pointer travel across the hover gap and logo contrast in the light header and dark footer.

### Task 4: Context and Cleanup

**Files:**
- Modify: `docs/ROADMAP.md`
- Remove: `.superpowers/brainstorm/53784-1787564548/`

- [ ] **Step 1: Update current progress**

Record the production-header hardening as implemented only after automated and browser verification succeed. Keep unresolved global launch blockers unchanged.

- [ ] **Step 2: Remove visual-companion scratch files**

Remove only the generated brainstorming session directory after the design is no longer needed. Leave the approved spec and this plan in `docs/superpowers/`.

- [ ] **Step 3: Final verification checkpoint**

Run `npm test -- --run` and `npm run build` again after documentation and cleanup. Confirm the scratch directory is absent and the approved header files remain.
