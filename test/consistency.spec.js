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
});
