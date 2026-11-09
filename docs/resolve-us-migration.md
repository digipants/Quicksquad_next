# ResolveUS migration — Issue #1

## Audit and scope

Baseline: `449fa3794255e2084e616dad3f291d1f019f7592`.
ResolveUS is a consumer-facing brand operated by **A V Food Factory**, not a separately registered company or licensed professional service.

| Area | Finding and implementation |
| --- | --- |
| Public UI | Shared navigation/footer cover default, US and AU variants. Updated homepage, services, about, pricing, contact, disclosures and legal pages without changing categories or workflows. Homepage message: “Everyday Questions. Clear Solutions.” |
| Assets | Visually inspected image contact sheet. Replaced logo, favicon and screenshot-style OG artwork with ResolveUS assets; removed unused former logo/OG files. Other photography remains unchanged. |
| SEO | Primary origin is `https://resolve-us.com`, without www. Updated root metadata, OG/Twitter, organization/brand/service/FAQ/breadcrumb JSON-LD, robots and sitemap. Added page-specific canonicals for client-rendered pages and blog detail routes. Added existing services/legal/help pages to sitemap. No PWA manifest or service worker existed; none introduced. Removed unverified old Twitter creator handle. |
| Email | Gmail/Nodemailer retained. Contact sender remains EMAIL_FROM or EMAIL_USER; newsletter sender remains EMAIL_USER. Only display names/templates change. Explicit CONTACT_INBOX is retained; absent it, contact notifications now go to EMAIL_USER rather than the expired-domain inbox. Newsletter admin recipient stays devs@digipants.com. Both sends are awaited; admin failures return errors, confirmation failures return an explicit partial-delivery message without inviting duplicate submissions. Subscriber fields are validated and HTML-escaped. |
| Public email links | Expired support/sales mailto links now lead to the existing consultation form, with the existing phone number retained. No unverified replacement mailbox is advertised. |
| AI | Active local widget uses /api/chat. Added ResolveUS identity with operator attribution; preserved model, user message and quick prompts. No existing system prompt/welcome message to migrate. Legacy unused Railway widget adapter gets the new display title; protocol names/endpoints remain compatible. |
| Auth | Admin login/logout use relative URLs and host cookies; no customer OAuth provider or hardcoded callback domain found. Preserve qs_admin and related cookie names. Admin route context types corrected to the installed Next.js Promise params contract after production build exposed a pre-existing mismatch; authorization/data logic unchanged. |
| Payment | Existing Razorpay browser checkout has a test key, USD, amount from plan.price, and client success alert. No payment webhook, server verification, recurring subscription API or invoice integration exists here. Preserve configuration; update only merchant display name/logo. Do not treat this audit as evidence of production settlement or recurring billing readiness. |
| Analytics | Preserve GA4 G-5HV0XZ5FSJ and Ads AW-18376694937. No explicit conversion event code found. Preserve existing Search Console verification file. |
| Netlify | Existing @netlify/plugin-nextjs retained; no domain redirects, DNS changes, manual deployments or hosting configuration mutations. Read-only connector reports site quicksquadnext (93cd9e58-d3a9-40f4-b20e-25bdf95d400d), primary URL still https://quicksquad.live. DNS configuration alone does not confirm primary-domain attachment or TLS. |
| Internal/history | Keep package/lockfile name quicksquad_next, repository identity, cookie names, database/model names, Railway script/global/container/API names. Preserve original customer quotations with an explicit former-brand label rather than rewriting historical endorsements. Old brand in AI instruction is a prohibition, not public branding. Git history remains intact. |

## Baseline invariants

- Basic: **$20/month**, amount 2000 cents; Premium: **$75/month**, amount 7500 cents; Enterprise: **Custom Pricing**, contact-only.
- All plan features/entitlements are byte-for-byte unchanged.
- All eight contact consultation categories and subcategories are byte-for-byte unchanged. Services category data differs only by brand text in disclaimers.
- No credentials, customer data, MongoDB records, subscription records, prices, currency or payment callbacks changed.

## Environment and dashboard requirements

No new application environment variables or dependencies are required. Do not put runtime secrets in netlify.toml or NEXT_PUBLIC variables. Verify existing variables in Netlify Functions scope (and Builds where needed); site/shared variable precedence resolves independently per scope. Do not copy secret values to this document or PR.

| Variable | Action |
| --- | --- |
| EMAIL_USER / EMAIL_PASS | Retain the existing Gmail account and app password. Verify delivery from deployed preview; no real SMTP credentials were available locally. |
| EMAIL_FROM | Retain existing verified sender/alias, otherwise omit to use EMAIL_USER. Never substitute a resolve-us.com address before verification. Newsletter still uses EMAIL_USER. |
| CONTACT_INBOX | Confirm the current inbox is reachable. If it still points at the expired domain, owner must select an existing monitored inbox; when omitted it falls back to EMAIL_USER. |
| OPENAI_API_KEY | Retain server-only key; verify authorized preview can make an actual request. |
| MONGODB_URI | Preserve existing DB and data; preview must not exercise writes against production. |
| ADMIN_PASSWORD | Preserve value; verify login/logout on the new host. Cookies from the old host will not transfer. |
| NEXT_PUBLIC_RECAPTCHA_SITE_KEY | Existing example only; current contact form does not consume it. |

Before adopting any resolve-us.com mailbox, create and verify it with the email provider; verify Gmail “Send mail as” authorization if applicable, SPF/DKIM/DMARC and inbound delivery. This PR deliberately does not alter the sending account or DNS.

Owner dashboard checks:

