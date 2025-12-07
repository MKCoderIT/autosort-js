import { AutoSortError } from "./AutoSortError.js";

export class PrototypeError extends AutoSortError {
    constructor(message = "Prototype error.") {
        super(message);
        this.name = "PrototypeError";
    }
}
