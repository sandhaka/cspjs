export const FirstUnassignedVariableStrategy = {
    get(model) {
        return model.variables.find(v => !v.IsAssigned());
    }
}

export const MinimumRemainingValues = {
    /**
     * Choosing the variable with the fewest “legal” values
     * @param model Csp model
     * @returns {Variable}
     */
    get(model) {
        const randomInt = (min, max) => { // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const unassignedVariables = model.GetUnassignedVariables();
        const vars = unassignedVariables.map(v => {
            const domain = model.DomainOf(v.key);
            const legalValues = domain.pruned.length > 0
                ? domain.values.length // Consistency just applied
                : domain.values.filter(dv => model.Conflicts(v.key, dv) === 0).length;
            return {
                Key: v.key,
                LegalValuesCount: legalValues
            };
        }).groupBy('LegalValuesCount').sortAscending(a => a.key)[0].values;
        const key = vars.length > 1 ? vars[randomInt(0, vars.length - 1)].Key : vars[0].Key;
        return model.GetVariable(key);
    }
}
