import { PrototypeError } from "../errors/index.js";
import { ARRAY_PROTOTYPE_METHOD_KEYS } from "./methods.js";

export function uninstallArrayPrototype(options = {}) {
    const { strict = false } = options;

    for (const name of ARRAY_PROTOTYPE_METHOD_KEYS) {
        const desc = Object.getOwnPropertyDescriptor(Array.prototype, name);

        if (!desc) continue;

        if (desc.configurable === false) {
            if (strict) {
                throw new PrototypeError(`Cannot uninstall Array.prototype.${name} because it is not configurable.`);
            }
            continue;
        }

        try {
            delete Array.prototype[name];
        } catch {
            if (strict) throw new PrototypeError(`Failed to uninstall Array.prototype.${name}.`);
        }
    }
}
