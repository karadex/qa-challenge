import { expect } from "@playwright/test";

export class CheckoutInformationPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('[id="first-name"]');
    this.lastNameInput = page.locator('[id="last-name"]');
    this.postalCodeInput = page.locator('[id="postal-code"]');
    this.continueButton = page.locator('[id="continue"]');
    this.cancelButton = page.locator('[id="cancel"]');
  }

  // Assert that page elements are visible
  checkPageLayout = async () => {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
  };

  // Enter checkout information
  enterCheckoutData = async (checkoutInformationData) => {
    await this.firstNameInput.waitFor();
    await this.firstNameInput.fill(checkoutInformationData.firstName);
    await this.lastNameInput.waitFor();
    await this.lastNameInput.fill(checkoutInformationData.lastName);
    await this.postalCodeInput.waitFor();
    await this.postalCodeInput.fill(checkoutInformationData.postalCode);
  };

  // Proceed to checkout overview
  clickContinue = async () => {
    await this.continueButton.waitFor();
    await this.continueButton.click();
  };
}