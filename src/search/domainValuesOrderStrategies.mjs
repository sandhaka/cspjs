export const UnorderedDomainValuesStrategy = {
    get(model, variableKey) {
        return model.DomainOf(variableKey).values;
    }
}

export const LeastConstrainingValuesStrategy = {
    /**
     * Order domain values by number of conflicts
     * @param model Csp model
     * @param key Variable key
     * @returns {*}
     */
    get(model, key) {
        const domain = model.DomainOf(key);
        return domain.values
            .map(v => ({ v: v, c: model.Conflicts(key, v) }))
            .sortDescending(e => e.c)
            .map(o => o.v);
    }
}
