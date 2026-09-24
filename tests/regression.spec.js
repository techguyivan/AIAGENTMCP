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

test.describe('Regression tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginSuccessfully(page);
  });

  test('As a shopper, I want the catalog to display correctly so that I can browse the available products without regressions', async ({ page }) => {
    const shopPage = new ShopPage(page);

    await expect(page).toHaveURL(/\/angularpractice\/shop$/);
    await expect(shopPage.pageHeader).toContainText('Shop Name');
    await expect(shopPage.products).not.toHaveCount(0);
  });

  test('As a shopper, I want my selected product to be added to the cart reliably so that I can proceed without errors', async ({ page }) => {
    const shopPage = new ShopPage(page);

    await shopPage.addToCart('iphone X');
    await shopPage.openCart();

    await expect(page.locator('body')).toContainText('iphone X');
    await expect(page.locator('text=Product Quantity')).toBeVisible();
  });

  test('As a shopper, I want to complete a purchase through checkout so that my order is processed without regressions', async ({ page }) => {
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

  test('As a shopper, I want the category links to keep navigating to the correct page so that my browsing experience stays consistent', async ({ page }) => {
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
});
