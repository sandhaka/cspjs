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
        const X = (v) => v.split('.')[0];
        const Y = (v) => v.split('.')[1];
        //const square = (v) => parseFloat(v)
        const variables = Array(9)
            .fill('')
            .map((_, i) =>
                Array(9)
                    .fill('')
                    .map((_, j) => `${i + 1}.${j + 1}`)
            );



        return new Model([

        ], [

        ], [

        ], [

        ]);
    }
}
