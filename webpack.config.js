let path = require('path');

let config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'build.js',
        publicPath: 'build/'
    },
    devServer: {
        overlay: true,
        historyApiFallback: true,
    },
    module: {
        rules: [{
            test: /\.(mjs|js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        ["module-resolver", {
                            "root": ["./src"],
                            "alias": {
                                "core": "./src/core",
                                "lib": "./src/lib",
                                "containers": "./src/containers_CNT",
                                "header": "./src/components/header_CMH",
                                "menu": "./src/components/header/menu_CMHM",
                                "content": "./src/components/content_CMC",
                                "icons": "./src/components/icons_CMI",
                                "footer": "./src/components/footer_CMF",
                                "actions": "./src/core/actions_AC",
                                "reducers": "./src/core/reducers_R",
                                "test": "./test",
                                "underscore": "lodash"
                            }
                        }],
                        ["@babel/transform-runtime"]
                    ]
                }
            }
        },
        ]
    },
};

module.exports = (env, options) => {
    let prd = options.mode === 'production';
    config.devtool = prd ?
        false // или 'source-map', но зачем это на production, оставляем false
        :
        'eval-sourcemap';
    return config;
}
