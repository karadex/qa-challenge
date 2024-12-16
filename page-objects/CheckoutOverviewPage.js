import { expect } from "@playwright/test";

export class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;

    this.productTitle = page.locator('[data-test="inventory-item-name"]');
    this.productQuantity = page.locator('[data-test="item-quantity"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.paymentInfoLabel = page.locator('[data-test="payment-info-label"]');
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoLabel = page.locator('[data-test="shipping-info-label"]');
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.priceTotalLabel = page.locator('[data-test="total-info-label"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[id="finish"]');
    this.cancelButton = page.locator('[id="cancel"]');
  }

  // Assert order details
  assertOrderDetails = async (checkoutOverviewData) => {
    await expect(this.productTitle).toHaveText(checkoutOverviewData.productTitle);
    await expect(this.productQuantity).toHaveText(checkoutOverviewData.productQuantity);
    await expect(this.productPrice).toHaveText(checkoutOverviewData.productPrice);
    await expect(this.paymentInfoLabel).toHaveText(checkoutOverviewData.paymentInfoLabel);
    await expect(this.paymentInfoValue).toHaveText(checkoutOverviewData.paymentInfoValue);
    await expect(this.shippingInfoLabel).toHaveText(checkoutOverviewData.shippingInfoLabel);
    await expect(this.shippingInfoValue).toHaveText(checkoutOverviewData.shippingInfoValue);
    await expect(this.priceTotalLabel).toHaveText(checkoutOverviewData.priceTotal);
    await expect(this.subtotalLabel).toHaveText(checkoutOverviewData.subtotal);
    await expect(this.taxLabel).toHaveText(checkoutOverviewData.tax);
    await expect(this.totalLabel).toHaveText(checkoutOverviewData.total);
    await expect(this.cancelButton).toBeVisible();
    await expect(this.finishButton).toBeVisible();
  }

  // Complete the order
  clickFinish = async () => {
    await this.finishButton.waitFor();
    await this.finishButton.click();
  };
}