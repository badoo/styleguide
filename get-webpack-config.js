/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const { isDebug, buildDir } = require('./build-arguments');
const getBabelOptions = require('./get-babel-options');

const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isCompiling = buildDir => {
    const hasPath = buildDir === '' || Boolean(buildDir);

    return !hasPath;
};
const useCache = isCompiling(buildDir);
const setLoaders = (useCache, loaders) => (useCache ? loaders : ['cache-loader', ...loaders]);
const hasTypescriptBabelPreset = true;

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
                            test: /\.jsx?$/,
                            // React native modules usually always need to be loaded by metro
                            exclude: isReactNative
                                ? undefined
                                : /node_modules\/(?!badoo-styleguide)/,
                            use: 'happypack/loader?id=babel-js',
                        },
                        {
                            test: /\.tsx?$/,
                            // React native modules usually always need to be loaded by metro
                            exclude: isReactNative
                                ? undefined
                                : /node_modules\/(?!badoo-styleguide)/,
                            use: 'happypack/loader?id=babel-ts',
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
                    exclude: isReactNative
                        ? undefined
                        : [
                              /node_modules\/(?!badoo-styleguide)/,
                              path.resolve(__dirname, 'src/index.jsx'),
                                /\.spec\.jsx$/,
                                /ui\/enum/,
                                /packages\/utils/,
                                /packages\/localization/,
                                /styleguide\/mocks/,
                                /src\/jscore/,
                                    /src\/utils/,
                                /\.config\.ts$/,
                          ],
                    use: 'happypack/loader?id=js-component-loader',
                },
                {
                    test: /\.tsx?$/,
                    // React native modules usually always need to be loaded by metro
                    exclude: isReactNative
                        ? undefined
                        : [/node_modules\/(?!badoo-styleguide)/, /\.d\.ts/, /\.spec\.tsx$/,
                            /ui\/enum/,
                            /packages\/utils/,
                            /packages\/localization/,
                            /styleguide\/mocks/,
                            /src\/jscore/,
                                /src\/utils/,
                            /\.config\.ts$/,
                        ],
                    use: 'happypack/loader?id=ts-component-loader',
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
                id: 'babel-js',
                verbose: isDebug,
                debug: isDebug,
                loaders: setLoaders(useCache, [
                    {
                        loader: 'babel-loader',
                        options: getBabelOptions({ isReactNative, getBabelConfig }),
                    },
                ]),
            }),
            new HappyPack({
                id: 'babel-ts',
                verbose: isDebug,
                debug: isDebug,
                loaders: setLoaders(useCache, [
                    {
                        loader: 'babel-loader',
                        options: getBabelOptions({
                            isReactNative,
                            getBabelConfig,
                            hasTypescriptBabelPreset,
                        }),
                    },
                ]),
            }),
            new HappyPack({
                id: 'js-component-loader',
                verbose: isDebug,
                debug: isDebug,
                loaders: setLoaders(useCache, [
                    {
                        loader: 'js-component',
                        options: {
                            componentRoots: getComponentRoots({ path }),
                        },
                    },
                ]),
            }),
            new HappyPack({
                id: 'ts-component-loader',
                verbose: isDebug,
                debug: isDebug,
                loaders: setLoaders(useCache, [
                    {
                        loader: 'ts-component',
                        options: {
                            componentRoots: getComponentRoots({ path }),
                            tsConfigPath: tsConfigPath,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: tsConfigPath,
                            happyPackMode: true,
                            compilerOptions: {
                                noEmit: false,
                            },
                        },
                    },
                ]),
            }),
        ],
    };
};
