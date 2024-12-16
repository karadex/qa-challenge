import { expect } from "@playwright/test"

export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.bikeLightAddToCartButton = page.locator('[id="add-to-cart-sauce-labs-bike-light"]');
    this.bikeLightRemoveButton = page.locator('[id="remove-sauce-labs-bike-light"]');
    this.shoppingCart = page.locator('[id="shopping_cart_container"]');
    this.cartItemsBadgeNumber = page.locator('[data-test="shopping-cart-badge"]');
    this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
  }

  // Add product item to cart and verify cart counter
  addProductItemToCart = async () => {
    await this.bikeLightAddToCartButton.waitFor();
    await this.bikeLightAddToCartButton.click();
    await expect(this.bikeLightRemoveButton).toHaveText("Remove");
    await expect(this.cartItemsBadgeNumber).toHaveText("1");
  };

  // Navigate to shopping cart
  navigateToShoppingCart = async () => {
    await this.shoppingCart.waitFor();
    await this.shoppingCart.click();
  };

  // Sort products by price desc
  sortProductsByPriceDesc = async (productSortOptions) => {
    await this.productSortDropdown.waitFor();
    await this.productPrice.first().waitFor();

    // Get the text content of all inventory item prices before sorting.
    const productPriceBeforeSorting = await this.productPrice.allTextContents();

    // Select the sorting option from the product sort dropdown.
    await this.productSortDropdown.selectOption(productSortOptions.priceDesc);

    // Get the text content of all inventory item prices after sorting.
    const productPriceAfterSorting = await this.productPrice.allTextContents();

    // Convert prices to numbers for comparison
    const pricesBeforeSorting = productPriceBeforeSorting.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    const pricesAfterSorting = productPriceAfterSorting.map((price) =>
      parseFloat(price.replace("$", ""))
    );

    // Check if prices are sorted in descending order after sorting
    const isSortedDescending = pricesAfterSorting.every(
      (price, index) => index === 0 || pricesAfterSorting[index - 1] >= price
    );

    // Verify that products are sorted in descending order by price (high to low)
    expect(isSortedDescending).toBe(true);
    expect(pricesAfterSorting).not.toEqual(pricesBeforeSorting);
  };

  // Sort products by name desc
  sortProductsByNameDesc = async (productSortOptions) => {
    await this.productSortDropdown.waitFor();
    await this.productName.first().waitFor();

    // Get the text content of all inventory item names before sorting.
    const productNamesBeforeSorting = await this.productName.allTextContents();

    // Select the sorting option from the product sort dropdown.
    await this.productSortDropdown.selectOption(productSortOptions.nameDesc);

    // Get the text content of all inventory item names after sorting.
    const productNamesAfterSorting = await this.productName.allTextContents();

    // Check if names are sorted in descending order (Z to A) after sorting
    const isSortedDescending = productNamesAfterSorting.every(
      (name, index) =>
        index === 0 || productNamesAfterSorting[index - 1].localeCompare(name) >= 0
    );

    // Verify that products are sorted in descending order by name (Z to A)
    expect(isSortedDescending).toBe(true);
    expect(productNamesAfterSorting).not.toEqual(productNamesBeforeSorting);
  };

}