# Controllo Website

Public marketing website for Controllo, a continuous compliance platform connecting controls, evidence, risk, audit work, and accountable owners.

## Current Status

The repository contains a working React/Vite single-page marketing site. It includes a frozen homepage baseline, a release-hardened header, dedicated Cybersecurity, AI Governance, Risk Management, Continuous Compliance, Audit Management, Cloud Monitoring, and Secura AI routes, searchable framework and integration directories, a live-article resource index, static pages, an email-based demo handoff, metadata, sitemap, robots rules, reduced-motion support, and static-host SPA fallback.

This is not yet a production-launch declaration. Legal copy, live lead delivery, trial handoff, analytics consent enforcement, content approval, deployment verification, and final SEO coverage remain tracked in [the roadmap](docs/ROADMAP.md). AI-assisted contributors should start with [the compact agent brief](docs/AGENT_BRIEF.md).

## Local Setup

Requirements:

- Node.js 20 or newer
- npm 10 or newer

Install and start the site:

```bash
npm install
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`.

The current public flow requires no environment values. Demo requests open the visitor’s email client with the published Controllo sales address, and self-service trial promotion remains hidden until its external activation path is approved.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm test -- --run` | Run the test suite once |
| `npm test` | Run tests in watch mode |
| `npm run build` | Create the production bundle in `dist/` |
| `npm run preview` | Serve the built bundle locally |
| `npm run seo:check` | Validate route metadata, canonicals, schema, sitemap settings, and redirects |
| `npm run seo:links` | Check static internal links and report pending WordPress cutover paths |
| `npm run seo:prerender:check` | Render every registered route in memory and verify crawler-critical HTML |
| `npm run seo:generate` | Regenerate sitemap, robots, redirects, headers, and SEO reports |

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
