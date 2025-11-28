import { AutoSortError } from "./AutoSortError.js";

export class ComparatorError extends AutoSortError {
    constructor(
        message = "Invalid comparator: Must be a function that returns numbers greater than zero or directly 1, 0, and -1."
    ) {
        super(message);
        this.name = "ComparatorError";
    }
}
export class ComparatorTypeError extends AutoSortError {
    constructor(message = "Invalid comparator: Must be a function.") {
        super(message);

        this.name = "ComparatorErrorType";
    }
}
