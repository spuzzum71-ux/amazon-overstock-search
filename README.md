# Amazon Deal Hunter V1 Canada
Free static PWA for GitHub Pages. No API keys, subscriptions, analytics or paid services.

Physical Samsung installation is not yet verified. Install using Chrome / Samsung Internet → menu → Install app / Add to Home screen. Requires HTTPS. The app shell works offline after a successful service-worker installation; Amazon searches need internet.

Smart Search sends keywords, category, CAD price bounds, rating, sort and Prime requests to Amazon.ca. Amazon controls whether each filter is honored. Saved searches retain every filter locally, with load and delete controls. Storage is browser-specific and can be cleared by browser settings.

Top Deals offers Amazon Deals, Outlet and Best Sellers shortcuts, not independently verified deals. Product-link checking validates HTTPS Amazon.ca URL format and extracts the ASIN, removing tracking parameters. It does not fetch the product, verify availability or assess authenticity. Shortened amzn.to links must first be expanded in the browser.

## Requires live pricing / product data (not connected)
Verified discount percentages and dollar savings, historical lows, ranked product deals, pricing-error detection, availability, seller/condition checks, delivery eligibility, price monitoring and automatic alerts. Advanced delivery, discount, history, seller and condition fields are saved preferences only. No live product prices are displayed.

Original repository files remain unchanged. The app is served at the repository root. The original amazon_overstock_search.html stays unchanged and is linked from the footer. The service worker is scoped to the repository path.


## Fix validation
Run `node tests/app.test.cjs` for validation, query generation, complete saved-filter restoration, legacy saves, storage failures and URL safety checks. JavaScript syntax checked with `node --check app.js` and `node --check sw.js`. Amazon-side honoring of search refinements is not verified; delivery and live discounts are not applied. Physical Samsung installation needs a device check.

Run `node tests/sw.test.cjs` for service-worker cache lifecycle, offline fallback and original-page isolation tests. Manifest scope, standalone mode and icon declarations were checked; physical Samsung install and offline browser behavior remain unverified.
