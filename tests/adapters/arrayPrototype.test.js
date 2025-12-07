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
        expect([...mixed].autoSort()).toEqual(autoSort([...mixed]));
    });

    it("Array.prototype.autoSort({ ascending:false }) supports options", () => {
        const nums = [3, 1, 2];
        expect(nums.autoSort({ ascending: false })).toEqual([3, 2, 1]);
    });

    it("arrayPrototype() is idempotent by default (calling twice does not throw)", () => {
        expect(() => arrayPrototype()).not.toThrow();
    });

    it("arrayPrototype({ strict:true }) throws if methods already exist", () => {
        expect(() => arrayPrototype({ strict: true })).toThrow();
    });

    it("arrayPrototype({ override:true }) does not throw if methods already exist", () => {
        expect(() => arrayPrototype({ override: true })).not.toThrow();
        const desc = Object.getOwnPropertyDescriptor(Array.prototype, "autoSort");
        expect(desc).toBeTruthy();
        expect(desc.enumerable).toBe(false);
    });

    it("throws when strict and override are both true", () => {
        expect(() => arrayPrototype({ strict: true, override: true })).toThrow();
    });
});
