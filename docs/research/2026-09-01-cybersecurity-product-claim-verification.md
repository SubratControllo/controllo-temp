# Cybersecurity page product-claim verification

**Date:** 2026-09-01  
**Purpose:** Verify the proposed Cybersecurity & Cloud Security page against the primary Controllo product source and the marketing-site roadmap before design or implementation.

## Scope and evidence standard

Unless marked **Website**, source paths are relative to the primary product repository at `/Users/ashutoshsingh/Documents/GitHub/Controllo`. Website paths are relative to `/Users/ashutoshsingh/Documents/ControlloWebsite`.

This was a read-only source review. It did not connect to a deployed database, exercise customer tenants, call third-party APIs, or verify commercial entitlements. Therefore:

- **Implemented** means an end-to-end UI/backend or data-model path is visible in source.
- **Integrated, runtime confirmation required** means the product contains an integration path, but credentials, subscription, data availability, licensing, tenant permissions, or production operation were not verified.
- **Planned / unsupported** means the claim is explicitly deferred by the website roadmap or the inspected product source does not substantiate it.

## Executive decision

The proposed page has the right overall story, but it currently overstates four areas: “live” cloud visibility, Secura completion time, uniform NIST-based risk treatment, and the readiness of trial/demo conversion paths. The page can proceed after the wording changes below.

Recommended positioning:

> Connect framework implementation, evidence, risk, and auditor collaboration with regularly refreshed visibility across supported cloud and workforce environments.

Do not publish “under a minute,” “live” as a literal real-time guarantee, automatic cloud-signal-to-control mapping, risk treatment tracking, full audit history, or an activated self-serve trial until each is separately verified.

## Claim decision matrix

