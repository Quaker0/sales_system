import test, { beforeEach, describe } from "node:test";
import assert from "node:assert";
import { InMemoryProductCatalogue } from "../src/ProductCatalogue.js";
import type { Product, ProductCatalogue } from "../src/types.js";

describe("Test ProductCatalogue", () => {
  let catalogue: ProductCatalogue;
  let products: Product[];

  beforeEach(() => {
    products = [
      { code: "R01", name: "Red Widget", price: 32.95 },
      { code: "G01", name: "Green Widget", price: 24.95 },
    ];
    catalogue = new InMemoryProductCatalogue(products);
  });

  test("Gets existing product", () => {
    const product = catalogue.get("R01");
    assert.strictEqual(product?.name, "Red Widget");
    assert.strictEqual(product?.price, 32.95);
  });

  test("Returns undefined for non-existent product", () => {
    const product = catalogue.get("B01");
    assert.strictEqual(product, undefined);
  });

  test("Handles empty catalogue", () => {
    const emptyCatalogue = new InMemoryProductCatalogue([]);
    const product = emptyCatalogue.get("R01");
    assert.strictEqual(product, undefined);
  });
});
