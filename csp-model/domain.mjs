export class Domain {
    constructor(key, values, pruned, removedByGuess) {
        this.key = key;
        this.values = values;
        this.pruned = pruned;
        this.removedByGuess = removedByGuess;
    }

    IsEmpty() {
        return this.values.length === 0;
    }

    Prune(value) {
        const index = this.values.indexOf(value);
        this.pruned.push(this.values[index]);
        this.values = this.values.filter(v => v !== value);
    }

    RemoveByGuess(domainValue) {
        this.removedByGuess.push(...this.values.filter(v => v !== domainValue));
        this.values = this.values.filter(v => v === domainValue);
    }

    RestorePruned() {
        this.values.push(...this.pruned);
        this.pruned = [];
    }

    RestoreGuess() {
        this.values.push(... this.removedByGuess);
        this.removedByGuess = [];
    }
}
