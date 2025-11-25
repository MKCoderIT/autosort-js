export class AutoSortError extends Error {
    constructor(message) {
        super(message);
        this.name = "AutoSortError";
    }
}
