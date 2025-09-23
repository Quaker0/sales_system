export abstract class DeliveryChargeRule {
  abstract calculate(basketTotal: number): number;
}

export class DeliveryChargeDiscountRule implements DeliveryChargeRule {
  // TODO: make more generic?
  constructor() {}

  calculate(basketTotal: number): number {
    switch (true) {
      case basketTotal === 0:
        return 0;
      case basketTotal >= 90:
        return 0;
      case basketTotal >= 50:
        return 2.95;
      case basketTotal < 50:
        return 4.95;
      default:
        // Send alert, should never happen
        return 0;
    }
  }
}
