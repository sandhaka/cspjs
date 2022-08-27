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

        const print = (map) => {
            let row = '';
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[i].length; j++) {
                    row += (j === 0 ? '' + map[i][j] : ' ' + map[i][j]);
                    if (i === map.length - 1 && j === map[i].length -1)
                        return row;
                }
                row += '\n';
            }
            return row;
        };

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
        if (!result) {
            return '?';
        }
        const resolvedValues = model.variables.map(v => v.value.toString());
        const finalMap = Array(15);
        for (let r = 0; r < 15; r++) {
            finalMap[r] = Array(30);
            for (let c = 0; c < 30; c++) {
                finalMap[r][c] = resolvedValues.shift();
            }
        }

        console.log("Solution found: \n");
        console.log(print(finalMap));
    });
});
