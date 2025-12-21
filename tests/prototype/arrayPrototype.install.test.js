import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { arrayPrototype } from "../../src/index.js";

describe("installArrayPrototype()", () => {
    beforeEach(() => {
        try {
            arrayPrototype.uninstallArrayPrototype();
        } catch {}
    });

    afterEach(() => {
        try {
            arrayPrototype.uninstallArrayPrototype();
        } catch {}
    });

    it("installs all methods as functions and non-enumerable", () => {
        arrayPrototype.installArrayPrototype();

        for (const name of arrayPrototype.ARRAY_PROTOTYPE_METHOD_KEYS) {
            expect(typeof [][name]).toBe("function");
            const desc = Object.getOwnPropertyDescriptor(Array.prototype, name);
            expect(desc).toBeTruthy();
            expect(desc.enumerable).toBe(false);
            expect(desc.configurable).toBe(true);
            expect(desc.writable).toBe(true);
        }

        const forInKeys = [];
        for (const k in []) forInKeys.push(k);
        for (const name of arrayPrototype.ARRAY_PROTOTYPE_METHOD_KEYS) expect(forInKeys).not.toContain(name);
        for (const name of arrayPrototype.ARRAY_PROTOTYPE_METHOD_KEYS) expect(Object.keys([])).not.toContain(name);
    });

    it("is idempotent by default (calling twice does not throw)", () => {
        arrayPrototype.installArrayPrototype();
        expect(() => arrayPrototype.installArrayPrototype()).not.toThrow();
    });

    it("strict:true throws if methods already exist", () => {
        arrayPrototype.installArrayPrototype();
        expect(() => arrayPrototype.installArrayPrototype({ strict: true })).toThrow();
    });

    it("override:true overwrites existing methods without throwing", () => {
        arrayPrototype.installArrayPrototype();
        expect(() => arrayPrototype.installArrayPrototype({ override: true })).not.toThrow();

        for (const name of arrayPrototype.ARRAY_PROTOTYPE_METHOD_KEYS) {
            const desc = Object.getOwnPropertyDescriptor(Array.prototype, name);
            expect(desc).toBeTruthy();
            expect(desc.enumerable).toBe(false);
        }
    });

    it("strict:true + override:true throws", () => {
        expect(() => arrayPrototype.installArrayPrototype({ strict: true, override: true })).toThrow();
    });

    it("override can install even if methods pre-exist (custom dummy)", () => {
        Object.defineProperty(Array.prototype, "autoSort", {
            value: () => "dummy",
            writable: true,
            configurable: true,
            enumerable: false
        });

        expect(() => arrayPrototype.installArrayPrototype({ override: true })).not.toThrow();
        expect([].autoSort()).not.toBe("dummy");
    });

    it("non-override skips pre-existing methods (keeps dummy)", () => {
        Object.defineProperty(Array.prototype, "autoSort", {
            value: () => "dummy",
            writable: true,
            configurable: true,
            enumerable: false
        });

        expect(() => arrayPrototype.installArrayPrototype()).not.toThrow();
        expect([].autoSort()).toBe("dummy");
    });
});
