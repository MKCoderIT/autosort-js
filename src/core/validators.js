import * as Errors from "../errors/index.js";

export class Validators {
    static fail(message) {
        throw new Errors.AutoSortError(message);
    }

    static assertArray(value) {
        if (value === null) throw new Errors.NotArrayError("null");
        if (Array.isArray(value)) return true;
        throw new Errors.NotArrayError(typeof value);
    }

    static assertAscending(ascending) {
        if (typeof ascending === "boolean") return true;
        throw new Errors.AscendingTypeError(typeof ascending);
    }

    static assertCompare(array, compare) {
        if (typeof compare !== "function") throw new Errors.ComparatorTypeError();
        if (!array || array.length < 2) return true;

        try {
            const r = compare(array[0], array[1]);
            if (typeof r !== "number" || Number.isNaN(r)) throw new Errors.ComparatorError();
            return true;
        } catch {
            throw new Errors.ComparatorError();
        }
    }
}
