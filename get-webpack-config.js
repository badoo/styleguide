/* eslint-env node */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = function getWebpackConfig({
    devServerUrl,
    buildDir,
    isReactNative,
    modulesDirectory,
    configPath,
}) {
    return {
        entry: [
            `webpack-dev-server/client?${devServerUrl}`,
            'webpack/hot/dev-server',
            path.resolve(__dirname, 'src/index.jsx'),
        ],
        output: {
            path: buildDir || path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader', // creates style nodes from JS strings
                        {
                            loader: 'css-loader',
                            options: {
                                url: true,
                            },
                        },
                        'ltr-rtl',
                        'post-css',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                url: true,
                            },
                        },
                        'ltr-rtl',
                        'post-css',
                    ],
                },
                {
                    test: /\.(j|t)sx?$/,
                    // React native modules usually always need to be loaded by metro
                    exclude: isReactNative ? undefined : /node_modules\/(?!badoo-styleguide)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: getBabelOptions({ isReactNative }),
                        },
                        {
                            loader: 'component',
                            options: {
                                cwd: modulesDirectory,
                            },
                        },
                    ],
                },
                {
                    test: /\.(gif|png|jpe?g)$/i,
                    use: ['file-loader'],
                },
                {
                    test: /\.(woff|ttf)$/i,
                    use: ['file-loader'],
                },
                {
                    test: /\.svg$/i,
                    oneOf: [
                        {
                            use: ['babel-loader', 'react-svg-loader'],
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
            alias: {
                __GLOBAL__CONFIG__: configPath,
            },
        },
        resolveLoader: {
            modules: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'loaders'),
                'node_modules',
            ],
        },
        mode: 'development',
        plugins: [
            new HtmlWebpackPlugin({ title: 'Frontend Styleguide' }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                DEBUG: false,
            }),
        ],
    };
};

function getBabelOptions({ isReactNative }) {
    if (isReactNative) {
        return {
            babelrc: false,
            sourceMaps: 'both',
            presets: [require.resolve('metro-react-native-babel-preset')],
            plugins: [require.resolve('react-hot-loader/babel')],
        };
    }

    return {
        babelrc: false,
        presets: [
            [
                require.resolve('@babel/preset-env'),
                {
                    targets: {
                        ie: 11,
                    },
                },
            ],
            [
                require.resolve('@babel/preset-react'),
                {
                    development: true,
                },
            ],
            [
                '@babel/preset-typescript',
                {
                    isTSX: true,
                    allExtensions: true,
                },
            ],
        ],
        plugins: [
            require.resolve('react-hot-loader/babel'),

            // Needed to have parity with TS class properties
            '@babel/plugin-proposal-class-properties',

            // Allow experimental rest spread syntax
            [
                '@babel/plugin-proposal-object-rest-spread',
                {
                    useBuiltIns: true,
                },
            ],
        ],
    };
}
