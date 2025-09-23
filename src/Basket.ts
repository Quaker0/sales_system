import type { DeliveryChargeRule } from "./DeliveryChargeRule.js";
import type { Offer } from "./Offer.js";
import type { Product } from "./Product.js";
import type { ProductCatalogue } from "./ProductCatalogue.js";

export class Basket {
  productQuantities: Map<string, number>;

  constructor(
    private productCatalogue: ProductCatalogue,
    private deliveryChargeRules: DeliveryChargeRule,
    private offers: Offer[]
  ) {
    this.productQuantities = new Map();
  }

  add(productCode: string, quantity: number = 1) {
    const currentQuantity = this.productQuantities.get(productCode) || 0;
    this.productQuantities.set(productCode, currentQuantity + quantity);
  }

  total(): number {
    const basketItems: { product: Product; quantity: number }[] = [];
    this.productQuantities.forEach((quantity, productCode) => {
      const product = this.productCatalogue.get(productCode);
      if (product) {
        basketItems.push({ product, quantity });
      }
    });

    const discounts = this.offers
      .map((offer) => offer.getDiscounts(basketItems))
      .reduce((acc, curr) => acc + curr, 0);

    const basketTotalWithDiscounts =
      basketItems.reduce(
        (acc, curr) => acc + curr.product.price * curr.quantity,
        0
      ) - discounts;

    const deliveryFee = this.deliveryChargeRules.calculate(
      basketTotalWithDiscounts
    );
    const total = basketTotalWithDiscounts + deliveryFee;
    return Math.floor(100 * total) / 100;
  }
}
