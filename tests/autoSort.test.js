import { describe, it, expect } from "vitest";
import { autoSort } from "../src/index.js";

describe("autoSort", () => {
    it("sorts numbers ascending by default", () => {
        const input = [5, 1, 4, 2, 8];
        const out = autoSort(input);
        expect(out).toEqual([1, 2, 4, 5, 8]);
    });

    it("sorts numbers descending when ascending=false", () => {
        const input = [5, 1, 4, 2, 8];
        const out = autoSort(input, { ascending: false });
        expect(out).toEqual([8, 5, 4, 2, 1]);
    });

    it("handles already sorted arrays", () => {
        const input = [1, 2, 3, 4];
        expect(autoSort(input)).toEqual([1, 2, 3, 4]);
    });

    it("handles reverse sorted arrays", () => {
        const input = [4, 3, 2, 1];
        expect(autoSort(input)).toEqual([1, 2, 3, 4]);
    });

    it("handles duplicates", () => {
        const input = [3, 1, 2, 3, 2];
        expect(autoSort(input)).toEqual([1, 2, 2, 3, 3]);
    });

    it("handles negative numbers", () => {
        const input = [0, -10, 5, -3];
        expect(autoSort(input)).toEqual([-10, -3, 0, 5]);
    });

    it("mutates input array (in-place) and returns same reference", () => {
        const input = [3, 2, 1];
        const out = autoSort(input);

        expect(out).toBe(input);
        expect(input).toEqual([1, 2, 3]);
    });

    it("uses custom comparator when provided", () => {
        const input = [{ v: 3 }, { v: 1 }, { v: 2 }];
        const out = autoSort(input, { compare: (a, b) => a.v - b.v });
        expect(out.map(x => x.v)).toEqual([1, 2, 3]);
    });

    it("works with mixed types (smoke test)", () => {
        const input = [42, "a", null, true, undefined, { x: 1 }, [1, 2]];
        const out = autoSort([...input]);
        expect(Array.isArray(out)).toBe(true);
        expect(out.length).toBe(input.length);
    });

    it("handles empty and single-element arrays", () => {
        expect(autoSort([])).toEqual([]);
        expect(autoSort([42])).toEqual([42]);
    });

    it("throws when array is not an Array", () => {
        expect(() => autoSort("nope")).toThrow();
        expect(() => autoSort({})).toThrow();
        expect(() => autoSort(null)).toThrow();
    });

    it("throws when ascending is not boolean", () => {
        expect(() => autoSort([3, 2, 1], { ascending: "false" })).toThrow();
        expect(() => autoSort([3, 2, 1], { ascending: 1 })).toThrow();
    });

    it("throws when compare is not a function", () => {
        expect(() => autoSort([3, 2, 1], { compare: 123 })).toThrow();
    });
});
