function getVal(obj, prop) {
    const props = prop.split('.');
    if (props.length === 1) {
        return obj[prop];
    } else {
        return getVal(obj[props[0]], prop.slice(prop.indexOf('.') + 1, prop.length));
    }
}

if (!Array.prototype.groupBy) {
    // Return an array of 'Grouping' object
    Array.prototype.groupBy = function (prop, opCallBack) {
        return this.reduce((data, item) => {
            // Get value
            const val = getVal(item, prop);
            // Search val
            if (data.filter(g => g.key === val).length === 0) {
                data.push({
                    key: val,
                    values: []
                });
            }
            if(opCallBack) {
                opCallBack(data.find(g => g.key === val), item);
            }
            data.find(g => g.key === val).values.push(item);
            return data;
        }, []);
    }
}

if (!Array.prototype.sortAscending) {
    Array.prototype.sortAscending = function (pred) {
        return this.sort((a, b) => {
            if (pred(a) === pred(b)) return 0;
            if (pred(a) > pred(b)) return 1;
            return -1;
        })
    }
}

if (!Array.prototype.sortDescending) {
    Array.prototype.sortDescending = function (pred) {
        return this.sort((a, b) => {
            if (pred(a) === pred(b)) return 0;
            if (pred(a) > pred(b)) return -1;
            return 1;
        })
    }
}
