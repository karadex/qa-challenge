import { test } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { ProductsPage } from "../../page-objects/ProductsPage";
import { ShoppingCartPage } from "../../page-objects/ShoppingCartPage";
import { loginData } from "../../data/loginData";
import { productData } from "../../data/productData";

test("Add product to cart", async ({ page }) => {
  // Test case ID: AUREUM-10
  // Login to Application
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.login(loginData);

  // Click [Add to cart]
  const productsPage = new ProductsPage(page);
  await productsPage.addProductItemToCart();

  // Click [Cart]
  await productsPage.navigateToShoppingCart();
  const shoppingCartPage = new ShoppingCartPage(page);
  await shoppingCartPage.productIsListedInShoppingCart(productData);
});