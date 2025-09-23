import type { DeliveryChargeRule } from "./DeliveryChargeRule.js";
import type { Offer } from "./Offer.js";
import type { ProductCatalogue } from "./ProductCatalogue.js";

export class Basket {
  productQuantities: Map<string, number>;

  constructor(
    readonly productCatalogue: ProductCatalogue,
    readonly deliveryChargeRules: DeliveryChargeRule,
    readonly offers: Offer[]
  ) {
    this.productQuantities = new Map();
  }

  add(productCode: string, quantity: number = 1) {
    const currentQuantity = this.productQuantities.get(productCode) || 0;
    this.productQuantities.set(productCode, currentQuantity + quantity);
  }

  total(): number {
    let basketTotal = 0;
    this.productQuantities.forEach((quantity, productCode) => {
      const product = this.productCatalogue.get(productCode);
      if (product) {
        const discounts = this.offers
          .map((offer) => offer.getDiscount(product, quantity))
          .reduce((a, b) => a + b, 0);
        basketTotal += product.price * quantity - discounts;
      }
    });
    return (
      Math.floor(
        100 * (basketTotal + this.deliveryChargeRules.calculate(basketTotal))
      ) / 100
    );
  }
}
