import type { DeliveryChargeRule } from "../types.js";

export class DeliveryChargeTieredRule implements DeliveryChargeRule {
  constructor(private tiers: { maxValue: number; cost: number }[]) {}

  calculateDeliveryFee(basketTotal: number): number {
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
