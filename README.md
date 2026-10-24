# Amazon Deal Hunter V1 Canada
Free static PWA for GitHub Pages. No API keys, subscriptions, analytics or paid services.

Install using Chrome / Samsung Internet → menu → Install app / Add to Home screen. Requires HTTPS. The app shell works offline after the first visit; Amazon searches need internet.

Smart Search sends keywords, category, CAD price bounds, rating, sort and Prime requests to Amazon.ca. Amazon controls whether each filter is honored. Saved searches retain every filter locally, with load and delete controls. Storage is browser-specific and can be cleared by browser settings.

Top Deals offers Amazon Deals, Outlet and Best Sellers shortcuts, not independently verified deals. Product-link checking validates HTTPS Amazon.ca URL format and extracts the ASIN, removing tracking parameters. It does not fetch the product, verify availability or assess authenticity. Shortened amzn.to links must first be expanded in the browser.

## Requires live pricing / product data (not connected)
Verified discount percentages and dollar savings, historical lows, ranked product deals, pricing-error detection, availability, seller/condition checks, delivery eligibility, price monitoring and automatic alerts. Advanced delivery, discount, history, seller and condition fields are saved preferences only. No live product prices are displayed.

Original repository files remain unchanged. Root index redirects to this app. The service worker is scoped to this folder.
