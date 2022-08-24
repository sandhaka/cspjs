const revise = (model, vI, vJ) => {
    let revise = false;
    const domainI = model.DomainOf(vI.key);
    const domainJ = model.DomainOf(vJ.key);
    for (let di = 0; di < domainI.values.length; di++) {
        const iDomainValue = domainI.values[di];
        // Test i domain value
        let test = true;
        if (model.GetVariable(vJ.key).IsAssigned()) {
            test = !model.constraints.every(constraint => {
                return constraint(model, vI.key, vJ.key, iDomainValue, model.GetVariable(vJ.key).value);
            });
        } else {
            test = domainJ.values.every(jDomainValue => {
                return !model.constraints.every(constraint => {
                    return constraint(model, vI.key, vJ.key, iDomainValue, jDomainValue);
                });
            })
        }
        if (test) {
            // if no value in Dj allows (di, dj) to satisfy the constraint between vI and vJ then delete Di
            domainI.Prune(iDomainValue);
            revise = true;
            break;
        }
    }
    return revise;
}

export const Ac3 = (model) => {
    const queue = [];
    for (let r = 0; r < model.relationships.length; r++) {
        for (let rv = 0; rv < model.relationships[r].values.length; rv++) {
            queue.push({
                i: model.relationships[r].key,
                j: model.relationships[r].values[rv]
            });
        }
    }
    while (queue.length > 0) {
        const arc = queue.shift();
        if (revise(model, model.GetVariable(arc.i), model.GetVariable(arc.j))) {
            if (model.DomainOf(arc.i).values.length === 0)
                return false;
            const ir = model.RelationshipsOf(arc.i).values;
            for (let r = 0; r < ir.length; r++) {
                const k = ir[r];
                if (!queue.find(q => q.i === k && q.j === arc.i))
                    queue.push({i: k, j: arc.i});
            }
        }
    }
    return true;
}
