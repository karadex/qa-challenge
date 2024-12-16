import { test } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { ProductsPage } from "../../page-objects/ProductsPage";
import { ShoppingCartPage } from "../../page-objects/ShoppingCartPage";
import { CheckoutInformationPage } from "../../page-objects/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../../page-objects/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../../page-objects/CheckoutCompletePage";
import { loginData } from "../../data/loginData";
import { productData } from "../../data/productData";
import { checkoutInformationData, checkoutOverviewData } from "../../data/checkoutData";

test("Proceed to checkout and complete order", async ({ page }) => {
  // Test case ID: AUREUM-14
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

  // Click [Checkout]
  await shoppingCartPage.clickCheckout();

  // Enter data
  const checkoutInformationPage = new CheckoutInformationPage(page);
  await checkoutInformationPage.checkPageLayout();
  await checkoutInformationPage.enterCheckoutData(checkoutInformationData);

  // Click [Continue]
  await checkoutInformationPage.clickContinue();
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  await checkoutOverviewPage.assertOrderDetails(checkoutOverviewData);

  // Click [Finish]
  await checkoutOverviewPage.clickFinish();
  const checkoutCompletePage = new CheckoutCompletePage(page);
  await checkoutCompletePage.assertOrderConfirmation();
});