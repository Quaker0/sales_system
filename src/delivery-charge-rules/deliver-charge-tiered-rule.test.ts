import test, { beforeEach, describe } from "node:test";
import assert from "node:assert";
import { DeliveryChargeTieredRule } from "./deliver-charge-tiered-rule.js";

describe("Test DeliveryChargeTieredRule", () => {
  let rule: DeliveryChargeTieredRule;

  beforeEach(() => {
    rule = new DeliveryChargeTieredRule([
      { maxValue: 50, cost: 4.95 },
      { maxValue: 90, cost: 2.95 },
    ]);
  });

  test("No fee for zero total", () => {
    assert.strictEqual(rule.calculateDeliveryFee(0), 0);
  });

  test("Applies first tier for low amounts", () => {
    assert.strictEqual(rule.calculateDeliveryFee(30), 4.95);
  });

  test("Applies second tier for medium amounts", () => {
    assert.strictEqual(rule.calculateDeliveryFee(75), 2.95);
  });

  test("No fee for amounts above all tiers", () => {
    assert.strictEqual(rule.calculateDeliveryFee(100), 0);
  });
});
