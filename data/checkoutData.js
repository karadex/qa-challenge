import { names, uniqueNamesGenerator } from "unique-names-generator";
import { generateRandomNumber } from "../utils/randomNumbersGenerator";

export const checkoutInformationData = {
    firstName: uniqueNamesGenerator({ dictionaries: [names] }),
    lastName: uniqueNamesGenerator({ dictionaries: [names] }),
    postalCode: String(generateRandomNumber())
};

export const checkoutOverviewData = {
    productTitle: "Sauce Labs Bike Light",
    productQuantity: "1",
    productPrice: "$9.99",
    paymentInfoLabel: "Payment Information:",
    paymentInfoValue: "SauceCard #31337",
    shippingInfoLabel: "Shipping Information:",
    shippingInfoValue: "Free Pony Express Delivery!",
    priceTotal: "Price Total",
    subtotal: "Item total: $9.99",
    tax: "Tax: $0.80",
    total: "Total: $10.79"
};