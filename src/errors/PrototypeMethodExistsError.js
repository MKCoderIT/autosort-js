import { PrototypeError } from "./PrototypeError.js";

export class PrototypeMethodExistsError extends PrototypeError {
    constructor(methodName) {
        super(`Array.prototype.${methodName} already exists.`);
        this.name = "PrototypeMethodExistsError";
    }
}
