# Controllo Website

Public marketing website for Controllo, a continuous compliance platform connecting controls, evidence, risk, audit work, and accountable owners.

## Current Status

The repository contains a working React/Vite single-page application with:

- A product-led homepage and frozen, release-hardened responsive header baseline
- A frozen homepage hero Focus Stack with responsive dashboard depth, mobile-safe event cards, header-matched primary CTA hover, and reduced-motion coverage
- A frozen homepage narrative with three manually selected governance domains, connected risk and cloud capabilities, framework reuse, Secura AI, WordPress article links, and a final trial-intent CTA
- An approved two-tone “Fast Compliance, Smarter Audit Readiness” hero narrative with quantitative framework, control, and mapping proof plus a demo-request primary action and low-friction platform exploration
- A one-time Signal Lock header entrance and shared motion-safe demo-request shine
- A viewport-only Secura product loop that opens on a compact control-detail preview with connected context, review scope, and the real gradient Secura banner, sends a deterministic review request, and resolves into a reviewable gap assessment with an action-ready Secura recommendation tray, with a static reduced-motion result state
- Tailwind CSS v4 utilities colocated with React components, backed by shared design tokens and a small effects stylesheet
- Lazy route boundaries, shared directory controls, and indexed content lookups prepared for larger content collections
- Platform and solution detail routes, including a dedicated six-section Cybersecurity route plus cloud monitoring, privacy operations, and AI governance
- Searchable framework and integration directories
- Framework detail pages for SOC 2, ISO 27001, and HIPAA
- Resource, package, company, security, privacy-policy, terms, and accessibility pages
- A demo-request form with validation, spam honeypot, optional HTTP submission, and optional calendar handoff
- Per-route metadata, structured data, sitemap, robots rules, and a static-host SPA fallback
- Operating-system reduced-motion support and a WebGL visual with a static fallback

The last full validation on 2026-08-24 recorded 18 passing tests and a successful production build. The header baseline was frozen on 2026-08-25, the homepage hero Focus Stack on 2026-08-26, and the complete homepage narrative on 2026-08-29 after focused tests and responsive browser QA. The frozen homepage and shared-header **Start free trial** actions intentionally lead to pricing until the separate registration/payment flow is connected. On the dedicated Cybersecurity route, a valid configured `VITE_TRIAL_URL` hands off to the external trial application in the current tab; an absent or invalid value falls back to pricing. The full suite and production build have not been rerun. This is not yet a production-launch declaration. Legal copy, live lead delivery, trial handoff, analytics consent enforcement, content approval, and final SEO coverage remain tracked in [the roadmap](docs/ROADMAP.md).

## Local Setup

Requirements:

- Node.js 20 or newer
- npm 10 or newer

Install and start the site:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`.

The site works without environment values. In that mode, demo requests are simulated in the browser and no lead is delivered externally.

## Environment

```dotenv
VITE_LEAD_ENDPOINT=https://example.com/api/leads
VITE_DEMO_CALENDAR_URL=https://example.com/book
VITE_TRIAL_URL=https://trial.example.com/start
```

`VITE_TRIAL_URL` is the optional public absolute HTTP(S) handoff owned by the external trial application. When it is absent or invalid, Cybersecurity page trial actions remain visible and lead to `/pricing`. The marketing site does not implement registration, payment, provisioning, onboarding, or trial-duration logic.

All three values are optional. Every `VITE_*` variable is embedded in client-side code and must be safe to expose publicly. The lead endpoint must accept the browser JSON request described in [the architecture](docs/ARCHITECTURE.md).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm test -- --run` | Run the test suite once |
| `npm test` | Run tests in watch mode |
| `npm run build` | Create the production bundle in `dist/` |
| `npm run preview` | Serve the built bundle locally |

## Project Guide

| Area | Location |
| --- | --- |
| Routes | `src/App.jsx` |
| Page composition | `src/pages/` |
| Homepage sections | `src/sections/` |
| Shared UI | `src/components/` |
| Site content | `src/data/` |
| Browser integrations | `src/services/` |
| Styling | `src/styles.css` |
| Static hosting files | `public/` |

## Documentation

- [Domain language](CONTEXT.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Current progress and roadmap](docs/ROADMAP.md)
- [Design system](design-system/controllo-compliance-current/MASTER.md)

AI-assisted contributors should also read [AGENTS.md](AGENTS.md).
