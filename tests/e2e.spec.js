const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ShopPage = require('../pages/ShopPage');
const CheckoutPage = require('../pages/CheckoutPage');

const VALID_USERNAME = 'rahulshettyacademy';
const VALID_PASSWORD = 'Learning@830$3mK2';

async function loginSuccessfully(page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
  return loginPage;
}

test.describe('E2E critical user journey', () => {
  test('As a user, I want invalid credentials to be rejected so that my account stays secure', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wronguser', 'wrongpass');

    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('As a registered user, I want to sign in with valid credentials so that I can land on the shop page', async ({ page }) => {
    await loginSuccessfully(page);

    await expect(page).toHaveURL(/\/angularpractice\/shop$/);
    await expect(page.locator('h1')).toContainText('Shop Name');
  });

  test('As a shopper, I want to add a product and move to checkout so that I can review my order before purchasing', async ({ page }) => {
    await loginSuccessfully(page);

    const shopPage = new ShopPage(page);
    await shopPage.addToCart('iphone X');
    await shopPage.openCart();

    const checkoutPage = new CheckoutPage(page);
    await expect(page.locator('text=Product Quantity')).toBeVisible();
    await expect(page.locator('body')).toContainText('iphone X');
    await checkoutPage.proceedToCheckout();
    await expect(page.locator('text=Please choose your delivery location')).toBeVisible();
  });

  test('As a shopper, I want to complete a successful purchase so that I can confirm my order has been processed', async ({ page }) => {
    await loginSuccessfully(page);

    const shopPage = new ShopPage(page);
    await shopPage.addToCart('Samsung Note 8');
    await shopPage.openCart();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.proceedToCheckout();
    await checkoutPage.enterCountry('India');
    await checkoutPage.completePurchase();

    await expect(page.locator('body')).toContainText('Success');
  });
});
