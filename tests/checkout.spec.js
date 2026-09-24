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
}

test.describe('Checkout flow', () => {
  test.beforeEach(async ({ page }) => {
    await loginSuccessfully(page);
  });

  test('As a shopper, I want to complete a purchase from the shop page so that I can finish my order successfully', async ({ page }) => {
    const shopPage = new ShopPage(page);
    const checkoutPage = new CheckoutPage(page);

    await shopPage.addToCart('Samsung Note 8');
    await shopPage.openCart();

    await checkoutPage.proceedToCheckout();
    await expect(page.locator('body')).toContainText('Please choose your delivery location');

    await checkoutPage.enterCountry('India');
    await checkoutPage.completePurchase();

    await expect(checkoutPage.successMessage).toBeVisible();
    await expect(page.locator('body')).toContainText('Success');
  });
});
