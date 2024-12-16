import { expect } from "@playwright/test";

export class ShoppingCartPage {
  constructor(page) {
    this.page = page;

    this.productTitle = page.locator('[data-test="inventory-item-name"]');
    this.productQuantity = page.locator('[data-test="item-quantity"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.checkoutButton = page.locator('[id="checkout"]');
  }

  // Verify product details in the cart
  productIsListedInShoppingCart = async (productData) => {
    await expect(this.productTitle).toHaveText(productData.title);
    await expect(this.productQuantity).toHaveText(productData.quantity);
    await expect(this.productPrice).toHaveText(productData.price);
  };

  // Proceed to checkout
  clickCheckout = async () => {
    await this.checkoutButton.waitFor();
    await this.checkoutButton.click();
  };

}