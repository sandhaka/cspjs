import {Model} from "../csp-model/model.mjs";
const assert = require("assert");

describe('Csp model suite', () => {
    it('Should create a model', () => {
        const model = new Model(
            [{key: "123", value: "foo"}],
            [{key: "123", values: ["foo", "bar"]}],
            [],
            []);
        assert.equal(model.GetVariable("123")?.value, "foo");
        assert.equal(model.DomainOf("123").values.length, 2);
    });
});
