# ResolveUS — Google tag gateway production compatibility check

Production-only deployment. The route is isolated and unlinked; existing consent-gated GA4/Ads scripts are unchanged.

- Google tag identifier: G-K82JB039DQ (Resolve Web)
- Fixed upstream: https://g-k82jb039dq.fps.goog
- Serving path: /resolve-gtg-2026/*
- Routing test: https://resolve-us.com/resolve-gtg-2026/healthy must return plain 'ok'
- Geolocation test: https://resolve-us.com/resolve-gtg-2026/?validate_geo=healthy must return plain 'ok'

No live website page calls this route. Tests are on production, not a deploy preview.
Only GET, HEAD and POST are forwarded to a fixed Google origin; arbitrary visitor cookies/credentials are not forwarded.
Netlify Edge supplies trusted country, subdivision, coordinates and client IP. Upstream Set-Cookie is not forwarded in this prototype.

## Activation gate
1. Redeem the Google Ads offer BEFORE final setup; Google determines eligibility and credit.
2. Verify both production endpoints return 'ok' before switching any Google tag script URL.
3. Validate first-party cookie handling, consent behavior, Google Tag Assistant, GA4 and Google Ads measurements.
4. Check Google Ads gateway status is Active. An endpoint-only build does not qualify for the incentive by itself.
5. If either test fails, do not change the Google tag script; fix the isolated route or revert this commit.

This prototype does not change DNS, Ads campaigns, Google tag IDs, consent state or deploy settings.

## Health-check correction
The Google upstream host already encodes tag G-K82JB039DQ; sending X-Gtg-Tag-Id as well caused 'Tag ID is in both Header and Host subdomain'. The header was removed; the host remains fixed.

## First-party integration — production only

The website loads the consented GA4/Ads Google tag script from `/resolve-gtg-2026/` (tag G-K82JB039DQ) after analytics or ad measurement consent. The fallback is the previous `https://www.googletagmanager.com/gtag/js?id=G-K82JB039DQ` tag URL, activated only when the first-party script load fails. Existing GA4 (G-K82JB039DQ), Google Ads (AW-18376694937), consent defaults and settings remain unchanged.

The edge proxy now forwards the incoming cookie header and preserves Google Set-Cookie responses, as required by the documented manual gateway setup. The proxy retains a fixed upstream and forwards query strings; arbitrary Authorization and browser-supplied geography are not passed along.

Production validation remains necessary with Tag Assistant (check Hits Sent path /resolve-gtg-2026), GA4 Realtime, Ads conversion diagnostics and rejection/analytics-only/accept-all privacy choices. A successful production build or both diagnostic URLs returning 'ok' does not establish eligibility for the promotional credit, and Google's unsupported-platform warning may remain.