| Proposed capability or wording | Status | Decision and publish-safe treatment |
| --- | --- | --- |
| Framework implementation and progress | **Implemented** | The product queries framework hierarchies, controls, scope, implementation descriptions, auditor fields, and implementation/policy/evidence progress. Safe: “Manage framework implementation and track progress.” (`frontend/src/pages/audit/auditFrameworks.jsx:134-260`) |
| Mapped controls and reusable artifacts | **Implemented, but narrow the promise** | Control mappings, related controls, risks, policies, and evidence are modeled and shown. DORA import code explicitly maps controls to policy procedures and other evidence. Safe: “Use mapped controls and linked artifacts across overlapping requirements.” Do not imply automatic propagation of implementation text or one-click completion across frameworks. (`frontend/src/sections/components-overview/cards/CardTabs.jsx:253-280`, `frontend/src/sections/components-overview/cards/CardTabs.jsx:1445-1466`, `backendNeo/MetaData/load_DORA.js:59-99`) |
| Central control workspace for implementation, assignee, policies, evidence, mappings, audit, chat, and tickets | **Implemented** | These are first-class tabs and mutations in the control view. Safe substantially as written. (`frontend/src/sections/components-overview/cards/CardTabs.jsx:544-556`, `frontend/src/sections/components-overview/cards/CardTabs.jsx:785-854`, `frontend/src/sections/components-overview/cards/CardTabs.jsx:1001-1062`, `frontend/src/sections/components-overview/cards/CardTabs.jsx:1626-1636`) |
| Policy, procedure, and evidence repository with files and Confluence material | **Implemented** | Control details query linked policy/evidence records, files, and Confluence artifacts; the artifact UI connects and disconnects files from evidence and shows linked controls. (`frontend/src/pages/audit/controlDetails.jsx:151-245`, `frontend/src/pages/audit/artifact.jsx:547-638`, `frontend/src/pages/audit/artifact.jsx:925-1036`, `frontend/src/pages/audit/artifact.jsx:1320-1644`) |
| Secura analyzes control requirement, implementation, policies/procedures, and evidence | **Implemented** | The backend assembles the control description, implementation text, expected and supplied policies/evidence, uploaded files, and Confluence content for analysis. (`backendNeo/io_server.js:1317-1468`, `backendNeo/OPENAIhelper.js:107-177`, `backendNeo/OPENAIhelper.js:228-251`) |
| Secura flags gaps and recommends next actions | **Implemented** | The prompt/output contract includes assessment, per-document analysis, gaps, compliance status, recommendations, and a present/missing/partial summary; results are saved and marked fresh. (`backendNeo/OPENAIhelper.js:185-215`, `backendNeo/io_server.js:1471-1488`) |
| Secura result “in under a minute” | **Unsupported** | No response-time SLA or timeout-backed performance promise was found. The UI's changing progress messages are presentation, not proof of processing time. Remove the duration entirely until measured production telemetry supports it. (`frontend/src/components/DesclaimerBackground.jsx:730-748`, `frontend/src/components/DesclaimerBackground.jsx:984-1035`) |
| AI validates each control before the auditor | **Modify** | Secura provides reviewable analysis; it does not replace human approval or make the final compliance determination. Safe: “Review each control with Secura before sharing it with an auditor.” The UI explicitly labels output informational, requires human review, and tells teams to validate findings before acting. (`frontend/src/components/DesclaimerBackground.jsx:1079-1117`, `frontend/src/components/DesclaimerBackground.jsx:1177-1207`) |
| AWS cloud asset monitoring | **Implemented; runtime confirmation required** | A dedicated AWS monitoring page requests overview and inventory data; the backend serves cached results and refreshes data older than five minutes. Safe: “Monitor AWS assets with regularly refreshed inventory and overview data.” (`frontend/src/pages/risk/aws-monitoring.jsx:39-93`, `backendNeo/io_server.js:1652-1681`, `backendNeo/io_server.js:1704-1772`) |
| Azure cloud asset monitoring | **Implemented; runtime confirmation required** | Azure has a comparable dedicated monitoring page and cached refresh path. Use the same “regularly refreshed” language. (`frontend/src/pages/risk/azure-monitoring.jsx:42-88`, `backendNeo/io_server.js:1957-1976`, `backendNeo/io_server.js:2000-2032`) |
| GCP cloud asset monitoring equal to AWS/Azure | **Partially implemented** | GCP credentials, service-account impersonation, asset discovery, and synchronization into the shared asset register exist, but no dedicated GCP monitoring overview route comparable to AWS/Azure was found. Safe: “Connect GCP and synchronize supported assets into the asset register.” (`frontend/src/pages/risk/assets.jsx:789-825`, `frontend/src/pages/risk/assets.jsx:920-969`, `backendNeo/GCPHelper.js:17-39`, `backendNeo/GCPHelper.js:76-132`, `backendNeo/io_server.js:1801-1821`, `backendNeo/io_server.js:1911-1932`) |
| “Live” visibility | **Modify** | AWS, Azure, Microsoft, and Google Workspace handlers use caches that refresh when older than about five minutes; GCP is exposed as an explicit synchronization path. “Live” can be a broad product label only if legal/product approve it, but body copy should say “current,” “regularly refreshed,” or “near-current,” not promise literal real time. (`backendNeo/io_server.js:1768-1772`, `backendNeo/io_server.js:2027-2032`, `backendNeo/io_server.js:2286-2342`, `backendNeo/io_server.js:2555-2601`) |
| Microsoft 365 identities, endpoints/devices, alerts, access logs, and exposure | **Implemented integration; runtime confirmation required** | The Microsoft page offers Overview, Device Inventory, Alerts, Access Logs, and Dark Web views. The helper combines Intune devices, Defender machines, security alerts, risky users, MFA and identity details, and sign-in logs. (`frontend/src/pages/risk/microsoftdefender-monitoring.jsx:79-154`, `backendNeo/IntuneMonitorHelper.js:151-217`, `backendNeo/IntuneMonitorHelper.js:224-413`, `backendNeo/IntuneMonitorHelper.js:667-711`) |
| Google Workspace users, ChromeOS devices, alerts, activity logs, and exposure | **Mostly implemented; one UI path needs verification** | The Google Workspace collector gathers Cloud Identity/ChromeOS assets and users, alerts, activity logs, and dark-web data. The page exposes matching tabs. However, its Dark Web tab reuses the Microsoft component, which calls the Microsoft `intuneResources` socket rather than the Google Workspace cache. Market the user/device, alert, and activity-log views after tenant verification; do not promise Google Workspace-specific dark-web results until the wiring is corrected and tested. (`frontend/src/pages/risk/google-workspace.jsx:82-138`, `backendNeo/Integrations/gws/index.js:23-88`, `backendNeo/Integrations/gws/collectors/asset_Inventory/normalize.js:429-457`, `backendNeo/Integrations/gws/collectors/alerts/normalize.js:76-88`, `backendNeo/Integrations/gws/collectors/logs/normalize.js:1-90`, `frontend/src/components/GWSDarkWebTab.jsx:1-10`, `frontend/src/components/MicrosoftDefenderDarkWebTab.jsx:26-50`) |
| Compromised-user / dark-web exposure | **Integrated, runtime and commercial confirmation required** | Microsoft-side code queries DeHashed using the organization domain and presents exposed identity, breach source, URL, and password/hash indicators. The feature depends on external service access, permitted data, and production configuration not proven by source review. Safe only after product/security confirm current availability and desired public wording; “user-level exposure indicators” is safer than promising comprehensive dark-web monitoring. (`backendNeo/IntuneMonitorHelper.js:504-539`, `frontend/src/components/MicrosoftDefenderDarkWebTab.jsx:114-180`) |
| Organization risk workflow | **Implemented** | Organization risks include owner, comments, likelihood, impact, score, categories, and dashboard/heatmap use. The UI explicitly describes NIST 800-30-based likelihood/impact classification. (`frontend/src/pages/risk/organisation.jsx:158-260`, `frontend/src/pages/risk/organisation.jsx:620-794`, `frontend/src/components/OrganizationHeatmapCard.jsx:62-76`) |
| Asset risk workflow | **Implemented** | Assets support owner, status, risk score, inherent-risk relationships, ratings, manual creation, cloud sync, and heatmaps. (`frontend/src/pages/risk/assets.jsx:163-278`, `frontend/src/pages/risk/assets.jsx:383-409`, `frontend/src/pages/risk/assets.jsx:562-714`, `frontend/src/pages/risk/assets.jsx:1460-1500`, `frontend/src/components/AssetHeatmapCard.jsx:60-74`) |
| Vendor risk workflow | **Implemented** | Vendor creation, likelihood/impact scoring, status, assessment questions, responses, dashboard cards, and heatmaps are present. The vendor UI also labels likelihood and impact classification as NIST 800-30-based. (`frontend/src/components/NewVendor.jsx:35-84`, `frontend/src/components/VendorRating.jsx:23-48`, `frontend/src/sections/apps/customer/VendorCard.jsx:92-100`, `frontend/src/sections/apps/customer/VendorCard.jsx:319-346`, `frontend/src/sections/components-overview/cards/VendorDetailsTabs.jsx:165-187`, `frontend/src/components/VendorHeatmapCard.jsx:62-77`) |
| “NIST-based workflows standardize organizational, asset, and vendor risk” | **Modify** | NIST 800-30 language is explicit in organization and vendor rating tooltips, while asset risk uses the same impact/likelihood pattern but was not found to carry the same explicit NIST statement. Safe: “Use consistent likelihood-and-impact scoring, informed by NIST 800-30 for organization and vendor assessments.” (`frontend/src/pages/risk/organisation.jsx:759-794`, `frontend/src/sections/apps/customer/VendorCard.jsx:319-346`) |
| Risk treatment tracking | **Unsupported in inspected paths** | Owners, comments, ratings, scores, statuses, questionnaires, dashboards, and heatmaps are substantiated. A dedicated risk-treatment plan/workflow was not found in the reviewed organization, asset, vendor, or risk-register paths. Remove “treatment tracking” until product identifies the exact production workflow. |
| Risk dashboards and heatmaps | **Implemented** | The risk dashboard composes organization, asset, and vendor progress and heatmap cards. (`frontend/src/pages/dashboard/risk.jsx:39-45`, `frontend/src/pages/dashboard/risk.jsx:127-148`) |
| Auditor collaboration and ownership | **Implemented** | The product supports auditor relations and restricted permissions, framework assignment, internal/external auditor comments and remarks, last-audited identity/date, and control chat persisted over sockets. (`backendNeo/DBHelper.js:460-517`, `frontend/src/pages/audit/auditorDetails2.jsx:180-212`, `frontend/src/pages/audit/auditorDetails2.jsx:603-667`, `frontend/src/components/ControlsAudit.jsx:23-88`, `frontend/src/components/ControlsAudit.jsx:129-269`, `backendNeo/io_server.js:293-335`) |
| Complete audit history | **Not fully substantiated** | Persisted comments, remarks, chat, and the latest audit identity/date are implemented. The visible timeline in `ControlsAudit` is static presentation, and this review did not find an immutable or versioned full control-audit event history. Safe: “Keep auditors aligned with assigned access, control-level comments, chat, and latest audit details.” (`frontend/src/components/ControlsAudit.jsx:90-127`, `frontend/src/pages/audit/controlDetails.jsx:151-245`) |
| Cloud signals automatically map to compliance controls | **Unsupported** | Cloud/workforce monitoring and control/evidence workflows exist as separate surfaces. No inspected path established automatic mapping of cloud configurations, alerts, endpoints, or dark-web data to framework controls. Preserve the writer's instruction to keep these visuals and claims separate. |
| 100+ frameworks | **Approved website proof; live catalog count not re-proven here** | The website roadmap records “100+ framework” as approved homepage proof, but still lists final product/framework-claim approval as a launch blocker. The product repository contains many metadata directories/loaders, yet code presence does not prove the exact live tenant catalog. Safe as a governed aggregate proof only after product owner reconfirms the current export; do not create 100+ direct landing-page links from loader files. (**Website** `docs/ROADMAP.md:88`, **Website** `docs/ROADMAP.md:190-191`) |
| Start Free Trial | **Planned conversion, not activated** | Current trial CTAs lead to pricing and do not connect signup/payment. Activated self-service is Phase 2 and blocked on signup, workspace creation, useful first session, and a verified handoff. The website roadmap currently says 14 days while the product backend configures a 30-day Stripe trial, so do not publish a duration until product/commercial owners reconcile it. Use “View plans” or keep “Start free trial” only as an explicitly interim pricing-intent label consistent with the site baseline; do not imply immediate activation. (**Website** `README.md:25`, **Website** `src/data/siteContent.js:135-138`, **Website** `docs/ROADMAP.md:161-175`, **Website** `docs/ROADMAP.md:188`, `backendNeo/api_server.js:224-236`) |
| Book a Demo | **Not yet universally supported** | The current route is a demo-request form. Without a configured lead endpoint it simulates success and sends no lead; calendar booking appears only when an optional URL is configured. The roadmap explicitly says to use “Book a Demo” only when visitors can select a time directly. Use “Request a Demo” until that is true in production. (**Website** `README.md:44`, **Website** `docs/ARCHITECTURE.md:95-104`, **Website** `src/components/LeadForm.jsx:86-92`, **Website** `docs/ROADMAP.md:169`) |

