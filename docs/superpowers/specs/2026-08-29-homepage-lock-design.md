# Homepage Lock Design

## Outcome

Finalize the Controllo homepage around the product scope verified in the CONTROLLO application repository. The page must help a small compliance team understand the product quickly while retaining enough operational depth for enterprise buyers.

## Locked narrative

1. The frozen hero remains the primary promise and product proof.
2. A compact framework strip establishes coverage without customer-logo claims.
3. A new connected-platform section presents Cybersecurity, Privacy, and AI Governance as the three governance domains. Only the selected domain is shown.
4. Risk Management and Cloud Monitoring appear beneath those domains as shared capabilities, not separate governance products.
5. The existing continuous-compliance operating story remains the workflow explanation.
6. The frozen Secura animation remains unchanged. Its two equal columns are optically centered, and a compact connected signal rail presents Review / Identify / Recommend with Review as the current starting step. One parent-owned connector runs behind opaque nodes, with a subtle active wash instead of an inner Review card. The connector draws once and the nodes settle in sequence when motion is enabled. It becomes a vertical spine on mobile and resolves immediately for reduced motion.
7. Frameworks and Connectivity uses one static proof ledger rather than another tab or filter interface. The navy side anchors verified scale and the shared-control model; the light side groups directory-backed framework examples and implementation-backed integrations. Dedicated links lead to the framework and integration directories.
8. A small editorial section links to the existing WordPress blog without embedding WordPress at runtime.
9. The final conversion band offers Start free trial and Request a demo. Until onboarding is connected, Start free trial routes to the package page.

The standalone homepage Risk section, the before/after Shift section, and the unapproved customer-proof placeholder are removed because their messages repeat stronger sections.

## Route and content decisions

- Add `/platform/cloud-monitoring`.
- Add `/solutions/cybersecurity`, `/solutions/privacy`, and `/solutions/ai-governance` through the existing product-page registry.
- Keep audience pages for growing and enterprise teams.
- Move legal privacy content to `/privacy-policy`.
- Redirect the legacy `/privacy` product route to `/solutions/privacy`.
- Keep WordPress articles under `/blog/...` and use the existing `/blogs/` index link until the migration redirect map is approved.
- Do not add Consent Management to the primary homepage story until public packaging is confirmed.

## Product claims

- Retain the approved hero proof of 100+ frameworks, 7,000+ controls, and 200,000+ mappings because the current metadata export exceeds each threshold.
- Limit public integration listings to implementation-backed surfaces: AWS, Azure, Google Cloud, Microsoft Entra, Microsoft Intune, Microsoft Defender, Google Workspace, Jira, and Confluence.
- Describe Secura as reviewable AI guidance. Do not imply autonomous decisions or gap remediation.

## Interaction and layout

- Domain navigation is manual only; it never autoplays.
- The selected domain crossfades with a short vertical transition when motion is enabled and switches immediately under reduced motion.
- The desktop platform panel uses two equal columns. Text and product proof are centered within their own half, with independent readable maximum widths.
- The panel keeps a stable desktop height and becomes a natural single-column flow below the established `1080px` breakpoint.
- Domain controls retain visible focus and support arrow, Home, and End keys.
- The product proof is a clearly labeled interface preview using verified product concepts, not customer data.

## Homepage lock

After focused automated tests and browser checks at 375px, 768px, 1024px, and 1440px, record the composition as the frozen homepage baseline in `README.md`, `docs/ROADMAP.md`, and the design-system master. Future changes require an explicit homepage-reopen request, except accessibility, correctness, legal, content-accuracy, or release-critical responsive fixes.
