# DashProtection → ResolveUS integration

## Source and scope

- DashProtection original: \`digipants/DashProtection\` (Eleventy; original website /, /services/, /about/, /contact/, /Privacy-policy/, /Terms-conditions/).
- Integrated destination: \`https://resolve-us.com/dashprotection\` (Next.js, shares ResolveUS phone, email, mail endpoint, visitor consent, navigation, legal pages and main domain).
- All existing ResolveUS consultation categories and \`src/lib/pricing.ts\` remain **unchanged**.
- The new page retains all six DashProtection device categories, network connections/server topics, separate original Basic/Premium/Enterprise plan themes and price points, remote/on-site service enquiry information, values and FAQs.
- DashProtection enquiries reuse \`/api/send-email\` with the distinct category \`DashProtection Device Care\`, device/service, selected plan and issue; email confirmation is device-care aware. Successful enquiries emit a non-PII GA4 \`generate_lead\` only if analytics consent is enabled.
- No checkout, auto-renewal, card collection or payment transaction record was introduced.

## Legacy assertions not published as facts

The legacy source includes 25+ years, 500K+ customers, 2K+ staff, names/photos/testimonials without verification, 24/7 availability, immediate repairs, universal home/store service, an unverified office address, an \`AV Food Factory\` footer and unrelated placeholder plumbing/Latin text. Do not publish those as verified claims without evidence. This does not remove the genuine product categories, device topics or quoted plan rates.

**Legal operator mismatch to resolve:** Current ResolveUS main (November 5, 2026) presents **A V Food Factory**, while earlier owner instructions identified **A V TRADE CORPORATION**. The integration preserves the current repository operator and does not silently determine the advertiser/contracting/refund entity. The owner must verify this before any ad-compliance claim.

## Google Ads / migration boundaries

The owner said DashProtection Google Ads domain and URL settings were changed. This change **does not access or modify Google Ads, GA4, checkout, campaign status, budget or billing**.

- If running ads to this content, the direct final URL should be \`https://resolve-us.com/dashprotection\` once deployed; verify the display domain, mobile final URL, tracking template, asset links and destinations match. Do **not** depend on a redirect from \`dashprotection.com\` to \`resolve-us.com\` as the final URL.
- Google's third-party consumer technical support restrictions **include hardware repair and consumer troubleshooting**. A new domain, page, brand, redirect or wording change does not establish eligibility: https://support.google.com/adspolicy/answer/13527027
- Destination mismatch rules: https://support.google.com/adspolicy/answer/16428020
- Google AdsBot crawlability: https://support.google.com/adspolicy/answer/6368661

## Verification checklist

1. Inspect \`/dashprotection\` on desktop/mobile: nav, six device categories, network/server topics, plans, FAQs, links and keyboard focus.
2. Submit a synthetic authorized enquiry: inbox receives DashProtection category/device/plan, visitor gets correct device-care acknowledgement, error states render and duplicate-clicks are guarded.
3. Verify cookie flow and tag behavior in browser (reject vs analytics-only vs accept-all). A successful DashProtection enquiry should fire \`generate_lead\` **only with analytics opt-in** and with no personal data.
4. Confirm Netlify build and website deployment, canonical \`/dashprotection\`, sitemap inclusion and Search Console inspect URL; verify a 200 response and AdsBot accessibility.
5. Verify geographical availability and actual contracted remote/on-site/repair capabilities before adding any promises, testimonials or 24/7 features.
6. Resolve operator identity; review old DashProtection domain redirects separately and do not auto-redirect ad final URLs across domains.