## Framework-by-framework verification

All requested names have source import/configuration artifacts, but loader presence does not by itself prove that a framework is loaded, entitled, current, and operational in every production tenant.

| Marketing name | Product-source evidence | Recommended status |
| --- | --- | --- |
| SOC 2 | Loader declares `SOC2 RevisedPoF2022` and inserts the framework. (`backendNeo/MetaData/load_soc2.js:230-234`) | Supported in product source; confirm public display name/version. |
| ISO 27001 | Loader declares and inserts `ISO 27001:2022`. (`backendNeo/MetaData/load_iso27001.js:274-281`) | Supported in product source. |
| NIST CSF | Loader reads a NIST CSF 2.0 workbook and uses `CSF Framework`; framework insertion is performed inside the read path, although one separate insertion call in `main` is commented. (`backendNeo/MetaData/load_csf.js:81-92`, `backendNeo/MetaData/load_csf.js:241-248`) | Supported in product source; market as NIST CSF 2.0 only after current tenant data is confirmed. |
| CSA CCM v4 | Loader declares `CCMv4` and reads CCMv4 risk data. (`backendNeo/MetaData/load_ccm_v4.js:9`, `backendNeo/MetaData/load_ccm_v4.js:117`) | Supported in product source; public label should be “CSA CCM v4.” |
| CMMC | Separate loaders declare Level 1 and Level 3. (`backendNeo/MetaData/load_CMMC_Level_1.js:6`, `backendNeo/MetaData/load_CMMC_Level_3.js:6`) | Supported in product source; specify level/version where material. |
| DORA | Loader declares `DORA Framework`, reads DORA metadata, and creates control-to-policy/evidence mappings. (`backendNeo/MetaData/load_DORA.js:8`, `backendNeo/MetaData/load_DORA.js:59-99`, `backendNeo/MetaData/load_DORA.js:104-121`) | Supported in product source. |
| C5 | Loader declares `C5` and reads C5 metadata. (`backendNeo/MetaData/load_C5.js:8`, `backendNeo/MetaData/load_C5.js:104-121`) | Supported in product source; confirm intended C5 edition. |
| PCI DSS | Loader reads a PCI DSS 4.0 workbook and inserts `PCI DSS`. (`backendNeo/MetaData/load_pcidss.js:83-85`, `backendNeo/MetaData/load_pcidss.js:297-310`) | Supported in product source; “PCI DSS 4.0” needs tenant-data confirmation. |
| NIS2 | Loader declares `NIS2 Framework` and reads NIS2 metadata. (`backendNeo/MetaData/load_NIS2.js:8`, `backendNeo/MetaData/load_NIS2.js:104-121`) | Supported in product source. |

