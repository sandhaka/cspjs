export class Variable {
    constructor(key, value) {
        this.value = value;
        this.key = key;
    }

    IsAssigned() {
        return this.value !== undefined;
    }
}
