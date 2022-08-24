import {Model, Variable, Domain, Relationship} from "../src";

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
            (model, vi, vj, iDVal, jDVal) => {
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
                return vv.key !== v.key && (X(vv.key) === X(v.key) || Y(vv.key) === Y(v.key) || square(vv.key) === square(v.key));
            }).map(vv => vv.key));
        });
        const domains = variables.map(v => {
            return new Domain(v.key, [1,2,3,4,5,6,7,8,9], [], []);
        });
        const m = new Model(variables, domains, relationships, [
            (model, vi, vj, iDVal, jDVal) => {
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
    static MineSweeperBoardProblem() {
        //# region [ Support ]
        const buildMap = (map) => {
            const m = [];
            for (let i = 0; i < map.length;) {
                const row = [];
                for (let j = 0;; j++) {
                    row.push(map[i]);
                    i+=2;
                    if (map[i - 1] === '\n' || i >= map.length)
                        break;
                }
                m.push(row);
            }
            return m;
        };
        const solution = buildMap(
`1 x 1 1 x 1
2 2 2 1 2 2
2 x 2 0 1 x
2 x 2 1 2 2
1 1 1 1 x 1
0 0 0 1 1 1`);
        // Input:
        const board =
`? ? ? ? ? ?
? ? ? ? ? ?
? ? ? 0 ? ?
? ? ? ? ? ?
? ? ? ? ? ?
0 0 0 ? ? ?`;
        let minesLeft = 6;
        const getNeighbors = (x, y, width, height) => {
            const neighborsCells = [
                { x: x - 1, y: y },
                { x: x + 1, y: y },
                { x: x - 1, y: y - 1 },
                { x: x + 1, y: y + 1 },
                { x: x + 1, y: y - 1 },
                { x: x - 1, y: y + 1 },
                { x: x, y: y - 1 },
                { x: x, y: y + 1 },
            ];
            const neighbors = [];
            for (const cell of neighborsCells) {
                if (cell.x < 0 || cell.y < 0 || cell.x > width - 1 || cell.y > height - 1)
                    continue;
                neighbors.push(cell);
            }
            return neighbors;
        };
        const getNeighborsMines = (neighbors, map) => neighbors.filter(n => map[n.x][n.y] === 'x');
        const getUnknownNeighbors = (neighbors, map) => neighbors.filter(n => map[n.x][n.y] === '?');
        const openCells = (cells, map) => {
            cells.forEach(n => {
                map[n.x][n.y] = open(n.x, n.y);
            });
        };
        const mark = (cells, map) => {
            cells.forEach(n => {
                map[n.x][n.y] = 'x';
                minesLeft--;
            });
        };
        const open = (r, c) => {
            return solution[r][c];
        };
        const openSecurePlaces = (map) => {
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[i].length; j++) {
                    const neighbors = getNeighbors(i, j, map.length, map[i].length);
                    const unknownNeighbors = getUnknownNeighbors(neighbors, map);
                    if (unknownNeighbors.length === 0)
                        continue;
                    const nMines = getNeighborsMines(neighbors, map).length;
                    // If cell == 0 OR cell == number of neighbors mines left then open others
                    if (map[i][j] === 0 || parseInt(map[i][j]) === nMines) {
                        openCells(unknownNeighbors, map);
                        return openSecurePlaces(map);
                    }
                    // MinesLeft
                    if (parseInt(map[i][j]) === (unknownNeighbors.length + nMines)) {
                        mark(unknownNeighbors, map);
                        return openSecurePlaces(map);
                    }
                }
            }
            // Resolution condition
            return minesLeft === 0;
        };
        //# endregion
        const map = buildMap(board);
        const _ = openSecurePlaces(map);

        const _x = (v) => parseInt(v.split('.')[0]);
        const _y = (v) => parseInt(v.split('.')[1]);
        const variables = Array(map.length)
            .fill('')
            .map((_, i) =>
                Array(map[i].length)
                    .fill('')
                    .map((_, j) => `${i}.${j}`))
            .flat()
            .map(v => new Variable(v, map[_x(v)][_y(v)]));
        variables.forEach(v => v.value = v.value === '?' ? undefined : v.value);
        const relationships = variables.map(v => {
            const rel = [];
            for (const neighbor of getNeighbors(_x(v.key), _y(v.key), map.length, map[0].length)) {
                const related = variables.find(vv => vv.key === `${neighbor.x}.${neighbor.y}`);
                rel.push(related.key);
            }
            return new Relationship(v.key, rel);
        });
        const domains = variables.map(v => {
            if (v.IsAssigned())
                return new Domain(v.key, [], [], []);
            const n = getNeighbors(_x(v.key), _y(v.key), map.length, map[0].length).length;
            const d = [];
            for (let i = 0; i <= n; i++) d.push(''+i);
            return new Domain(v.key, [...d, ...['x']], [], []);
        });
        return new Model(variables, domains, relationships,[
            // Checking locally
            (model, vi, vj, iDVal, jDVal) => {
                // If there is a mine, ok if every assigned neighbor is not 0
                if (iDVal === 'x') return jDVal === 'x' || !jDVal || parseInt(jDVal) > 0;
                if (jDVal === 'x') return iDVal === 'x' || parseInt(iDVal) > 0;
                // Otherwise accept values between mines number and mines + unknown cells
                const values = model.RelationshipsOf(vi).values.map(v => v === vj ? jDVal : model.GetVariable(v).value);
                return values.filter(v => v === 'x' || !v).length >= parseInt(iDVal) && values.filter(v => v === 'x').length <= parseInt(iDVal)
            },
            // Checking neighbors (the same consistency checks for all neighbors)
            (model, vi, vj, iDVal, jDVal) => {
                const neighborsOfi = model.RelationshipsOf(vi).values
                    .map(v => model.GetVariable(v))
                    .filter (v => {
                        if (vj !== v.key) return v.value && v.value !== 'x';
                        return jDVal !== 'x';
                    });
                return neighborsOfi.every(n => {
                    const values = model.RelationshipsOf(n.key).values.map(v => vi === v ? iDVal : model.GetVariable(v).value);
                    if (values.filter(v => !v).length === 0) {
                        return values.filter(v => v === 'x').length === parseInt(n.value)
                    }
                    return values.filter(v => v === 'x' || !v).length >= parseInt(n.value) &&
                        values.filter(v => v === 'x').length <= parseInt(n.value);
                });
            },
        ]);
    }
}
