import type { Product } from "./Product.js";

export abstract class Offer {
  abstract getDiscounts(
    items: { product: Product; quantity: number }[]
  ): number;
}

export class HalfOffEveryXProductOffer implements Offer {
  constructor(private productCode: string, private everyX: number) {
    if (this.everyX < 1) {
      throw new Error("everyX must be at least 1");
    }
  }

  getDiscounts(items: { product: Product; quantity: number }[]): number {
    let productCount = 0;
    return items
      .filter((item) => item.product.code === this.productCode)
      .map((item) => {
        let discount = 0;
        for (let i = 0; i < item.quantity; i++) {
          productCount += 1;
          if (productCount % this.everyX === 0) {
            discount += item.product.price / 2;
          }
        }
        return discount;
      })
      .reduce((a, b) => a + b, 0);
  }
}
