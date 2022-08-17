
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

// Model agnostic validator for sudoku map
export const SudokuValidator = (model) => {
    const map = modelToMap(model);
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
}

export const CspValidator = (model) => {
    return model.relationships.every(r => {
        const variableValue = model.GetVariable(r.key).value;
        return r.values.every(rv => model.GetVariable(rv).value !== variableValue);
    });
}
