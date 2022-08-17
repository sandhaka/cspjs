const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        globalObject: 'this',
        library: {
            name: "csp-js",
            type: "umd"
        }
    },
    mode: "development"
};
