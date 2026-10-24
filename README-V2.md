# Amazon Deal Hunter V2 — two-file update

Upload **index.html**, **app.js**, and **sw.js** into the ROOT of your existing GitHub repository, replacing the old files. **Do not delete** existing manifest.webmanifest, sw.js, icons, or original search page. The current saved-search key is unchanged, so V1 saved searches can still be loaded.

## What changed
- Choose **Search All Areas** (any subset) or **Search Separately** (one area).
- Six areas: Regular Amazon, Outlet, Resale, Today's Deals, Coupons, Renewed.
- One keyword search per selected area is presented as a clickable Amazon-wide search; for specialty sections, an additional browse link opens the specific section.
- Save and reload area selections, mode, and existing search filters.
- Existing link checker and installation logic retained.

## Important limitations
- This version does **not** independently fetch live Amazon prices, aggregate products, or guarantee the lowest price.
- Amazon-wide keyword links are NOT special-section-scoped. Browsing a section and searching its listings may require additional steps on Amazon.
- Amazon controls search parameters; some filters may be ignored. Delivery, coupons, seller, condition and historical discount are not verified.
- Amazon may change section URLs or redirect them; verify destination links in your browser.
- No paid API, backend, or scraping is used.

## Publishing
GitHub repository → Add file → Upload files (or edit each file) → replace `index.html`, `app.js` and `sw.js` at the root → Commit. GitHub Pages may take a few minutes; reload Chrome and clear old site cache if necessary.