The backend's commercial configuration also groups SOC 2, ISO 27001, DORA, PCI DSS, NIST CSF, CIS, CSA CCM, Secura validation, mapped artifacts, organization/asset/vendor risk, AWS/Azure/GCP/Microsoft 365/Google Workspace, audit management, document repository, and dashboards into a Cybersecurity Module. Treat this as first-party packaging intent, not independent proof that every integration is configured for production. (`backendNeo/api_server.js:82-90`)

## Recommended page-copy changes

### Hero

Use:

> **One platform for cyber readiness and connected environment visibility.**  
> Bring framework implementation, evidence management, risk assessments, and auditor collaboration into one workflow—alongside regularly refreshed visibility across supported cloud and workforce environments.

Avoid “live” in the headline unless product/legal deliberately accepts it as a non-SLA label. Replace the primary CTA with **View Plans** for the current website phase and keep **Request a Demo** as the sales CTA.

### Challenges and response table

Keep the evidence, framework-overlap, scattered-control-information, risk consistency, and auditor-alignment rows with these changes:

- Replace “Live Cloud Asset Monitoring” with “Cloud and workforce monitoring.”
- Replace “current visibility across cloud assets, endpoint metrics, identities, access activity, alerts, and user-level dark-web exposure” with “regularly refreshed views of supported cloud assets, workforce identities and devices, access activity, alerts, and available exposure indicators.”
- Replace the blanket NIST/treatment sentence with “Consistent likelihood-and-impact scoring, ownership, status, dashboards, questionnaires, and heatmaps support organization, asset, and vendor risk workflows.”
- Replace “audit history” with “latest audit details and control-level collaboration.”

