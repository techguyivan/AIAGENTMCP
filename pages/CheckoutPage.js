class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.pageHeader = page.locator('h1');
    this.cartItems = page.locator('text=Product Quantity').locator('..').locator('tbody tr');
    this.checkoutButton = page.locator('button:has-text("Checkout")');
    this.countryInput = page.locator('#country');
    this.closeCountryModalButton = page.locator('button:has-text("Close")');
    this.purchaseButton = page.locator('input[type="submit"][value="Purchase"]');
    this.termsCheckbox = page.locator('#checkbox2');
    this.termsCheckboxLabel = page.locator('label[for="checkbox2"]');
    this.successMessage = page.locator('div.alert-success');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async enterCountry(countryName) {
    await this.countryInput.fill(countryName);
    await this.termsCheckboxLabel.click();
  }

  async completePurchase() {
    await this.closeCountryModalButton.click();
    await this.purchaseButton.click();
  }
}

module.exports = CheckoutPage;
