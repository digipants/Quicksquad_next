# ResolveUS — DashProtection visual system

## Design tokens
- Deep navy `#091D35` — primary hero and browser theme
- Ink navy `#0B2540` — headings, navigation and readable dark foreground
- Teal `#0C7974` — primary actions, links and focus affordances
- Deep teal `#096761` — hovered action state
- Mint `#7CE5D6` — accent on dark backgrounds
- Pale mint `#F1FAF8` and `#E5F7F3` — supportive surfaces

Tokens live in `src/app/globals.css`. Existing DashProtection page remains the visual reference. This change propagates compatible Tailwind palette utilities and brand hex colors throughout the public site, consent UI, blog, existing enquiry pages, admin surfaces, favicons, and branded transactional email styling. It doesn't change product scope, prices, form behavior, analytics IDs, consent rules, or Google Ads settings.

## Legal operator
**A V Food Factory** is the owner-confirmed operator of ResolveUS as of November 5, 2026. Keep consistent in `src/app/layout.tsx` structured data, footer, contact, privacy policy, refund policy, terms, and disclaimer. The earlier A V TRADE CORPORATION reference is obsolete for this site. Do not infer a company registration number or contact address.

## Review
- Inspect mobile navigation, CTAs, pricing, contrast, input focus, chat, consent selections, legal pages, blog content and DashProtection landing page in the Netlify preview.
- Confirm `npm run build` and existing `node --test tests/rebrand.mjs` when CI is available. Run visual/color contrast and accessibility checks against real rendered pages.
- Verify email rendering and privacy analytics decisions using synthetic requests; no paid Ads activation is part of this task.
