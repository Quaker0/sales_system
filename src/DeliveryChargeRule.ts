export abstract class DeliveryChargeRule {
  abstract calculate(basketTotal: number): number;
}

export class DeliveryChargeTieredRule implements DeliveryChargeRule {
  constructor(private tiers: { maxValue: number; cost: number }[]) {}

  calculate(basketTotal: number): number {
    if (basketTotal === 0) {
      return 0;
    }
    for (const tier of this.tiers) {
      if (basketTotal < tier.maxValue) {
        return tier.cost;
      }
    }
    return 0;
  }
}
