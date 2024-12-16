import { expect } from "@playwright/test";

export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;

    this.confirmationMessage = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[id="back-to-products"]');
  }

  // Assert order confirmation
  assertOrderConfirmation = async () => {
    await expect(this.confirmationMessage).toHaveText("Thank you for your order!");
    await expect(this.backHomeButton).toBeVisible();
  }
}