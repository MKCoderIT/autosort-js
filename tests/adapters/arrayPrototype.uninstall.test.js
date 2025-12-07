// tests/prototype/
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { arrayPrototype } from "../../src/index.js";

describe("uninstallArrayPrototype()", () => {
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

    it("removes installed methods", () => {
        arrayPrototype.installArrayPrototype();
        arrayPrototype.uninstallArrayPrototype();

        for (const name of arrayPrototype.ARRAY_PROTOTYPE_METHODS) {
            expect(Object.getOwnPropertyDescriptor(Array.prototype, name)).toBeUndefined();
            expect([][name]).toBeUndefined();
        }
    });

    it("is safe to call when nothing is installed", () => {
        expect(() => arrayPrototype.uninstallArrayPrototype()).not.toThrow();
    });

    it("strict:true throws if a method exists but is not configurable", () => {
        Object.defineProperty(Array.prototype, "autoSort", {
            value: () => "locked",
            writable: true,
            configurable: false,
            enumerable: false
        });

        expect(() => arrayPrototype.uninstallArrayPrototype({ strict: true })).toThrow();
    });
});
