# ResolveUS navigation and enquiry UX cleanup

## Navigation
- The logo is the home link. Desktop/mobile menus use five direct links: Help Topics, Device Care, Pricing, About, and Contact.
- Help Topics links to `/services#categories`; Device Care goes to `/dashprotection`. No dropdown, no redundant How It Works navigation item, and no second Home link.
- Consistent `xl` breakpoint for desktop navigation, CTA, and mobile toggle prevents tablet/laptop header crowding.
- Mobile menu closes when selecting a link, including the current-page hash destination.
- Phone number is visible on wide desktop headers and inside mobile navigation. Existing consultation CTA is retained.

## Guided journeys
- Homepage quick topic chips lead to matching `/services#topic` anchors, not a shared generic anchor.
- Homepage consultation cards link to `/contact?category=...#consultation-form`.
- The contact form maps public topic names to the pre-existing real enquiry categories after hydration; no option or submission logic is removed.
- Contact form scroll offset accommodates the sticky header.
- Footer help-topic names are real navigation links rather than static labels.

## Boundaries
- Prominent ResolveUS name in the hero and legal operator A V Food Factory remain unchanged while the Google Ads asset review is in progress.
- Existing consultation services, DashProtection device-care scope, prices, legal content, consent/analytics and Ads account settings are unchanged.
- Netlify preview tests verify build health. Manual responsive and live-form smoke tests are still appropriate before concluding full UI behavior is verified.
