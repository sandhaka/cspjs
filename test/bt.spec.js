import {Backtracking} from "../search/backtrack.js";
import {FirstUnassignedVariableStrategy, MinimumRemainingValues} from "../search/selectNextVariableStrategies.mjs";
import {ForwardChecking, NoInference} from "../search/inference.mjs";
import {
    LeastConstrainingValuesStrategy,
    UnorderedDomainValuesStrategy
} from "../search/domainValuesOrderStrategies.mjs";
import {ModelFactory} from "./models";
const assert = require("assert");

describe('Backtrack search suite', () => {
    it ('Should resolve \'Australia regions problem\'', () => {
        // Setup test model
        const buildModel = () => {
            return ModelFactory.AustraliaRegionsProblem();
        };

        // Act
        const bt1 = Backtracking(buildModel(), FirstUnassignedVariableStrategy, UnorderedDomainValuesStrategy, NoInference);
        const bt2 = Backtracking(buildModel(), FirstUnassignedVariableStrategy, UnorderedDomainValuesStrategy, ForwardChecking);
        const bt3 = Backtracking(buildModel(), FirstUnassignedVariableStrategy, LeastConstrainingValuesStrategy, ForwardChecking);
        const bt4 = Backtracking(buildModel(), MinimumRemainingValues, LeastConstrainingValuesStrategy, ForwardChecking);

        // Verify
        assert.equal(true, bt1);
        assert.equal(true, bt2);
        assert.equal(true, bt3);
        assert.equal(true, bt4);
    });
    it('Should resolve \'Sudoku problem\'', () => {
        // Setup test model
        const buildModel = () => {
            return ModelFactory.SudokuProblem();
        };

        console.log(buildModel());
    });
});
