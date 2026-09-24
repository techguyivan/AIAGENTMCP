const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

const VALID_USERNAME = 'rahulshettyacademy';
const VALID_PASSWORD = 'Learning@830$3mK2';

test.describe('LoginPage Practise', () => {
  test('As a registered user, I want to sign in with valid credentials so that I can access the shop page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

    await expect(page).toHaveURL(/\/angularpractice\/shop$/);
    await expect(page.locator('body')).toContainText('Shop');
  });

  test('As a user, I want to stay on the login page when my credentials are invalid so that I can correct my details', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wronguser', 'wrongpass');

    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('As a user, I want the app to block sign-in until I accept the terms so that I can comply with the required consent', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD, false);

    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.termsCheckbox).not.toBeChecked();
  });
});
