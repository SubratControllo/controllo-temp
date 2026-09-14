# Controllo Website

Public marketing website for Controllo, a continuous compliance platform connecting controls, evidence, risk, audit work, and accountable owners.

## Current Status

The repository contains a working React/Vite single-page marketing site. It includes a frozen homepage baseline, a release-hardened header, dedicated Cybersecurity, AI Governance, Risk Management, and Continuous Compliance routes, searchable framework and integration directories, resource/static pages, browser-side demo form handling, metadata, sitemap, robots rules, reduced-motion support, and static-host SPA fallback.

This is not yet a production-launch declaration. Legal copy, live lead delivery, trial handoff, analytics consent enforcement, content approval, deployment verification, and final SEO coverage remain tracked in [the roadmap](docs/ROADMAP.md). AI-assisted contributors should start with [the compact agent brief](docs/AGENT_BRIEF.md).

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
- [Compact AI agent brief](docs/AGENT_BRIEF.md)
- [Page creation brief](docs/PAGE_CREATION_BRIEF.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Current progress and roadmap](docs/ROADMAP.md)
- [Future scope register](docs/FUTURE_SCOPE.md)
- [Design operating guide](DESIGN.md)
- [Design system](design-system/controllo-compliance-current/MASTER.md)
- [Design skill inventory](docs/agents/design-skills.md)

AI-assisted contributors should also read [AGENTS.md](AGENTS.md).
