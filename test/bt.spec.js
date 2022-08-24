// noinspection DuplicatedCode

require('../src/extensions');
import {
    Backtracking,
    FirstUnassignedVariableStrategy,
    MinimumRemainingValues,
    ForwardChecking,
    NoInference,
    LeastConstrainingValuesStrategy,
    UnorderedDomainValuesStrategy
} from "../src";
import {CspValidator, SudokuValidator} from "./validators";
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
    it('Should resolve minesweeper board', () => {

        /**
         * See:
         * https://www.codewars.com/kata/57ff9d3b8f7dda23130015fa
         */

        // Setup
        const model = ModelFactory.MineSweeperBoardProblem();
        // Act
        const result = Backtracking(model, FirstUnassignedVariableStrategy, UnorderedDomainValuesStrategy, NoInference);
        // Verify
        assert.equal(true, result);
        const variables = model.variables.map(v => v.value.toString());
        const solution = [
            ['1','x','1','1','x','1'],
            ['2','2','2','1','2','2'],
            ['2','x','2','0','1','x'],
            ['2','x','2','1','2','2'],
            ['1','1','1','1','x','1'],
            ['0','0','0','1','1','1'],
        ];
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 6; c++) {
                assert.equal(solution[r][c], variables.shift());
            }
        }
    });
});
