const { devices } = require('@playwright/test');

module.exports = {
  testDir: './tests',
  timeout: 30 * 1000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ],
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]]
};
