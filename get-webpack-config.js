/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const { isDebug } = require('./build-arguments');

const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function getWebpackConfig({
    devServerUrl,
    buildDir,
    isReactNative,
    getComponentRoots,
    configPath,
    babelConfig,
}) {
    return {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map',
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
            clientLogLevel: isDebug ? 'info' : 'warning',
            contentBase: path.resolve(__dirname, 'dist'),
            hot: true,
            open: true,
            stats: {
                colors: true,
            },
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
                    use: 'happypack/loader?id=js',
                },
                {
                    test: /\.(j|t)sx?$/,
                    include: /node_modules/,
                    use: ['react-hot-loader/webpack'],
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
        plugins: [
            new HtmlWebpackPlugin({ title: 'Frontend Styleguide' }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                DEBUG: false,
            }),
            new HappyPack({
                id: 'js',
                verbose: isDebug,
                debug: isDebug,
                loaders: [
                    {
                        loader: 'babel-loader',
                        options: getBabelOptions({ isReactNative, babelConfig }),
                    },
                    {
                        loader: 'component',
                        options: {
                            componentRoots: getComponentRoots(),
                        },
                    },
                ],
            }),
        ],
    };
};

function getBabelOptions({ isReactNative, babelConfig }) {
    let babelOverrides = {
        compact: false,
        minified: false,
        cacheDirectory: true,
    };

    if (babelConfig) {
        if (!babelConfig.plugins) {
            babelConfig.plugins = [];
        }

        babelConfig.plugins.unshift(require.resolve('react-hot-loader/babel'));

        return Object.assign({}, babelConfig, babelOverrides);
    }

    // @TODO - rethink this, should clients always pass their babel config? Or should we auto-detect it?
    if (isReactNative) {
        return Object.assign(
            {
                babelrc: false,
                presets: [require.resolve('metro-react-native-babel-preset')],
                plugins: [require.resolve('react-hot-loader/babel')],
            },
            babelOverrides
        );
    }

    // @TODO - rethink this, should clients always pass their babel config? Or should we auto-detect it?
    return Object.assign(
        {
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
        },
        babelOverrides
    );
}
