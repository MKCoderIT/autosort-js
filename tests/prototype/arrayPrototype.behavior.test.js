import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { arrayPrototype , autoSort} from "../../src/index.js";

describe("Array.prototype behavior", () => {
  beforeEach(() => {
    try { arrayPrototype.uninstallArrayPrototype(); } catch {}
    arrayPrototype.installArrayPrototype();
  });

  afterEach(() => {
    try { arrayPrototype.uninstallArrayPrototype(); } catch {}
  });

  it("Array.prototype.autoSort() matches library autoSort() (mixed types)", () => {
    const mixed = ["kamyar", [], 22, true, {}, "ali", 77, "zahra"];
    expect([...mixed].autoSort()).toEqual(autoSort([...mixed]));
  });

  it("Array.prototype.autoSort({ ascending:false }) supports options", () => {
    const nums = [3, 1, 2];
    expect(nums.autoSort({ ascending: false })).toEqual([3, 2, 1]);
  });

  it("bubbleSort and insertionSort are callable and sort numbers", () => {
    expect([3, 1, 2].bubbleSort()).toEqual([1, 2, 3]);
    expect([3, 1, 2].insertionSort()).toEqual([1, 2, 3]);
  });
});