### Secura

Use:

> **Review each control with Secura before sharing it with an auditor.**  
> Secura assesses the control requirement, implementation description, linked policies, procedures, and evidence, then highlights gaps and recommends review actions. Your compliance team remains responsible for validating the findings and deciding what to do next.

Keep the workflow **Implement → Review → Resolve → Share**. Remove “in under a minute.” The example finding is appropriate as an illustrative mockup if clearly treated as an example, not a guaranteed output.

### Cloud monitoring

Use:

> **See what is connected and where attention is needed.**  
> Bring supported cloud resources, workforce identities and devices, access activity, and security alerts into regularly refreshed operational views.

For the three views:

- **Cloud assets:** present AWS and Azure monitoring plus GCP asset synchronization; do not imply identical depth.
- **Identities & devices:** Microsoft 365 and Google Workspace users/devices are supported in code, subject to tenant configuration.
- **Alerts & exposure:** show security alerts and access/activity logs. Include dark-web indicators only after external-service availability and the Google Workspace UI path are confirmed.

Continue to keep this visual separate from the control/evidence workflow. The source review did not substantiate automatic mapping from monitoring signals to controls.

### Framework directory

Choose the writer's **Option 3** narrative:

> **Start with one framework. Expand when you need to.**

It accurately reflects a multi-framework product without promising automatic carry-forward. A compact featured set is safe. A complete “100+” scrollable directory should be driven by an approved current catalog and only link to framework landing pages that actually exist; metadata loaders are not a public-page registry.

