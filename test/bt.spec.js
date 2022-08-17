// noinspection DuplicatedCode

require('../src/extensions');
import {CspValidator, SudokuValidator} from "./validators";
import {Backtracking} from "../src/search/backtrack.js";
import {FirstUnassignedVariableStrategy, MinimumRemainingValues} from "../src/search/selectNextVariableStrategies.mjs";
import {ForwardChecking, NoInference} from "../src/search/inference.mjs";
import {LeastConstrainingValuesStrategy, UnorderedDomainValuesStrategy} from "../src/search/domainValuesOrderStrategies.mjs";
import {ModelFactory} from "./models";
const assert = require("assert");

describe('Backtrack search suite', () => {
    it ('Should resolve \'Australia regions problem\' 1', () => {
        // Setup test model
        const buildModel = () => ModelFactory.AustraliaRegionsProblem();
        // Act
        const m1 = buildModel();
        const bt1 = Backtracking(m1, FirstUnassignedVariableStrategy, UnorderedDomainValuesStrategy, NoInference);
        // Verify
        assert.equal(true, bt1);
        assert.equal(true, CspValidator(m1));
    });
    it('Should resolve \'Australia regions problem\' 2', () => {
        // Setup test model
        const buildModel = () => ModelFactory.AustraliaRegionsProblem();
        // Act
        const m2 = buildModel();
        const bt2 = Backtracking(m2, FirstUnassignedVariableStrategy, UnorderedDomainValuesStrategy, ForwardChecking);
        // Verify
        assert.equal(true, bt2);
        assert.equal(true, CspValidator(m2));
    });
    it('Should resolve \'Australia regions problem\' 3', () => {
        // Setup test model
        const buildModel = () => ModelFactory.AustraliaRegionsProblem();
        // Act
        const m3 = buildModel();
        const bt3 = Backtracking(m3, FirstUnassignedVariableStrategy, LeastConstrainingValuesStrategy, ForwardChecking);
        // Verify
        assert.equal(true, bt3);
        assert.equal(true, CspValidator(m3));
    });
    it('Should resolve \'Australia regions problem\' 4', () => {
        // Setup test model
        const buildModel = () => ModelFactory.AustraliaRegionsProblem();
        // Act
        const m4 = buildModel();
        const bt4 = Backtracking(m4, MinimumRemainingValues, LeastConstrainingValuesStrategy, ForwardChecking);
        // Verify
        assert.equal(true, bt4);
        assert.equal(true, CspValidator(m4));
    });
    it('Should resolve \'Sudoku problem\' 1', () => {
        // Setup test model
        const buildModel = () => ModelFactory.SudokuProblem();
        // Act
        const m1 = buildModel();
        const bt1 = Backtracking(m1, FirstUnassignedVariableStrategy, UnorderedDomainValuesStrategy, NoInference);
        // Verify
        assert.equal(true, bt1);
        assert.equal(true, SudokuValidator(m1));
        assert.equal(true, CspValidator(m1));
    });
    it('Should resolve \'Sudoku problem\' 2', () => {
        // Setup test model
        const buildModel = () => ModelFactory.SudokuProblem();
        // Act
        const m2 = buildModel();
        const bt2 = Backtracking(m2, FirstUnassignedVariableStrategy, UnorderedDomainValuesStrategy, ForwardChecking);
        // Verify
        assert.equal(true, bt2);
        assert.equal(true, SudokuValidator(m2));
        assert.equal(true, CspValidator(m2));
    });
    it('Should resolve \'Sudoku problem\' 3', () => {
        // Setup test model
        const buildModel = () => ModelFactory.SudokuProblem();
        // Act
        const m3 = buildModel();
        const bt3 = Backtracking(m3, FirstUnassignedVariableStrategy, LeastConstrainingValuesStrategy, ForwardChecking);
        // Verify
        assert.equal(true, bt3);
        assert.equal(true, SudokuValidator(m3));
        assert.equal(true, CspValidator(m3));
    });
    it('Should resolve \'Sudoku problem\' 4', () => {
        // Setup test model
        const buildModel = () => ModelFactory.SudokuProblem();
        // Act
        const m4 = buildModel();
        const bt4 = Backtracking(m4, MinimumRemainingValues, LeastConstrainingValuesStrategy, ForwardChecking);
        // Verify
        assert.equal(true, bt4);
        assert.equal(true, SudokuValidator(m4));
        assert.equal(true, CspValidator(m4));
    });
});
