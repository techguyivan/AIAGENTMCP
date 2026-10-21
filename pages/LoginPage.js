class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.userRadio = page.locator('input[value="user"]');
    this.adminRadio = page.locator('input[value="admin"]');
    this.roleDropdown = page.locator('select.form-control');
    this.termsCheckbox = page.locator('#terms');
    this.signInButton = page.locator('#signInBtn');
    this.cancelButton = page.locator('#cancelBtn');
    this.okayButton = page.locator('#okayBtn');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/', { waitUntil: 'domcontentloaded' });
  }

  async login(username, password, acceptTerms = true) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    if (!acceptTerms) {
      await this.termsCheckbox.uncheck();
      return;
    }

    await this.termsCheckbox.check();

    const acceptDialog = dialog => dialog.accept();
    this.page.once('dialog', acceptDialog);

    try {
      await this.signInButton.click();
    } finally {
      this.page.off('dialog', acceptDialog);
    }
  }

  async selectUserRole(role) {
    await this.roleDropdown.selectOption(role);
  }

  async chooseUserType(type) {
    if (type === 'admin') {
      await this.adminRadio.check();
    } else {
      await this.userRadio.check();
    }
  }
}

module.exports = LoginPage;
