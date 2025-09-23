import type { Product } from "./Product.js";

export abstract class Offer {
  abstract getDiscounts(
    items: { product: Product; quantity: number }[]
  ): number;
}

export class HalfOffEverySecondProductOffer implements Offer {
  constructor(readonly productCode: string) {}

  getDiscounts(items: { product: Product; quantity: number }[]): number {
    let hasSeenOddProductCodes = false;
    return items
      .filter((item) => item.product.code === this.productCode)
      .map((item) => {
        let discount = 0;
        for (let i = 0; i < item.quantity; i++) {
          if (hasSeenOddProductCodes) {
            discount += item.product.price / 2;
            hasSeenOddProductCodes = false;
          } else {
            hasSeenOddProductCodes = true;
          }
        }
        return discount;
      })
      .reduce((a, b) => a + b, 0);
  }
}
