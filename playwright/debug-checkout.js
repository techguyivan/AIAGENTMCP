const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('input#username, input[name="username"]').fill('rahulshettyacademy');
  await page.locator('input#password, input[name="password"]').fill('Learning@830$3mK2');
  await page.locator('label:has-text("Admin"), input[value="admin"], input#admin').first().click();
  await page.locator('select').selectOption({ label: 'Student' });
  await page.locator('input[type="checkbox"]').check();
  await page.locator('input#signInBtn, button:has-text("Sign In"), input[value="Sign In"]').click();
  await page.waitForTimeout(5000);
  const checkoutButtons = [
    page.locator('button:has-text("Checkout")'),
    page.locator('a:has-text("Checkout")'),
    page.locator('text=Checkout')
  ];
  for (const locator of checkoutButtons) {
    const count = await locator.count();
    console.log('locator', await locator.toString(), 'count', count);
    for (let i = 0; i < count; i++) {
      const handle = locator.nth(i);
      console.log('outerHTML', await handle.evaluate(el => el.outerHTML));
      console.log('text:', await handle.innerText());
    }
  }
  const cartLocator = page.locator('a.cart-icon, .cart-icon, .cart');
  console.log('cart count', await cartLocator.count());
  for (let i = 0; i < await cartLocator.count(); i++) {
    const handle = cartLocator.nth(i);
    console.log('cart outerHTML', await handle.evaluate(el => el.outerHTML));
    console.log('cart text', await handle.innerText());
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
