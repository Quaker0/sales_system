import type {
  Offer,
  DeliveryChargeRule,
  BasketItem,
  BasketModel,
} from "./types.js";
import type { ProductCatalogue } from "./types.js";

export class Basket implements BasketModel {
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
    const basketItems = this.getBasketItems();
    const subtotal = this.calculateSubtotal(basketItems);
    const discounts = this.calculateDiscounts(basketItems);
    const subtotalAfterDiscounts = subtotal - discounts;
    const deliveryFee = this.deliveryChargeRules.calculateDeliveryFee(
      subtotalAfterDiscounts
    );
    return this.roundToTwoDecimals(subtotalAfterDiscounts + deliveryFee);
  }

  private getBasketItems(): BasketItem[] {
    const basketItems: BasketItem[] = [];
    this.productQuantities.forEach((quantity, productCode) => {
      const product = this.productCatalogue.get(productCode);
      if (product) {
        basketItems.push({ product, quantity });
      }
    });
    return basketItems;
  }

  private calculateSubtotal(items: BasketItem[]): number {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  private calculateDiscounts(items: BasketItem[]): number {
    return this.offers.reduce(
      (total, offer) => total + offer.getDiscounts(items),
      0
    );
  }

  private roundToTwoDecimals(amount: number): number {
    return Math.floor(100 * amount) / 100;
  }
}
