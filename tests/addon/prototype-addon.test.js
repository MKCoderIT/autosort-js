import { describe, it, expect, beforeAll } from "vitest";
import { autoSort } from "../../src/index.js";
import { arrayPrototype } from "../../src/index.js";

describe("Array.prototype integration (opt-in)", () => {
    it("does not make prototype methods enumerable", () => {
        const keys = [];
        for (const k in []) keys.push(k);

        expect(keys).not.toContain("autoSort");
    });
    it("adds autoSort() method to Array.prototype", () => {
        arrayPrototype();
        expect(typeof [].autoSort).toBe("function");
    });

    it("Array.prototype.autoSort() sorts mixed types like autoSort()", () => {
        arrayPrototype();
        const mixed = ["kamyar", [], 22, true, {}, "ali", 77, "zahra"];

        const byFn = autoSort([...mixed]);
        const byProto = [...mixed].autoSort();

        expect(byProto).toEqual(byFn);
    });

    it("Array.prototype.autoSort({ ascending:false }) supports options", () => {
        arrayPrototype();
        const nums = [3, 1, 2];
        expect(nums.autoSort(false)).toEqual([3, 2, 1]);
    });
});
