import { ARRAY_PROTOTYPE_METHODS } from "./methods.js";

export function isArrayPrototypeInstalled(options = {}) {
    const { strict = false, matchImplementation = false } = options;

    for (const [name, expectedFn] of Object.entries(ARRAY_PROTOTYPE_METHODS)) {
        const desc = Object.getOwnPropertyDescriptor(Array.prototype, name);
        if (!desc) return false;

        if (typeof desc.value !== "function") return false;
        if (desc.enumerable !== false) return false;

        if (strict) {
            if (desc.configurable !== true) return false;
            if (desc.writable !== true) return false;
        }

        if (matchImplementation) {
            if (desc.value !== expectedFn) return false;
        }
    }

    return true;
}
