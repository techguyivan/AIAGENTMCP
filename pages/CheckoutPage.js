class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.pageHeader = page.locator('h1');
    this.cartItems = page.locator('text=Product Quantity').locator('..').locator('tbody tr');
    this.checkoutButton = page.locator('button:has-text("Checkout")');
    this.countryInput = page.locator('#country');
    this.purchaseButton = page.locator('input[type="submit"][value="Purchase"]');
    this.termsCheckbox = page.locator('#checkbox2');
    this.successMessage = page.locator('div.alert-success');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async enterCountry(countryName) {
    await this.countryInput.fill(countryName);
    await this.termsCheckbox.check({ force: true });
  }

  async completePurchase() {
    await this.page.locator('button:has-text("Close")').click({ force: true }).catch(() => {});
    await this.purchaseButton.click({ force: true });
  }
}

module.exports = CheckoutPage;
