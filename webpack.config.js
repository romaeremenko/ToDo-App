const path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    plugins: [
        new LiveReloadPlugin(), new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    entry: {
        main: ["webpack-dev-server/client", './src/js/index.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    devServer: {
        host:'localhost',
        port: 8080,
    }
};