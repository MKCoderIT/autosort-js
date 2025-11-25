import {AutoSortError} from "./AutoSortError.js";

export class ComparatorError extends AutoSortError {
    constructor(message = "Invalid comparator: Must be a function that returns the numbers 1,0,-1.") {
        super(message);
        this.name = "ComparatorError";
    }
}
