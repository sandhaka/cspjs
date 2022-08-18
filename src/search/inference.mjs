export const NoInference = (model, variableKey, domainValue) => {
    return { pruned: [], result: true };
}

/**
 * Whenever a variable X is assigned, the forward-checking process establishes arc consistency for it:
 * for each unassigned variable Y that is connected to X by a constraint, delete from Y ’s domain any value
 * that is inconsistent with the value chosen for X. Because forward checking only does arc consistency inferences,
 * there is no reason to do forward checking if we have already done arc consistency as a preprocessing step.
 * [Artificial Intelligence: A modern approach. Third edition. Pearson]
 * @param model Csp Model
 * @param variableKey
 * @param domainValue
 * @returns {{result: boolean, pruned: any[]}}
 * @constructor
 */
export const ForwardChecking = (model, variableKey, domainValue) => {
    const vKeys = model.RelationshipsOf(variableKey).values;
    const prunedSet = new Set();
    for (const vKey of vKeys) {
        if (model.GetVariable(vKey).IsAssigned())
            continue;
        const domain = model.DomainOf(vKey);
        for (const vDomainVal of domain.values) {
            if (!model.constraints.every(c => c(model, variableKey, vKey, domainValue, vDomainVal))) {
                domain.Prune(vDomainVal);
                prunedSet.add(vKey);
            }
        }
        if (domain.IsEmpty()) {
            return { pruned: [...prunedSet], result: false };
        }
    }
    return { pruned: [...prunedSet], result: true };
}
