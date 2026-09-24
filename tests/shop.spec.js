const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ShopPage = require('../pages/ShopPage');

const VALID_USERNAME = 'rahulshettyacademy';
const VALID_PASSWORD = 'Learning@830$3mK2';

async function loginSuccessfully(page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
}

test.describe('ShopPage', () => {
  test.beforeEach(async ({ page }) => {
    await loginSuccessfully(page);
  });

  test('As a shopper, I want the shop page to load with available products so that I can browse the catalog', async ({ page }) => {
    const shopPage = new ShopPage(page);

    await expect(page).toHaveURL(/\/angularpractice\/shop$/);
    await expect(shopPage.pageHeader).toContainText('Shop Name');
    await expect(shopPage.products).not.toHaveCount(0);
  });

  test('As a shopper, I want the sidebar category links to route me back to the home page so that I can navigate the shop easily', async ({ page }) => {
    const categoryLinks = page.locator('.list-group-item');

    await expect(categoryLinks).toHaveCount(3);

    for (let i = 0; i < await categoryLinks.count(); i++) {
      const link = categoryLinks.nth(i);
      await expect(link).toBeVisible();

      await link.click();
      await expect(page).toHaveURL(/https:\/\/rahulshettyacademy\.com\/angularpractice\/?$/);
      await expect(page.locator('body')).toContainText('Protractor Tutorial');
      await page.goto('https://rahulshettyacademy.com/angularpractice/shop');
    }
  });

  test('As a shopper, I want to add a valid product to my cart so that I can review it before checkout', async ({ page }) => {
    const shopPage = new ShopPage(page);

    await shopPage.addToCart('iphone X');
    await shopPage.openCart();

    await expect(page.locator('body')).toContainText('iphone X');
    await expect(page.locator('text=Product Quantity')).toBeVisible();
  });

  test('As a shopper, I want the checkout count to reflect every item I added so that I know exactly what is in my cart', async ({ page }) => {
    const shopPage = new ShopPage(page);
    const productNames = await page.locator('.card h4.card-title').allTextContents();
    const normalizedNames = productNames.map(name => name.trim()).filter(Boolean);

    for (const productName of normalizedNames) {
      await shopPage.addToCart(productName);
    }

    const checkoutButton = page.locator('text=Checkout').first();
    await expect(checkoutButton).toContainText(String(normalizedNames.length));
    await expect(checkoutButton).toContainText('Checkout');
  });

  test('As a shopper, I want invalid products to stay out of the catalog so that I only see items that are available', async ({ page }) => {
    const shopPage = new ShopPage(page);
    const missingProduct = shopPage.productByName('This Product Does Not Exist');

    await expect(missingProduct).toHaveCount(0);
  });

  test('As a shopper, I want the cart to stay empty until I add products so that I do not see incorrect items before checkout', async ({ page }) => {
    const shopPage = new ShopPage(page);

    await shopPage.openCart();

    await expect(page.locator('text=Product Quantity')).toBeVisible();
    await expect(page.locator('body')).not.toContainText('This Product Does Not Exist');
  });
});
