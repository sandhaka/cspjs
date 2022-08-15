import {Ac3} from "../consistency/ac-3.mjs";
import {ModelFactory} from "./models";
const assert = require("assert");

describe('Consistency suite', () => {
    it('Should apply AC3 to \'Australia regions problem\'', () => {
        // Setup test model
        const testModel = ModelFactory.AustraliaRegionsProblem();

        // Act
        Ac3(testModel);

        // Verify
        assert.equal(true, testModel.DomainOf('SA').values.length === 1);
        // TODO: to be continued
    });
});
