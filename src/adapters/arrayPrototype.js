import { bubbleSortPrototype } from "../algorithms/bubbleSort.js";
import { insertionSortPrototype } from "../algorithms/insertionSort.js";
import { autoSortPrototype } from "../core/autoSort.js";
import { PrototypeError, PrototypeMethodExistsError } from "../core/errors/errors.js";

/**
 * Opt-in Array.prototype integration.
 *
 * Adds non-enumerable methods to Array.prototype:
 * - autoSort
 * - bubbleSort
 * - insertionSort
 *
 * @param {Object} [options]
 * @param {boolean} [options.strict=false] If true, throws when a method already exists.
 * @param {boolean} [options.override=false] If true, overwrites existing methods.
 * @returns {void}
 */
export function arrayPrototype(options = {}) {
    const { strict = false, override = false } = options;

    if (strict && override) {
        throw new PrototypeError("arrayPrototype options are invalid: 'strict' and 'override' cannot both be true.");
    }

    const methods = {
        bubbleSort: bubbleSortPrototype,
        insertionSort: insertionSortPrototype,
        autoSort: autoSortPrototype
    };
    for (const [name, fn] of Object.entries(methods)) {
        const exists = name in Array.prototype;

        if (exists && !override) {
            if (strict) {
                throw new PrototypeMethodExistsError(name);
            }
            continue;
        }
        if (exists && override) {
            try {
                delete Array.prototype[name];
            } catch {

            }
        }
        Object.defineProperty(Array.prototype, name, {
            value: fn,
            writable: true,
            configurable: true,
            enumerable: false
        });
    }
}
