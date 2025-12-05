import { describe, it, expect } from "vitest";
import { autoSort } from "../src/index.js";

describe("Custom Comparator", () => {
    it("sorts numbers ascending", () => {
        const input = [5, 1, 4, 2, 8];
        const out = autoSort(input, (a, b) => a - b);
        expect(out).toEqual([1, 2, 4, 5, 8]);
    });
    it("sorts numbers descending", () => {
        const input = [5, 1, 4, 2, 8];
        const out = autoSort(input, (a, b) => b - a);
        expect(out).toEqual([1, 2, 4, 5, 8]);
    });
    it("handles duplicates", () => {
        const input = [3, 1, 2, 3, 2];
        expect(autoSort(input, (a, b) => a - b)).toEqual([1, 2, 2, 3, 3]);
    });

    it("handles negative numbers", () => {
        const input = [0, -10, 5, -3];
        expect(autoSort(input, (a, b) => a - b)).toEqual([-10, -3, 0, 5]);
    });

    it("returns a new array (does not mutate input)", () => {
        const input = [3, 2, 1];
        const copy = [...input];
        const out = autoSort([...input], (a, b) => a - b);

        expect(input).toEqual(copy);
        expect(out).not.toBe(input);
        expect(out).toEqual([1, 2, 3]);
    });

    it("handles empty and single-element arrays", () => {
        expect(autoSort([]), (a, b) => a - b).toEqual([]);
        expect(autoSort([42], (a, b) => a - b)).toEqual([42]);
    });
});
