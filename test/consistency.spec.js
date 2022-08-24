import {Ac3} from "../src";
import {ModelFactory} from "./models";
const assert = require("assert");

describe('Consistency suite', () => {
    it('Should apply AC3 to "Australia regions problem"', () => {
        // Setup test model
        const testModel = ModelFactory.AustraliaRegionsProblem();
        // Act
        Ac3(testModel);
        // Verify
        assert.equal(true, testModel.DomainOf('SA').pruned.length > 0);
        assert.equal(true, testModel.DomainOf('T').pruned.length === 0);
    });
    it('Should enforce consistency to a minesweeper board 1', () => {
        // Setup
        const model = ModelFactory.MineSweeperBoardProblem();
        // Act
        Ac3(model);
        // Verify
        assert.equal(2, model.DomainOf('0.0').values.length);
    });
});
