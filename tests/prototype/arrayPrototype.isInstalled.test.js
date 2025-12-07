import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { arrayPrototype } from "../../src/index.js";

describe("isArrayPrototypeInstalled()", () => {
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

    it("returns false when not installed", () => {
        expect(arrayPrototype.isArrayPrototypeInstalled()).toBe(false);
    });

    it("returns true after install", () => {
        arrayPrototype.installArrayPrototype();
        expect(arrayPrototype.isArrayPrototypeInstalled()).toBe(true);
    });

    it("strict:true validates descriptor shape (writable/configurable/enumerable)", () => {
        arrayPrototype.installArrayPrototype();
        expect(arrayPrototype.isArrayPrototypeInstalled({ strict: true })).toBe(true);

        Object.defineProperty(Array.prototype, "autoSort", {
            value: Array.prototype.autoSort,
            writable: true,
            configurable: true,
            enumerable: true // break it
        });

        expect(arrayPrototype.isArrayPrototypeInstalled({ strict: true })).toBe(false);
    });

    it("matchImplementation:true detects if replaced by a different function", () => {
        arrayPrototype.installArrayPrototype();
        expect(arrayPrototype.isArrayPrototypeInstalled({ matchImplementation: true })).toBe(true);

        Object.defineProperty(Array.prototype, "autoSort", {
            value: () => "different",
            writable: true,
            configurable: true,
            enumerable: false
        });

        expect(arrayPrototype.isArrayPrototypeInstalled({ matchImplementation: true })).toBe(false);
    });
});
