const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        globalObject: 'this',
        libraryTarget: 'umd',
        library: 'csp-js',
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ],
    },
};
