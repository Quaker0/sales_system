import test, { beforeEach, describe } from "node:test";
import assert from "node:assert";
import { Basket } from "../src/Basket.js";
import { ProductCatalogue } from "../src/ProductCatalogue.js";
import { DeliveryChargeDiscountRule } from "../src/DeliveryChargeRule.js";
import { HalfOffEverySecondProductOffer } from "../src/Offer.js";

let basket: Basket;
describe("Test Basket Logic", async () => {
  beforeEach(() => {
    const products = [
      { code: "R01", name: "Red Widget", price: 32.95 },
      { code: "G01", name: "Green Widget", price: 24.95 },
      { code: "B01", name: "Blue Widget", price: 7.95 },
    ];
    const productCatalogue = new ProductCatalogue(products);
    const deliveryChargeRule = new DeliveryChargeDiscountRule();
    const offers = [new HalfOffEverySecondProductOffer("R01")];
    basket = new Basket(productCatalogue, deliveryChargeRule, offers);
  });

  test("Empty basket", () => {
    assert.strictEqual(basket.total(), 0);
  });

  test("Basket case 1", () => {
    basket.add("B01");
    basket.add("G01");
    assert.strictEqual(basket.total(), 37.85);
  });

  test("Basket case 2", () => {
    basket.add("R01", 2);
    assert.strictEqual(basket.total(), 54.37);
  });

  test("Basket case 3", () => {
    basket.add("R01", 1);
    basket.add("G01", 1);
    assert.strictEqual(basket.total(), 60.85);
  });

  test("Basket case 4", () => {
    basket.add("B01", 2);
    basket.add("R01", 3);
    assert.strictEqual(basket.total(), 98.27);
  });
});
