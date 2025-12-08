import { bubbleSortPrototype } from "../algorithms/bubbleSort.js";
import { insertionSortPrototype } from "../algorithms/insertionSort.js";
import { autoSortPrototype } from "../core/autoSort.js";
import { PrototypeError, PrototypeMethodExistsError } from "../errors/index.js";

const METHODS = {
    bubbleSort: bubbleSortPrototype,
    insertionSort: insertionSortPrototype,
    autoSort: autoSortPrototype
};

export function installArrayPrototype(options = {}) {
    const { strict = false, override = false } = options;

    if (strict && override) {
        throw new PrototypeError(
            "installArrayPrototype options are invalid: 'strict' and 'override' cannot both be true."
        );
    }

    for (const [name, fn] of Object.entries(METHODS)) {
        const desc = Object.getOwnPropertyDescriptor(Array.prototype, name);
        const exists = !!desc || name in Array.prototype;

        if (exists && !override) {
            if (strict) throw new PrototypeMethodExistsError(name);
            continue;
        }

        if (exists && override && desc && desc.configurable === false) {
            throw new PrototypeError(`Cannot override Array.prototype.${name} because it is not configurable.`);
        }

        if (exists && override) {
            try {
                delete Array.prototype[name];
            } catch {}
        }

        Object.defineProperty(Array.prototype, name, {
            value: fn,
            writable: true,
            configurable: true,
            enumerable: false
        });
    }
}

export const ARRAY_PROTOTYPE_METHODS = Object.freeze(Object.keys(METHODS));
