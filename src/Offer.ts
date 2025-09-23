import type { Product } from "./Product.js";

export abstract class Offer {
  abstract getDiscount(product: Product, quantity: number): number;
}

export class HalfOffEverySecondProductOffer implements Offer {
  hasSeenOddProductCode: boolean = false;
  constructor(readonly productCode: string) {}

  getDiscount(product: Product, quantity: number): number {
    if (product.code !== this.productCode) {
      return 0;
    }

    let discount = 0;
    for (let i = 0; i < quantity; i++) {
      if (this.hasSeenOddProductCode) {
        discount += product.price / 2;
        this.hasSeenOddProductCode = false;
      } else {
        this.hasSeenOddProductCode = true;
      }
    }
    return discount;
  }
}
