import { describe, it, expect } from "vitest";
import { insertionSort } from "../../src/index.js";

describe("insertionSort", () => {
    it("sorts numbers ascending by default", () => {
        const input = [5, 1, 4, 2, 8];
        const out = insertionSort(input);
        expect(out).toEqual([1, 2, 4, 5, 8]);
    });

    it("sorts numbers descending when ascending=false", () => {
        const input = [5, 1, 4, 2, 8];
        const out = insertionSort(input, { ascending: false });
        expect(out).toEqual([8, 5, 4, 2, 1]);
    });

    it("handles already sorted arrays", () => {
        const input = [1, 2, 3, 4];
        expect(insertionSort(input)).toEqual([1, 2, 3, 4]);
    });

    it("handles reverse sorted arrays", () => {
        const input = [4, 3, 2, 1];
        expect(insertionSort(input)).toEqual([1, 2, 3, 4]);
    });

    it("handles duplicates", () => {
        const input = [3, 1, 2, 3, 2];
        expect(insertionSort(input)).toEqual([1, 2, 2, 3, 3]);
    });

    it("handles negative numbers", () => {
        const input = [0, -10, 5, -3];
        expect(insertionSort(input)).toEqual([-10, -3, 0, 5]);
    });

    it("handles empty and single-element arrays", () => {
        expect(insertionSort([])).toEqual([]);
        expect(insertionSort([42])).toEqual([42]);
    });

    it("mutates input array (in-place) and returns same reference", () => {
        const input = [3, 2, 1];
        const out = insertionSort(input);
        expect(out).toBe(input);
        expect(input).toEqual([1, 2, 3]);
    });

    it("uses custom comparator when provided", () => {
        const input = [{ v: 3 }, { v: 1 }, { v: 2 }];
        const out = insertionSort(input, { compare: (a, b) => a.v - b.v });
        expect(out.map(x => x.v)).toEqual([1, 2, 3]);
    });

    it("works with mixed types using built-in autoCompare (smoke test)", () => {
        const input = [42, "a", null, true, undefined, { x: 1 }, [1, 2]];
        const out = insertionSort([...input]);
        expect(Array.isArray(out)).toBe(true);
        expect(out.length).toBe(input.length);
    });

    it("throws when array is not an Array", () => {
        expect(() => insertionSort("nope")).toThrow();
        expect(() => insertionSort({})).toThrow();
        expect(() => insertionSort(null)).toThrow();
    });

    it("throws when ascending is not boolean", () => {
        expect(() => insertionSort([3, 2, 1], { ascending: "false" })).toThrow();
        expect(() => insertionSort([3, 2, 1], { ascending: 1 })).toThrow();
    });

    it("throws when compare is not a function", () => {
        expect(() => insertionSort([3, 2, 1], { compare: 123 })).toThrow();
        expect(() => insertionSort([3, 2, 1], { compare: "cmp" })).toThrow();
    });

    it("throws when compare does not return a valid number (ComparatorError)", () => {
        const badCompare = () => "nope";
        expect(() => insertionSort([3, 2, 1], { compare: badCompare })).toThrow();
    });
});
