import {Variable} from "./variable.mjs";
import {Domain} from "./domain.mjs";

export class Model {
    /**
     * Csp Model
     * @param variables Set of variables, {X1,...,Xn}.
     * @param domains Set of domains, {D1, . . . , Dn}, one for each variable
     * @param relationships Set of variable relationships
     * @param constraints Set of constraints that specify allowable combinations of values:
     * Constraint is a function like: fn(model: Model, vKey1: string, vKey2: string, vDomainValue1: T, vDomainValue2: T)
     */
    constructor(variables, domains, relationships, constraints) {
        this.variables = variables;
        this.domains = domains;
        this.relationships = relationships;
        this.constraints = constraints;
    }

    /**
     * Get variable by key
     * @param key The variable unique key
     * @returns {Variable} Variable or undefined
     * @constructor
     */
    GetVariable(key) {
        return this.variables.find(v => v.key === key);
    }

    /**
     * Unassigned variables
     * @returns {*} Variables
     * @constructor
     */
    GetUnassignedVariables() {
        return this.variables.filter(v => !v.IsAssigned());
    }

    /**
     * Get domain of a specific variable
     * @param key Variable key
     * @returns {Domain} Domain of the variable
     * @constructor
     */
    DomainOf(key) {
        return this.domains.find(d => d.key === key);
    }

    /**
     * Get relationships of variable
     * @param key Variable key
     * @returns {Relationship} Relationships
     * @constructor
     */
    RelationshipsOf(key) {
        return this.relationships.find(r => r.key === key);
    }

    /**
     * Assign a value to a variable
     * @param key Variable key
     * @param value Value
     * @constructor
     */
    Assign(key, value) {
        const variable = this.GetVariable(key);
        variable.value = value;
    }

    /**
     * Remove assignment
     * @param key Variable key
     * @constructor
     */
    RemoveAssignment(key) {
        this.GetVariable(key).value = undefined;
    }

    /**
     * All variables are assigned check
     * @returns {boolean}
     * @constructor
     */
    IsResolved() {
        return this.variables.every(v => v.IsAssigned());
    }

    /**
     * Enumerate conflicts for a variable given a domain value
     * @param variableKey Variable key
     * @param domainValue Domain variable value
     * @returns {number} Number of conflicts
     * @constructor
     */
    Conflicts(variableKey, domainValue) {
        let c = 0;
        const relationships = this.RelationshipsOf(variableKey);
        for (let j = 0; j < relationships.values.length; j++) {
            const variable = this.GetVariable(relationships.values[j]);
            if (!variable.IsAssigned())
                continue;
            c += this.constraints.every(c =>
                c(this, variableKey, relationships.values[j], variable.value, domainValue)) ? 0 : 1;
        }
        return c;
    }
}
