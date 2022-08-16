// noinspection DuplicatedCode

require('../extensions');
import {Backtracking} from "../search/backtrack.js";
import {FirstUnassignedVariableStrategy, MinimumRemainingValues} from "../search/selectNextVariableStrategies.mjs";
import {ForwardChecking, NoInference} from "../search/inference.mjs";
import {LeastConstrainingValuesStrategy, UnorderedDomainValuesStrategy} from "../search/domainValuesOrderStrategies.mjs";
import {ModelFactory} from "./models";
const assert = require("assert");

describe('Backtrack search suite', () => {
    it ('Should resolve \'Australia regions problem\'', () => {
        // Setup test model
        const buildModel = () => {
            return ModelFactory.AustraliaRegionsProblem();
        };

        // Act
        const m1 = buildModel();
        const m2 = buildModel();
        const m3 = buildModel();
        const m4 = buildModel();

        const bt1 = Backtracking(m1, FirstUnassignedVariableStrategy, UnorderedDomainValuesStrategy, NoInference);
        const bt2 = Backtracking(m2, FirstUnassignedVariableStrategy, UnorderedDomainValuesStrategy, ForwardChecking);
        const bt3 = Backtracking(m3, FirstUnassignedVariableStrategy, LeastConstrainingValuesStrategy, ForwardChecking);
        const bt4 = Backtracking(m4, MinimumRemainingValues, LeastConstrainingValuesStrategy, ForwardChecking);

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
        // Sudoku validator
        const modelToMap = (model) => {
            const map = [];
            const q = Array.from(model.variables);
            for (let i = 0; i < 9; i++) {
                map.push(Array(9));
                for (let j = 0; j < 9; j++) {
                    map[i][j] = q.shift().value;
                }
            }
            return map;
        }
        const seqValidator = (seq) => {
            if (new Set(seq).size !== 9)
                return false;
            return seq.reduce((a, b) => a + b) === 45;
        };
        const validator = (map) => {
            let squares = [[],[],[]];
            for (let r = 0; r < map.length; r++) {
                if (r === 3 || r === 6) {
                    for (let s = 0; s < squares.length; s++) {
                        if (!seqValidator(squares[s]))
                            return false;
                    }
                    squares = [[],[],[]];
                }
                if (!seqValidator(map[r]))
                    return false;
                squares[0] = squares[0].concat(map[r].slice(0, 3));
                squares[1] = squares[1].concat(map[r].slice(3, 6));
                squares[2] = squares[2].concat(map[r].slice(6, 9));
                const columnSeq = [];
                for (let c = 0; c < map[r].length; c++) {
                    columnSeq.push(map[c][r]);
                }
                if (!seqValidator(columnSeq))
                    return false;
            }
            return true
        };

        // Act
        const m1 = buildModel();
        const m2 = buildModel();
        const m3 = buildModel();
        const m4 = buildModel();

        const bt1 = Backtracking(m1, FirstUnassignedVariableStrategy, UnorderedDomainValuesStrategy, NoInference);
        const bt2 = Backtracking(m2, FirstUnassignedVariableStrategy, UnorderedDomainValuesStrategy, ForwardChecking);
        const bt3 = Backtracking(m3, FirstUnassignedVariableStrategy, LeastConstrainingValuesStrategy, ForwardChecking);
        const bt4 = Backtracking(m4, MinimumRemainingValues, LeastConstrainingValuesStrategy, ForwardChecking);

        // Verify
        assert.equal(true, bt1);
        assert.equal(true, bt2);
        assert.equal(true, bt3);
        assert.equal(true, bt4);
        assert.equal(true, validator(modelToMap(m1)));
        assert.equal(true, validator(modelToMap(m2)));
        assert.equal(true, validator(modelToMap(m3)));
        assert.equal(true, validator(modelToMap(m4)));
    });
});
