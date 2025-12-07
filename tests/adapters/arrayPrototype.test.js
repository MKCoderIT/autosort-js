import { describe, it, expect, beforeAll } from "vitest";
import { autoSort, arrayPrototype } from "../../src/index.js";

describe("Array.prototype integration (opt-in)", () => {
    beforeAll(() => {
        arrayPrototype();
    });

    it("adds autoSort() method to Array.prototype", () => {
        expect(typeof [].autoSort).toBe("function");
    });

    it("does not make prototype methods enumerable", () => {
        const keys = [];
        for (const k in []) keys.push(k);
        expect(keys).not.toContain("autoSort");

        const desc = Object.getOwnPropertyDescriptor(Array.prototype, "autoSort");
        expect(desc).toBeTruthy();
        expect(desc.enumerable).toBe(false);
    });

    it("Array.prototype.autoSort() sorts mixed types like autoSort()", () => {
        const mixed = ["kamyar", [], 22, true, {}, "ali", 77, "zahra"];

        const byFn = autoSort([...mixed]);
        const byProto = [...mixed].autoSort();

        expect(byProto).toEqual(byFn);
    });

    it("Array.prototype.autoSort({ ascending:false }) supports options", () => {
        const nums = [3, 1, 2];
        expect(nums.autoSort({ ascending: false })).toEqual([3, 2, 1]);
    });

    it("Array.prototype.autoSort() mutates the array (in-place)", () => {
        const nums = [3, 1, 2];
        const out = nums.autoSort();
        expect(out).toBe(nums);
        expect(nums).toEqual([1, 2, 3]);
    });
});
