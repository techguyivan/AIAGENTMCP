class ShopPage {
  constructor(page) {
    this.page = page;
    this.pageHeader = page.locator('h1');
    this.products = page.locator('.card');
    this.cartButton = page.locator('text=Checkout').first();
    this.addToCartButtons = page.locator('button:has-text("Add")');
    this.navBar = page.locator('.nav-link');
  }

  productByName(productName) {
    return this.products.filter({
      has: this.page.locator('h4.card-title', { hasText: productName }),
    });
  }

  async addToCart(productName) {
    const product = this.productByName(productName);
    await product.locator('button:has-text("Add")').click();
  }

  async openCart() {
    await this.cartButton.click();
    await this.page.locator('text=Product Quantity').waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = ShopPage;
