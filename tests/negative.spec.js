const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ShopPage = require('../pages/ShopPage');

const VALID_USERNAME = 'rahulshettyacademy';
const VALID_PASSWORD = 'Learning@830$3mK2';

test.describe('Negative tests', () => {
  test('As a user, I want invalid credentials to be rejected so that only valid sign-ins are allowed', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wronguser', 'wrongpass');

    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('As a user, I want the app to block access until I accept the terms so that I can meet the site requirements', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD, false);

    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.termsCheckbox).not.toBeChecked();
  });

  test('As a shopper, I want invalid products to stay hidden so that I only see items that are actually available', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const shopPage = new ShopPage(page);

    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

    const missingProduct = shopPage.productByName('This Product Does Not Exist');

    await expect(missingProduct).toHaveCount(0);
  });

  test('As a shopper, I want the cart to remain empty until I add products so that I do not see incorrect or unexpected items', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const shopPage = new ShopPage(page);

    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await shopPage.openCart();

    await expect(page.locator('text=Product Quantity')).toBeVisible();
    await expect(page.locator('body')).not.toContainText('This Product Does Not Exist');
  });
});