- Netlify: verify the new domain is attached to this existing site, select resolve-us.com as primary only at approved cutover, verify certificate coverage/HTTPS and deploy-preview settings. Do not renew or add redirects for quicksquad.live.
- Razorpay: inspect website/business display details, allowed origins, any out-of-repository callback/webhook URLs and receipts for the new brand/domain. Do not change key, products, amounts or customer records. The checked-in key is already test-mode; production readiness needs owner confirmation.
- Railway legacy widget (only if used outside this app): audit hosted identity/prompts, CORS and allowed origins separately. Keep its API contract unchanged.
- Google Analytics: update web-stream website URL/display name, review referrals/cross-domain configuration, verify realtime traffic using new domain; retain measurement ID.
- Search Console: verify resolve-us.com property, submit https://resolve-us.com/sitemap.xml; verify ownership file placement if using file verification (existing file is at repository root). No old-domain redirects or old-domain ownership assumptions.
- Google Ads: update final URLs, sitelinks/assets, business identity and domain/conversion settings; verify tag diagnostics and test conversions without purchases. Existing IDs remain unchanged.

## Validation

- `npm ci --no-audit --no-fund`: passed, lockfile unchanged.
- `npm run lint`: passed after test harness conversion to ES modules.
- `npx tsc --noEmit`: passed with generated production route types after the minimal admin context fix.
- `node --test tests/rebrand.mjs`: six regression/integration checks, no external email/API/payment side effects. Covers invalid forms; missing SMTP configuration; escaped templates; preserved sender; both awaited sends via deferred confirmation; admin and confirmation failures; mocked AI identity/model/response; exact baseline categories/prices/features/payment settings; mocked Basic/Premium checkout and contact-only Enterprise; sitemap/robots domain.
- `npm run build`: blocked by environment-specific Turbopack worker port binding (Operation not permitted).
- `npm run build -- --webpack`: passed production compilation, type validation, prerender and route generation. No project build-script change needed for the local restriction.
- Local production server: all 12 public page routes returned HTTP 200 with correct canonicals and parseable ResolveUS JSON-LD; robots.txt and sitemap.xml returned 200 with new-domain URLs. Checked expired support mailto links are absent.
- No original unit/integration test suite existed. Actual SMTP delivery, live AI, hosted browser checkout, Netlify preview and external tag diagnostics require deployed verification. Mocked checkout never contacts Razorpay or charges a card.

## Production launch checklist (owner; do not run during this task)

- [ ] Review draft PR and obtain passing Netlify preview/build checks.
- [ ] In preview, inspect desktop/mobile branding, all country header/footer variants, legal/contact links and social image.
- [ ] Verify contact and newsletter admin+customer delivery using approved test recipients, including confirmation failure behavior. Confirm notification inbox remains reachable.
- [ ] Verify live AI response and admin login/logout; do not modify customer records.
- [ ] Verify Razorpay sandbox checkout on new host with no real charges; confirm existing production integration readiness outside this repository.
- [ ] Verify new domain attachment, primary selection and TLS in Netlify. DNS is already configured per owner; no DNS mutations authorized here.
- [ ] Complete GA4, Search Console and Ads dashboard updates above.
- [ ] Record current published deploy ID, approved commit, domain selection and non-secret env configuration references for rollback.
- [ ] Only after approval/merge, use normal Git-based production deployment. Smoke-test HTTPS, forms, AI, pricing, metadata and tracking.

## Rollback checklist

- [ ] Owner restores the recorded previous Netlify deploy if application behavior regresses; retain resolve-us.com attachment/TLS, because the old domain is expired.
- [ ] Revert this PR through a new branch/PR if code rollback is required; do not reset main or alter customer/payment data.
- [ ] Restore previous environment configuration only if changed during cutover; keep verified sender credentials and monitored notification inbox.
- [ ] Recheck forms, emails, AI, pricing and analytics. Previous code contains old-brand URLs, so treat rollback as temporary and repair metadata before declaring launch healthy.

## Approved visual design implementation

- Replaced the first pass's text logo with an original scalable SVG wordmark and matching R/check favicon. The original image generator created a new, logo-free consultation hero photo; the optimized WebP is stored in `public/images/resolve-consultation-hero.webp`.
- Rebuilt the shared responsive header with Home, an accessible category menu, Pricing, How It Works, About, Contact, phone CTA and consultation CTA. The mobile menu exposes matching navigation and phone/consultation actions.
- Rebuilt the homepage around the approved headline and exact supporting copy, category tags, CTA pair, category cards from the existing home service definitions, a short three-step explanation and prominent cards sourced from the existing plan definitions.
- Refreshed `/pricing` with the same shared plan data and preserved Razorpay test key, amount, USD currency, handler and prefill. Basic remains $20/month, Premium $75/month, Enterprise Custom Pricing. The UI now discloses that current checkout is one-time and does not establish automatic monthly renewal; related FAQ claims about recurring subscriptions and automatic invoices were corrected.
- Updated public phone display and `tel:` destinations to (833) 216-2311. Contact form labels now programmatically identify their fields. The consumer footer has ResolveUS brand copy and a discreet legal-operator line; corporate identity remains in legal disclosures and Organization structured data as required for transparency.
- Visual inspection of the Netlify rendered preview and desktop/mobile screenshot capture are still pending because the connected browser control tool is not available in this session. The preview can still be reviewed at the PR's deploy-preview URL. Responsive classes, semantic navigation/form labels, keyboard focus styles, local routes and build output were checked in source/build validation; these do not replace visual browser verification.