### Closing CTA

Use:

> **Build cyber and cloud compliance you can prove.**  
> Bring implementation, evidence, risk, monitoring, and auditor collaboration into one connected program.

Current CTAs: **View Plans** and **Request a Demo**. Restore **Start Free Trial** / **Book a Demo** only after the roadmap conversion gates are complete.

## Future-plan and launch-gate notes

1. **Activated free trial is planned, not current.** Signup, workspace creation, and a useful first session remain prerequisites. The planned duration is inconsistent: the website roadmap says 14 days, while the product checkout code sets 30 days. Reconcile this before publishing any trial duration. (**Website** `docs/ROADMAP.md:171-175`, **Website** `docs/ROADMAP.md:188`, `backendNeo/api_server.js:224-236`)
2. **Direct demo booking is conditional.** The current form can optionally hand off to a calendar; without configuration it is a request flow, and without a lead endpoint it is simulated. (**Website** `docs/ARCHITECTURE.md:95-104`)
3. **Exact framework and control counts still require final approval.** The roadmap explicitly retains product/framework claim approval and reconciliation of counts as launch blockers. (**Website** `docs/ROADMAP.md:190-191`)
4. **GCP parity is not demonstrated.** GCP asset synchronization exists, but a dedicated monitoring dashboard equivalent to AWS/Azure is not visible in the inspected routes.
5. **Google Workspace dark-web presentation needs correction/verification.** The collector contains the data path, but the UI component currently delegates to the Microsoft resource call.
6. **Risk treatment and full audit history need product confirmation or implementation.** Current code clearly supports scores, owners, comments, status, questionnaires, latest audit data, and collaboration, but not the stronger formulations.
7. **No Secura response-time promise should be published** until a measured production percentile and an approved SLA/marketing basis exist.

## Final approval recommendation

Proceed to page development using the modified copy above. The strongest verified story is not “everything is automated”; it is a connected workspace that combines framework implementation, artifact review, practical risk workflows, auditor collaboration, and separately presented cloud/workforce visibility. That is credible, differentiated, and consistent with the product code.
