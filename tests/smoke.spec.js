const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ShopPage = require('../pages/ShopPage');

const VALID_USERNAME = 'rahulshettyacademy';
const VALID_PASSWORD = 'Learning@830$3mK2';

test.describe('Smoke tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
  });

  test('As a returning shopper, I want to sign in and view the catalog so that I can browse products quickly', async ({ page }) => {
    const shopPage = new ShopPage(page);

    await expect(page).toHaveURL(/\/angularpractice\/shop$/);
    await expect(shopPage.pageHeader).toContainText('Shop Name');
    await expect(shopPage.products).not.toHaveCount(0);
  });

  test('As a shopper, I want to add a product to the cart so that I can review it before checkout', async ({ page }) => {
    const shopPage = new ShopPage(page);

    await shopPage.addToCart('iphone X');
    await shopPage.openCart();

    await expect(page.locator('body')).toContainText('iphone X');
    await expect(page.locator('text=Product Quantity')).toBeVisible();
  });
});
