import {Model} from "../csp-model/model.mjs";
import {Variable} from "../csp-model/variable.mjs";
import {Domain} from "../csp-model/domain.mjs";
import {Relationship} from "../csp-model/relationship.mjs";

export class ModelFactory {
    static AustraliaRegionsProblem() {
        return new Model([
            new Variable( 'SA', 'R' ),
            new Variable( 'WA', undefined ),
            new Variable( 'NT', undefined ),
            new Variable( 'Q', undefined ),
            new Variable( 'NSW', undefined ),
            new Variable( 'V', undefined ),
            new Variable( 'T', undefined ),
        ], [
            new Domain('SA',  [ 'R' ], ['G', 'B'], [] ),
            new Domain('WA',  [ 'R', 'G', 'B' ], [], [] ),
            new Domain('NT',  [ 'R', 'G', 'B' ], [], [] ),
            new Domain('Q',  [ 'R', 'G', 'B' ], [], [] ),
            new Domain('NSW',  [ 'R', 'G', 'B' ], [], [] ),
            new Domain('V',  [ 'R', 'G', 'B' ], [], [] ),
            new Domain('T',  [ 'R', 'G', 'B' ], [], [] ),
        ], [
            new Relationship('SA', [ 'WA', 'NT', 'Q', 'NSW', 'V'] ),
            new Relationship( 'WA', [ 'SA', 'NT' ] ),
            new Relationship( 'NT', [ 'SA', 'WA', 'Q' ] ),
            new Relationship( 'Q', [ 'NT', 'NSW', 'SA' ] ),
            new Relationship( 'NSW', [ 'SA', 'Q', 'V' ] ),
            new Relationship( 'V', [ 'SA', 'NSW' ] ),
            new Relationship( 'T', [ ] ),
        ], [
            (iDVal, jDVal) => {
                return iDVal !== jDVal;
            }
        ]);
    }
    static SudokuProblem() {
        const initialConfig = {
            ['3.1']: 5,
            ['5.1']: 1,
            ['7.1']: 3,
            ['1.2']: 8,
            ['4.2']: 2,
            ['6.2']: 3,
            ['9.2']: 9,
            ['3.3']: 2,
            ['4.3']: 6,
            ['6.3']: 9,
            ['7.3']: 5,
            ['3.4']: 6,
            ['4.4']: 7,
            ['6.4']: 8,
            ['7.4']: 2,
            ['1.5']: 7,
            ['9.5']: 8,
            ['3.6']: 8,
            ['4.6']: 1,
            ['6.6']: 2,
            ['7.6']: 9,
            ['3.7']: 1,
            ['4.7']: 8,
            ['6.7']: 6,
            ['7.7']: 4,
            ['1.8']: 9,
            ['4.8']: 3,
            ['6.8']: 5,
            ['9.8']: 1,
            ['3.9']: 3,
            ['5.9']: 2,
            ['7.9']: 6
        }
        const X = (v) => v.split('.')[0];
        const Y = (v) => v.split('.')[1];
        const square = (v) => {
            if (X(v) <= 3 && Y(v) <= 3) return 1;
            if (X(v) <= 3 && Y(v) > 3 && Y(v) <= 6) return 2;
            if (X(v) <= 3 && Y(v) > 6 && Y(v) <= 9) return 3;
            if (X(v) > 3 && X(v) <= 6 && Y(v) <= 3) return 4;
            if (X(v) > 3 && X(v) <= 6 && Y(v) > 3 && Y(v) <= 6) return 5;
            if (X(v) > 3 && X(v) <= 6 && Y(v) > 6 && Y(v) <= 9) return 6;
            if (X(v) > 6 && Y(v) <= 3) return 7;
            if (X(v) > 6 && Y(v) > 3 && Y(v) <= 6) return 8;
            if (X(v) > 6 && Y(v) > 6) return 9;
        }
        const variables = Array(9)
            .fill('')
            .map((_, i) =>
                Array(9)
                    .fill('')
                    .map((_, j) => `${i + 1}.${j + 1}`))
            .flat()
            .map(v => new Variable(v, initialConfig[v]));
        const relationships = variables.map(v => {
            return new Relationship(v.key, variables.filter(vv => {
                return X(vv.key) === X(v.key) || Y(vv.key) === Y(v.key) || square(vv.key) === square(v.key);
            }).map(vv => vv.key));
        });
        const domains = variables.map(v => {
            return new Domain(v.key, [1,2,3,4,5,6,7,8,9], [], []);
        })
        const m = new Model(variables, domains, relationships, [
            (iDVal, jDVal) => {
                return iDVal !== jDVal;
            }
        ]);
        variables.forEach(v => {
            if (v.IsAssigned()) {
                m.DomainOf(v.key).Prune(v.value);
            }
        });
        return m;
    }
}
