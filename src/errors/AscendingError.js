import { AutoSortError } from "./AutoSortError.js";

export class AscendingTypeError extends AutoSortError {
    constructor(receivedType, message = null) {
        message = message ?? `Invalid Ascending Type: Must be a boolean, but received: ${receivedType}`;
        super(message);
        this.name = "AscendingTypeError";
    }
}
