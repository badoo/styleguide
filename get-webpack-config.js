/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const { isDebug, isCi } = require('./build-arguments');

const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const setLoadersForCi = (isCi, loaders) => (isCi ? loaders : ['cache-loader', ...loaders]);

module.exports = function getWebpackConfig({
    devServerUrl,
    buildDir,
    isReactNative,
    configPath,
    getComponentRoots,
    getBabelConfig,
    getLoaderForModule,
    tsConfigPath,
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
            path: buildDir
                ? path.resolve(process.cwd(), buildDir)
                : path.resolve(__dirname, 'dist'),
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
                    oneOf: [
                        // This loader lets the consumers override any specific loaders
                        // they want
                        {
                            test(resource) {
                                if (getLoaderForModule) {
                                    return Boolean(getLoaderForModule({ resource, path }));
                                }

                                return false;
                            },

                            use({ resource }) {
                                return getLoaderForModule({ resource, path });
                            },
                        },
                        {
                            test: /\.scss$/,
                            use: [
                                'style-loader', // creates style nodes from JS strings
                                'css-loader',
                                'sass-loader',
                            ],
                        },
                        {
                            test: /\.css$/,
                            use: ['style-loader', 'css-loader'],
                        },
                        {
                            test: /\.(j|t)sx?$/,
                            // React native modules usually always need to be loaded by metro
                            exclude: isReactNative
                                ? undefined
                                : /node_modules\/(?!badoo-styleguide)/,
                            use: 'happypack/loader?id=babel',
                        },
                        {
                            test: /\.(gif|png|jpe?g|woff|ttf)$/i,
                            use: ['file-loader'],
                        },
                    ],
                },
                {
                    test: /\.jsx?$/,
                    // React native modules usually always need to be loaded by metro
                    exclude: isReactNative ? undefined : /node_modules\/(?!badoo-styleguide)/,
                    use: 'happypack/loader?id=js-component',
                },
                {
                    test: /\.tsx?$/,
                    // React native modules usually always need to be loaded by metro
                    exclude: isReactNative
                        ? undefined
                        : [/node_modules\/(?!badoo-styleguide)/, /\.d\.ts/],
                    use: 'happypack/loader?id=ts-component',
                },
                {
                    test: /\.(j|t)sx?$/,
                    include: /node_modules/,
                    use: ['react-hot-loader/webpack'],
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
                id: 'babel',
                verbose: isDebug,
                debug: isDebug,
                loaders: setLoadersForCi(isCi, [
                    {
                        loader: 'babel-loader',
                        options: getBabelOptions({ isReactNative, getBabelConfig }),
                    },
                ]),
            }),
            new HappyPack({
                id: 'js-component',
                verbose: isDebug,
                debug: isDebug,
                loaders: setLoadersForCi(isCi, [
                    {
                        loader: 'js-component',
                        options: {
                            componentRoots: getComponentRoots({ path }),
                        },
                    },
                ]),
            }),
            new HappyPack({
                id: 'ts-component',
                verbose: isDebug,
                debug: isDebug,
                loaders: setLoadersForCi(isCi, [
                    {
                        loader: 'ts-component',
                        options: {
                            componentRoots: getComponentRoots({ path }),
                            tsConfigPath: tsConfigPath,
                        },
                    },
                ]),
            }),
        ],
    };
};

function getBabelOptions({ isReactNative, getBabelConfig }) {
    let babelOverrides = {
        compact: false,
        minified: false,
        cacheDirectory: true,
    };

    if (getBabelConfig) {
        const babelConfig = getBabelConfig({ path });

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
