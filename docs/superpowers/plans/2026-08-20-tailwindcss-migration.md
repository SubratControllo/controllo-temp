# Tailwind CSS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Tailwind CSS to the Vite React app and migrate the homepage hero shell to utility-first styling without breaking the current visual system.

**Architecture:** Tailwind is added as a Vite plugin and imported at the top of the existing stylesheet so generated utilities coexist with the current site CSS. The migration is staged: JSX can adopt Tailwind classes while legacy component selectors remain as compatibility styles for detailed animations and product mockups.

**Tech Stack:** React 19, Vite 8, Tailwind CSS v4 Vite plugin, Vitest, Testing Library.

---

### Task 1: Add Tailwind Migration Regression Test

**Files:**
- Modify: `src/App.test.jsx`

- [ ] **Step 1: Add a test that expects Tailwind hero layout utilities**

```jsx
it('renders the homepage hero with Tailwind layout utilities during the migration', () => {
  renderRoute();

  const hero = screen.getByRole('region', { name: /continuous compliance hero/i });
  expect(hero).toHaveClass('hero');
  expect(hero.className).toContain('min-h-[1012px]');
  expect(hero.className).toContain('-mt-[150px]');
  expect(hero.className).toContain('pt-[220px]');
  expect(hero.className).toContain('pb-0');
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npm test -- --run src/App.test.jsx -t "Tailwind layout utilities"`
Expected: FAIL because the hero section does not yet expose the accessible region name or Tailwind classes.

### Task 2: Install and Configure Tailwind

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.js`
- Modify: `src/styles.css`

- [ ] **Step 1: Install Tailwind packages**

Run: `npm install tailwindcss @tailwindcss/vite`
Expected: `tailwindcss` and `@tailwindcss/vite` are added to dependencies or dev dependencies and the lockfile is updated.

- [ ] **Step 2: Configure Vite plugin**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true
  }
});
```

- [ ] **Step 3: Import Tailwind in CSS**

```css
@import "tailwindcss";
```

Place this line at the top of `src/styles.css` before custom variables and component CSS.

### Task 3: Migrate Hero Shell to Tailwind Utilities

**Files:**
- Modify: `src/sections/HeroSection.jsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Add accessible region name and Tailwind classes to the hero section**

```jsx
<section
  className="hero relative min-h-[1012px] -mt-[150px] overflow-hidden pt-[220px] pb-0"
  id="top"
  ref={sectionRef}
  aria-label="Continuous compliance hero"
>
```

- [ ] **Step 2: Remove duplicated hero box-model declarations from legacy CSS**

```css
.hero { background: radial-gradient(circle at 82% 26%,rgba(38,216,173,.24),transparent 30%),linear-gradient(180deg,#f8fbfa 0%,var(--mist) 74%,var(--mint-soft) 100%); }
```

Keep the mobile media override until the rest of the hero is migrated, because it protects the current responsive layout.

- [ ] **Step 3: Run the focused test and verify it passes**

Run: `npm test -- --run src/App.test.jsx -t "Tailwind layout utilities"`
Expected: PASS.

### Task 4: Verify Migration

**Files:**
- No source edits unless verification exposes a regression.

- [ ] **Step 1: Run the full test suite**

Run: `npm test -- --run`
Expected: all test files pass with no failures.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: Vite builds successfully and emits CSS/JS assets.

- [ ] **Step 3: Rollback path**

If Tailwind causes build or visual regressions, revert `vite.config.js`, remove `@import "tailwindcss";`, remove Tailwind classes from `HeroSection.jsx`, and restore the `.hero` box-model declarations in `src/styles.css`.
