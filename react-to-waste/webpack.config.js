const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtReactWebpackPlugin = require('@extjs/reactor-webpack-plugin');

const sourcePath = path.join(__dirname, './src');

module.exports = function (env) {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';

    const plugins = [
        new ExtReactWebpackPlugin({
            theme: 'custom-ext-react-theme',
            overrides: ['ext-react/overrides'],
            production: isProd
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: nodeEnv
        })
    ];

    if (isProd) {
        plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true
                }
            })
        );
    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    }

    plugins.push(new HtmlWebpackPlugin({
        template: 'index.html',
        hash: true
    }), new OpenBrowserPlugin({ 
        url: 'http://localhost:8080' 
    }));

    return {
        devtool: isProd ? 'source-map' : 'eval',
        context: sourcePath,

        entry: [
            './index.js'
        ],

        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.js',
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader'
                    ],
                },
            ],
        },

        resolve: {
            // The following is only needed when running this boilerplate within the extjs-reactor repo.  You can remove this from your own projects.
            alias: {
                "react-dom": path.resolve('./node_modules/react-dom'),
                "react": path.resolve('./node_modules/react')
            }
        },

        plugins,

        stats: {
            colors: {
                green: '\u001b[32m',
            }
        },

        devServer: {
            contentBase: './build',
            historyApiFallback: true,
            port: 8080,
            compress: isProd,
            inline: !isProd,
            hot: !isProd,
            stats: {
                assets: true,
                children: false,
                chunks: false,
                hash: false,
                modules: false,
                publicPath: false,
                timings: true,
                version: false,
                warnings: true,
                colors: {
                    green: '\u001b[32m'
                }
            },
        }
    };
};