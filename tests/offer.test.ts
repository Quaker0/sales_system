import test, { beforeEach, describe } from "node:test";
import assert from "node:assert";
import { HalfOffEveryXProductOffer } from "../src/Offer.js";
import type { Product } from "../src/types.js";

describe("Test Offers", () => {
  describe("HalfOffEverySecondProductOffer", () => {
    let offer: HalfOffEveryXProductOffer;
    let redProduct: Product;
    let greenProduct: Product;

    beforeEach(() => {
      redProduct = { code: "R01", price: 20, name: "Red Widget" };
      greenProduct = { code: "G01", price: 20, name: "Green Widget" };
      offer = new HalfOffEveryXProductOffer("R01", 2);
    });

    test("No discount for single item", () => {
      const offer = new HalfOffEveryXProductOffer("R01", 2);
      const items = [{ product: redProduct, quantity: 1 }];
      assert.strictEqual(offer.getDiscounts(items), 0);
    });

    test("50% discount on second item", () => {
      const offer = new HalfOffEveryXProductOffer("R01", 2);
      const items = [{ product: redProduct, quantity: 2 }];
      assert.strictEqual(offer.getDiscounts(items), 10);
    });

    test("No discount for unique products", () => {
      const offer = new HalfOffEveryXProductOffer("R01", 2);
      const items = [{ product: greenProduct, quantity: 2 }];
      assert.strictEqual(offer.getDiscounts(items), 0);
    });

    test("Correct discount for large quantities", () => {
      const offer = new HalfOffEveryXProductOffer("R01", 2);
      const items = [{ product: redProduct, quantity: 40 }];
      assert.strictEqual(offer.getDiscounts(items), 200);
    });

    test("Half price on every item", () => {
      const offer = new HalfOffEveryXProductOffer("R01", 1);
      const items = [{ product: redProduct, quantity: 2 }];
      assert.strictEqual(offer.getDiscounts(items), 20);
    });

    test("Half price on every third item", () => {
      const offer = new HalfOffEveryXProductOffer("R01", 3);
      const items = [{ product: redProduct, quantity: 3 }];
      assert.strictEqual(offer.getDiscounts(items), 10);
    });
  });
});
