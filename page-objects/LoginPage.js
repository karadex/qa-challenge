export class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator('[id="user-name"]');
    this.passwordInput = page.locator('[id="password"]');
    this.loginButton = page.locator('[id="login-button"]');
  }

  navigateToLoginPage = async () => {
    await this.page.goto("https://www.saucedemo.com/");
  };

  // Populate login form and login to app
  login = async (loginData) => {
    await this.usernameInput.waitFor();
    await this.usernameInput.fill(loginData.username);
    await this.passwordInput.waitFor();
    await this.passwordInput.fill(loginData.password);
    await this.loginButton.waitFor();
    await this.loginButton.click();
  };

}