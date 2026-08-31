# Brand asset sources

These SVG files are vendored locally for stable website delivery. They are not loaded from a runtime CDN.

Source snapshot: [GLINCKER/theSVG](https://github.com/GLINCKER/thesvg/tree/1f035ac7ebceb6a0d554b65c9ec8216979220043) at commit `1f035ac7ebceb6a0d554b65c9ec8216979220043`, downloaded on 2026-08-30.

| Local asset | theSVG slug and variant | Upstream brand guidance | Status |
| --- | --- | --- | --- |
| `aws.svg` | `aws/color.svg` | [AWS trademarks](https://aws.amazon.com/trademark-guidelines/) | Ready for design review |
| `microsoft-azure.svg` | `microsoft-azure/default.svg` | [Microsoft trademark guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks) | Ready for design review |
| `google-cloud.svg` | `google-cloud/default.svg` | [Google brand resource center](https://about.google/brand-resource-center/) | Ready for design review |
| `microsoft-intune.svg` | `azure-intune/default.svg` | [Microsoft trademark guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks) | Ready for design review |
| `microsoft-defender.svg` | `microsoft-defender/default.svg` | [Microsoft trademark guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks) | Ready for design review |
| `google-workspace.svg` | `google-workspace-wordmark/default.svg` | [Google brand resource center](https://about.google/brand-resource-center/) | Ready for light surfaces |
| `google-workspace-light.svg` | `google-workspace-wordmark/light.svg` | [Google brand resource center](https://about.google/brand-resource-center/) | Theme variant |
| `google-workspace-dark.svg` | `google-workspace-wordmark/dark.svg` | [Google brand resource center](https://about.google/brand-resource-center/) | Theme variant |
| `jira.svg` | `jira/default.svg` | [Atlassian logo guidelines](https://atlassian.design/foundations/logos/) | Ready for design review |
| `confluence.svg` | `confluence/default.svg` | [Atlassian logo guidelines](https://atlassian.design/foundations/logos/) | Ready for design review |
| `microsoft-entra-id-protection.svg` | `azure-entra-id-protection/default.svg` | [Microsoft trademark guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks) | Do not present as the general Entra ID logo |

The files remain the intellectual property and trademarks of their respective owners. Inclusion in theSVG does not grant endorsement rights. Verify the current owner guidelines before publication.

## Future asset workflow

1. Confirm that the named integration or partner relationship is approved for public display.
2. Prefer the trademark owner's current brand or press kit. Use a maintained catalogue such as theSVG only when an owner-hosted asset is unavailable.
3. Match the exact company or product name. A related service icon is not a substitute.
4. Copy the SVG into this folder and register its public path in `src/data/brandAssets.js`. Website components consume the registry rather than importing a CDN or repeating asset paths.
5. Add the upstream source, source version or commit, owner guidelines, and review status to the table above.
6. Preserve the supplied geometry and colours. Normalize presentation through the shared `IntegrationLogo` component instead of editing a trademarked SVG. `BrandLogo` is reserved for Controllo's own wordmark.
7. Validate the SVG as XML and scan it for scripts, event handlers, external references, and `foreignObject` content. Then inspect every affected desktop and mobile surface in a browser.
8. Keep the existing neutral product-category icon until an exact reviewed mark is available.

## Entra ID exception

The downloaded theSVG snapshot does not include a plain Microsoft Entra ID brand mark. Its closest named asset is Entra ID Protection, which is intentionally stored under its exact product name. Obtain the general Entra ID mark from Microsoft's official asset library before wiring that integration into the website.
