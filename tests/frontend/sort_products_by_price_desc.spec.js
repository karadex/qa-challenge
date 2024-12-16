import { test } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { ProductsPage } from "../../page-objects/ProductsPage";
import { loginData } from "../../data/loginData";
import { productSortOptions } from "../../data/productSortOptions";

test("Sort products by price desc", async ({ page }) => {
  // Test Case ID: AUREUM-9
  // Login to Application
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.login(loginData);

  // Select sorting: Price (high to low)
  const productsPage = new ProductsPage(page);
  await productsPage.sortProductsByPriceDesc(productSortOptions);
});