import type { DeliveryChargeRule } from "./DeliveryChargeRule.js";
import type { ProductCatalogue } from "./ProductCatalogue.js";

export class Basket {
  productQuantities: Map<string, number>;

  constructor(
    readonly productCatalogue: ProductCatalogue,
    readonly deliveryChargeRules: DeliveryChargeRule,
    readonly offers: any[]
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
        basketTotal += product.price * quantity;
      }
    });
    return (
      Math.floor(
        100 * (basketTotal + this.deliveryChargeRules.calculate(basketTotal))
      ) / 100
    );
  }
}
