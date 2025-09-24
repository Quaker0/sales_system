export interface Product {
  code: string;
  name: string;
  price: number;
}

export interface BasketModel {
  add(productCode: string, quantity: number): void;
  total(): number;
}

export interface BasketItem {
  product: Product;
  quantity: number;
}

export interface DeliveryChargeRule {
  calculateDeliveryFee(subtotal: number): number;
}

export interface Offer {
  getDiscounts(items: BasketItem[]): number;
}

export interface ProductCatalogue {
  get(productCode: string): Product | undefined;
}
