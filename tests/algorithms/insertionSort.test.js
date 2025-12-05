import { describe, it, expect } from "vitest";
import { insertionSort } from "../../src/index.js";

describe("insertionSort", () => {
    it("sorts numbers ascending", () => {
        const input = [5, 1, 4, 2, 8];
        const out = insertionSort(input);
        expect(out).toEqual([1, 2, 4, 5, 8]);
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

    it("returns a new array (does not mutate input)", () => {
        const input = [3, 2, 1];
        const copy = [...input];
        const out = insertionSort([...input]);

        expect(input).toEqual(copy);
        expect(out).not.toBe(input);
        expect(out).toEqual([1, 2, 3]);
    });

    it("handles empty and single-element arrays", () => {
        expect(insertionSort([])).toEqual([]);
        expect(insertionSort([42])).toEqual([42]);
    });
});
