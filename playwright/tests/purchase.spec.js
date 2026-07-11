const { test, expect } = require('@playwright/test');

// NOTE: Update credentials if needed.
const USERNAME = 'rahulshettyacademy';
const PASSWORD = 'Learning@830$3mK2';

test('login, add iPhone X to cart and verify at checkout', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await page.locator('input#username, input[name="username"]').fill(USERNAME);
  await page.locator('input#password, input[name="password"]').fill(PASSWORD);

  await page.locator('label:has-text("Admin"), input[value="admin"], input#admin').first().click();
  await page.locator('select').selectOption({ label: 'Student' });

  await page.locator('input[type="checkbox"]').check();
  await page.locator('input#signInBtn, button:has-text("Sign In"), input[value="Sign In"]').click();

  const products = page.locator('.card, .product, .product-card');
  await products.first().waitFor({ state: 'visible', timeout: 20000 });

  const count = await products.count();
  let added = false;
  for (let i = 0; i < count; i++) {
    const card = products.nth(i);
    const title = (await card.innerText()).toLowerCase();
    if (title.includes('iphone x') || title.includes('iphone')) {
      const addBtn = card.locator('button:has-text("Add")');
      await addBtn.first().click();
      added = true;
      break;
    }
  }

  if (!added) {
    throw new Error('iPhone X not found in product list');
  }

  const checkoutAnchor = page.locator('a:has-text("Checkout")');
  await expect(checkoutAnchor).toContainText(/Checkout \(\s*1\s*\)/, { timeout: 10000 });

  await Promise.all([
    page.waitForLoadState('networkidle'),
    checkoutAnchor.first().click()
  ]);
  const checkoutList = page.locator('table, .cartTable, .cart-items, .cart, .cartSection');
  await expect(checkoutList).toContainText(/iphone\s*x/i);
});
