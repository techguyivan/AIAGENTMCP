# Playwright UI Automation Portfolio

Browser-based end-to-end tests for a public e-commerce practice application, built with Playwright and JavaScript. The suite focuses on the customer experience: signing in, browsing products, managing a cart, and completing checkout.

This project demonstrates how to organize and run maintainable UI tests with page objects, focused test suites, browser evidence, and GitHub Actions. It tests what a user can observe and do through the interface; it does not depend on private APIs or database access.

## Project at a glance

| Area | Details |
| --- | --- |
| Test framework | Playwright Test |
| Language | JavaScript (CommonJS) |
| Application under test | Rahul Shetty Academy practice login and e-commerce pages |
| Main browser | Chrome, through Playwright's Chromium project |
| Test style | UI-based end-to-end testing with Page Object Model |
| Continuous integration | GitHub Actions on push, pull request, or manual dispatch |

## User journeys covered

- Sign in with valid demo credentials and verify navigation to the shop.
- Reject invalid credentials and prevent sign-in when terms are not accepted.
- Confirm the shop and product catalog load, and category links navigate as expected.
- Add one or more products to the cart and verify the displayed items and count.
- Continue through checkout, enter a delivery country, and verify the purchase confirmation.
- Check selected negative cases, including a missing catalog product and an empty cart.

Assertions are based on browser-visible outcomes such as the current URL, visible controls, displayed text, and cart contents. These tests do not verify server-side persistence, payment processing, API responses, or database state.

## Repository layout

```text
.
|-- .github/
|   `-- workflows/
|       `-- playwright.yml
|-- pages/
|   |-- CheckoutPage.js
|   |-- LoginPage.js
|   `-- ShopPage.js
|-- tests/
|   |-- checkout.spec.js
|   |-- login.spec.js
|   `-- shop.spec.js
|-- package.json
|-- package-lock.json
`-- playwright.config.js
```

The root Playwright configuration targets `tests/`. Test tiers use `@smoke`, `@regression`, `@negative`, and `@e2e` tags in the feature specs.

## Page Object Model

The page objects keep selectors and common interactions separate from scenario assertions:

- `LoginPage` handles login navigation, form entry, and sign-in options.
- `ShopPage` locates products and handles adding items to the cart.
- `CheckoutPage` handles checkout, delivery details, and purchase actions.

The specs use these page objects to express user flows while keeping expected outcomes in the tests.

## Getting started

### Requirements

- Node.js 20 or later (the CI workflow uses Node.js 22)
- npm

### Install

From the repository root:

```bash
npm ci
npx playwright install chrome
```

### Run tests

```bash
# Run all tests in the root tests/ directory
npm test

# Run with a visible browser
npm run test:headed

# Open Playwright's interactive UI mode
npm run test:ui

# Run one spec file
npx playwright test tests/shop.spec.js

# Run by test tier
npm run test:smoke
npm run test:regression
npm run test:negative
npm run test:e2e
```

Feature-specific commands include `npm run test:login`, `npm run test:shop`, and `npm run test:checkout`. Other available commands include `npm run test:debug`, `npm run test:chrome`, and `npm run test:file -- tests/shop.spec.js`.

## Reports and failure evidence

The root Playwright configuration writes the HTML report to `playwright-report/`. Run `npm run test:report` after a test run to open the report. Locally, the HTML reporter is configured to open automatically; in CI it does not attempt to open a browser.

On failure, Playwright is configured to capture screenshots and retain video. CI retries each failing test once, and traces are captured on the first retry. Generated reports and test results are ignored by Git and should not be committed.

## GitHub Actions

The workflow in `.github/workflows/playwright.yml` runs the root suite on pushes, pull requests, and manual dispatch. It uses an Ubuntu runner, installs Node.js 22 and Chrome, then runs `npm test` in headless CI mode. The HTML report and test-result files are uploaded as the `playwright-artifacts` workflow artifact and retained for 14 days, including when tests fail.

To view a run, open the repository's **Actions** tab, select a workflow run, and download its artifact.

## Scope and limitations

This is intentionally a UI-only project. It does not have access to the target application's source code, private API documentation, backend services, or database. A passing test means the checked browser-observable behavior matched expectations during that run; it does not prove that underlying data was persisted or that backend business rules are correct.

The application is an external practice site, so availability, content, and selectors may change outside this repository. The test credentials in the specs are for that demo site only. Do not put personal or production credentials in source files; use environment variables or CI secrets for private test accounts.

## Portfolio focus

This repository highlights practical QA automation skills: user-centered scenario design, reusable page objects, positive and negative UI coverage, controlled browser setup, readable assertions, report artifacts, and a CI workflow. The emphasis is on validating complete user journeys through the interface without implying access to systems outside the UI test boundary.
