const path = require('path')

module.exports = {
    context: __dirname,
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        library: "Formulator",
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        filename: "formulator.js",
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader"
                ],
              }
        ]
    },
    resolve: {
        extensions: ['.ts']
    }
}