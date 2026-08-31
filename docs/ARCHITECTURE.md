# Architecture

Last reviewed: 2026-08-26

## System Shape

Controllo Website is a client-rendered React 19 single-page application built by Vite 8. It is a marketing site, not the Controllo product application, and it contains no server, database, authentication, or privileged API credentials.

```mermaid
flowchart LR
  Visitor[Browser visitor] --> SPA[React SPA]
  SPA --> Content[Local content modules]
  SPA --> Metadata[Document metadata]
  SPA --> Storage[Local preference storage]
  SPA --> DataLayer[Optional analytics dataLayer]
  SPA -->|Optional POST| LeadEndpoint[External lead endpoint]
  SPA -->|Optional link| Calendar[External booking page]
```

The production artifact is the static `dist/` directory. The host must serve `index.html` for unknown application paths so React Router can resolve deep links. `public/_redirects` provides this rule for compatible static hosts.

## Runtime Composition

`src/main.jsx` mounts the application in this order:

1. React strict mode
2. Browser router
3. `App`
4. Shared motion provider
5. Suspense and route registry
6. Shared site layout
7. Active route page

`src/App.jsx` is the route source of truth. Core pages are loaded immediately; lower-frequency marketing routes are lazy-loaded to create separate build chunks. Product route paths are derived from the product content registry so route and content additions cannot drift apart.

`SiteLayout` owns global behavior shared by every route:

- Shared header placement
- Skip link and main landmark
- Route transition animation
- Scroll restoration to the top
- Footer
- Cookie preference prompt

`SiteHeader` owns its responsive menu and dropdown state, including hover intent, keyboard focus, Escape and outside-click closing, route-family highlighting, and mobile scroll locking. `NavbarIntro` owns the one-time Signal Lock sequence; `HeaderCtaContent` owns the shared readiness-tour label, arrow, and reduced-motion-aware shine used by both the header CTA and homepage hero primary CTA.

## Content Model

The site intentionally keeps content close to the frontend:

- `src/data/enterpriseContent.js` owns navigation, product pages, frameworks, integrations, resources, FAQs, and footer groups.
- `src/data/brandAssets.js` is the runtime registry for locally hosted third-party brand marks; provenance and review status remain beside the files in `public/assets/brands/README.md`.
- `src/data/siteContent.js` owns homepage visualization data and framework-flow labels.
- `src/data/staticPages.js` owns company, security, privacy, terms, and accessibility content; `src/pages/StaticPage.jsx` only composes the shared presentation.
- `src/pages/PricingPage.jsx` currently owns package comparison content locally.

There is no CMS. Content changes are source changes and require a build/deploy cycle. Existing objects in `src/data/` are the source of truth for content shapes.

Framework and resource detail pages use module-level slug maps exported through selector functions instead of scanning their collections during every render. Directory filter options are also derived once when the content module loads. `DirectoryControls` owns the shared search field and filter-chip behavior used by framework, integration, and resource directories.

Static arrays and reusable render components stay at module scope. Do not add memoization around trivial expressions; introduce deferred rendering, pagination, or remote-data caching only when collection size or a future API makes the cost measurable.

## Presentation and Motion

Tailwind CSS v4 utilities are colocated with the React markup that owns each layout, surface, state, and breakpoint. `src/styles.css` is intentionally limited to `@theme` tokens, global base rules, a small set of shared primitives, and effects that are clearer as CSS: keyframes, pseudo-elements, gradients, and visualization geometry. New component-specific spacing or responsive behavior belongs in JSX rather than a new stylesheet selector.

Motion uses `motion/react` plus CSS animation:

- `MotionContext` follows the operating-system reduced-motion preference.
- Components receive `motionEnabled` and must render a complete static state when it is false.
- Navbar and CTA entrances use opacity and transform-based motion; reduced motion removes their translation, scale, and decorative shine.
- `HeroSection` keeps the Focus Stack configuration at module scope, lazy-loads the heavy WebGL `WaveShader`, loads `/assets/dashboard.webp` once as eager decorative media, keeps foreground event cards/data static so the frozen hero does not introduce render churn, and reuses `HeaderCtaContent` for the primary CTA shine/icon behavior.
- `WaveShader` renders a decorative WebGL canvas and falls back to CSS when WebGL is unavailable.
- `SecuraAssessment` owns module-scope summary, metric, review-row, and recommendation configuration plus one shared viewport-triggered sequence for the compact packet identity, gap summary, metrics, rows, attention states, and final action tray. Its constrained panel remains centered across breakpoints, uses one shared fixed-height right-graphic frame for every phase, and reuses `CursorGrid`, whose `IntersectionObserver` runs the automatic Canvas 2D current only while at least 15% of the panel is visible. The Secura banner and recommendation tray dispatch only local replay phase changes, and the canvas uses the same origin-aligned 42px square geometry as the static CSS lattice. The grid releases both observers and its animation frame on cleanup; reduced motion omits the canvas while preserving the complete assessment and CSS lattice.
- `CursorGrid` caches parsed color values at module scope so the animation loop does not repeat the same conversion on every frame.

Visual changes must also follow `design-system/controllo-compliance-current/MASTER.md`.

## Browser Integrations

The demo form calls `LeadService.submit`:

- With no `VITE_LEAD_ENDPOINT`, it simulates success after a short delay.
- With an endpoint, it sends JSON using an unauthenticated browser `POST` request.
- On success, it pushes a `lead_submitted` event to `window.dataLayer`.
- If `VITE_DEMO_CALENDAR_URL` exists, the success screen offers the booking link.

The lead payload contains `name`, `email`, `company`, `size`, optional `role`, consent, the empty `website` honeypot, and `source: "enterprise-site"`. The external endpoint owns server-side validation, rate limiting, spam handling, CORS, storage, retention, and delivery. All `VITE_*` values are public browser configuration and must never contain secrets.

The cookie panel stores either `essential` or `accepted` under `controllo-consent` in `localStorage`. This preference currently controls only whether the panel is shown. It does not yet conditionally load or suppress analytics; that gap is tracked in `docs/ROADMAP.md`.

## Metadata and Discovery

`PageMeta` updates the title, description, Open Graph title/description/type, canonical URL, and `SoftwareApplication` JSON-LD after navigation. Canonical URLs use `https://controllo.ai` as the production origin.

Crawler-facing files are static:

- `public/robots.txt`
- `public/sitemap.xml`

Route additions require both the React route and relevant crawler entries to change together.

## Architectural Boundaries

- Keep secrets and privileged logic out of the website bundle.
- Put external lead validation, rate limiting, spam controls, storage, and notifications behind the configured lead endpoint.
- Keep product application concerns such as users, controls, evidence records, and audit workflows out of this repository unless they are presentational examples.
- Keep route-specific composition in `src/pages/`; shared behavior belongs in components, services, context, or data modules.
- Treat published claims and legal text as governed content, not placeholder UI copy.

## Known Constraints

- The site depends on JavaScript for route rendering and metadata updates.
- Social crawlers that do not execute JavaScript may see only the default `index.html` metadata.
- Google Fonts are imported from the public Google Fonts service at runtime.
- No error-monitoring or analytics vendor is installed.
- No CMS, localization system, authentication layer, backend, or end-to-end test suite exists.
