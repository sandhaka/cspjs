/**
 * It repeatedly chooses an unassigned variable, and then tries all values in the domain of that variable in turn,
 * trying to find a solution. If an inconsistency is detected, then BACKTRACK returns failure,
 * causing the previous call to try another value.
 * @param model Csp model
 * @param nextVar Variable selection strategy
 * @param domainValuesSort Domain values sort strategy
 * @param inference Inference function
 * @returns {boolean}
 * @constructor
 */
export const Backtracking = (model, nextVar, domainValuesSort, inference) => {
    if (model.IsResolved())
        return true;
    const variable = nextVar.get(model);
    for (const value of domainValuesSort.get(model, variable.key)) {
        if (model.Conflicts(variable.key, value) === 0) {
            model.Assign(variable.key, value);
            model.DomainOf(variable.key).RemoveByGuess(value);
            const infResult = inference(model, variable.key, value);
            if (infResult.result) {
                if (Backtracking(model, nextVar, domainValuesSort, inference))
                    return true;
            }
            infResult.pruned.forEach(p => { model.DomainOf(p).RestorePruned(); });
            model.DomainOf(variable.key).RestoreGuess();
        }
    }
    model.RemoveAssignment(variable.key);
    return false;
}
