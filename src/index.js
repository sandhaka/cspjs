import {Model} from "./csp-model/model.mjs";
import {Variable} from "./csp-model/variable.mjs";
import {Domain} from "./csp-model/domain.mjs";
import {Relationship} from "./csp-model/relationship.mjs";
import {Backtracking} from "./search/backtrack";
import {FirstUnassignedVariableStrategy, MinimumRemainingValues} from "./search/selectNextVariableStrategies.mjs";
import {ForwardChecking, NoInference} from "./search/inference.mjs";
import {LeastConstrainingValuesStrategy, UnorderedDomainValuesStrategy} from "./search/domainValuesOrderStrategies.mjs";
require('./extensions');
export {
    Model, Variable, Domain, Relationship, Backtracking,
    FirstUnassignedVariableStrategy, MinimumRemainingValues,
    ForwardChecking, NoInference,
    LeastConstrainingValuesStrategy, UnorderedDomainValuesStrategy
}