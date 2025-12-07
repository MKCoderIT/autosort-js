import { AutoSortError } from "./AutoSortError.js";

export class ComparatorError extends AutoSortError {
    constructor(
        message = "Invalid comparator: Must be a function that returns numbers."
    ) {
        super(message);
        this.name = "ComparatorError";
    }
}
export class ComparatorTypeError extends AutoSortError {
    constructor(message = "Invalid comparator Type: Must be a function.") {
        super(message);
        this.name = "ComparatorTypeError";
    }
}
