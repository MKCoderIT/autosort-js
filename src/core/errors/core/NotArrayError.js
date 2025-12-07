import { AutoSortError } from "./AutoSortError.js";

export class NotArrayError extends AutoSortError {
    constructor(receivedType, message = null) {
        message = message ?? `Expected an array, but received: ${receivedType}`;
        super(message);
        this.name = "NotArrayError";
    }
}
