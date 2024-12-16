import { test } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { ProductsPage } from "../../page-objects/ProductsPage";
import { loginData } from "../../data/loginData";
import { productSortOptions } from "../../data/productSortOptions";

test("Sort products by name desc", async ({ page }) => {
  // Test Case ID: AUREUM-8
  // Login to Application
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.login(loginData);

  // Select sorting: Name (Z to A)
  const productsPage = new ProductsPage(page);
  await productsPage.sortProductsByNameDesc(productSortOptions);
});