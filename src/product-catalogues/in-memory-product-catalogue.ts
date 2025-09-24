import type { Product, ProductCatalogue } from "../types.js";

export class InMemoryProductCatalogue implements ProductCatalogue {
  productCatalogue: Map<string, Product>;

  constructor(products: Product[]) {
    this.productCatalogue = new Map();
    products.forEach((product) => {
      this.productCatalogue.set(product.code, product);
    });
  }

  get(productCode: string): Product | undefined {
    return this.productCatalogue.get(productCode);
  }
}
