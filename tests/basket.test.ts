import test, { beforeEach, describe } from "node:test";
import assert from "node:assert";
import { Basket } from "../src/basket.js";
import { InMemoryProductCatalogue } from "../src/product-catalogues/in-memory-product-catalogue.js";
import { DeliveryChargeTieredRule } from "../src/delivery-charge-rules/deliver-charge-tiered-rule.js";
import { HalfOffEveryXProductOffer } from "../src/offers/half-off-every-x-product-offer.js";

let basket: Basket;
describe("Test Basket Logic", async () => {
  beforeEach(() => {
    const products = [
      { code: "R01", name: "Red Widget", price: 32.95 },
      { code: "G01", name: "Green Widget", price: 24.95 },
      { code: "B01", name: "Blue Widget", price: 7.95 },
    ];
    const productCatalogue = new InMemoryProductCatalogue(products);
    const deliveryChargeRule = new DeliveryChargeTieredRule([
      { maxValue: 50, cost: 4.95 },
      { maxValue: 90, cost: 2.95 },
    ]);
    const offers = [new HalfOffEveryXProductOffer("R01", 2)];
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
