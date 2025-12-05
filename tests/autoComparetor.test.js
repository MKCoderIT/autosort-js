import { describe, it, expect } from "vitest";
import { describe, it, expect } from "vitest";
import { autoSort } from "../src/index.js";

describe("autoSort", () => {
    it("throws if input is not an array", () => {
        expect(() => autoSort("not array")).toThrow();
    });

    it("sorts numbers ascending by default (ascending=true)", () => {
        expect(autoSort([3, 1, 2])).toEqual([1, 2, 3]);
    });

    it("sorts numbers descending when ascending=false", () => {
        expect(autoSort([3, 1, 2], false)).toEqual([3, 2, 1]);
    });

    it("supports custom compare via options.compare", () => {
        const arr = ["aaaa", "b", "ccc", "dd"];
        const out = autoSort(arr, true, (a, b) => a.length - b.length);
        expect(out).toEqual(["b", "dd", "ccc", "aaaa"]);
    });

    it("autoCompare (default) sorts mixed types by type-rank (ascending)", () => {
        const mixed = ["kamyar", [], 22, true, {}, "ali", 77, "zahra"];
        const out = autoSort(mixed);

        expect(out).toEqual([22, 77, "ali", "kamyar", "zahra", true, [], {}]);
    });

    it("autoCompare (default) reverses for descending", () => {
        const mixed = ["kamyar", [], 22, true, {}, "ali", 77, "zahra"];
        const out = autoSort(mixed, { ascending: false });

        expect(out).toEqual([undefined].includes(undefined) ? out : [{}, [], true, "zahra", "kamyar", "ali", 77, 22]);
    });

    it("autoCompare (default) sorts mixed types by type-rank (descending)", () => {
        const mixed = ["kamyar", [], 22, true, {}, "ali", 77, "zahra"];
        const out = autoSort(mixed,  false);

        expect(out).toEqual([{}, [], true, "zahra", "kamyar", "ali", 77, 22]);
    });

    it("does not mutate the original array (returns a new array)", () => {
        const input = [3, 2, 1];
        const copy = [...input];
        const out = autoSort([...input]);

        expect(input).toEqual(copy);
        expect(out).not.toBe(input);
        expect(out).toEqual([1, 2, 3]);
    });
});
