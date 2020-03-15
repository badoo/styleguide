/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const { isDebug, buildDir, noPropsInTsxComponents } = require('./build-arguments');
const getBabelOptions = require('./get-babel-options');

const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isCompiling = buildDir => {
    const hasPath = buildDir === '' || Boolean(buildDir);

    return !hasPath;
};
const useCache = isCompiling(buildDir);
const setLoaders = (useCache, loaders) => (useCache ? loaders : ['cache-loader', ...loaders]);

module.exports = function getWebpackConfig({
    devServerUrl,
    buildDir,
    isReactNative,
    configPath,
    getComponentRoots,
    getExceptionForLoaders,
    getBabelConfig,
    getLoaderForModule,
    tsConfigPath,
}) {
    const exceptionsList = getExceptionForLoaders && getExceptionForLoaders({ path });

    const jsLoaderExceptionList =
        exceptionsList && exceptionsList.jsLoader
            ? [
                  /node_modules\/(?!badoo-styleguide)/,
                  path.resolve(__dirname, 'src/index.jsx'),
                  ...exceptionsList.jsLoader,
              ]
            : [/node_modules\/(?!badoo-styleguide)/, path.resolve(__dirname, 'src/index.jsx')];

    const tsLoaderExceptionList =
        exceptionsList && exceptionsList.tsLoader
            ? [/node_modules\/(?!badoo-styleguide)/, /\.d\.ts/, ...exceptionsList.tsLoader]
            : [/node_modules\/(?!badoo-styleguide)/, /\.d\.ts/];

    return {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map',
        entry: [
            'react-hot-loader/patch',
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
            // stats: {
            //     colors: true,
            // },
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
                    test: /\.(j|t)sx?$/,
                    exclude: /node_modules/,
                    use: ['react-hot-loader/webpack'],
                },
                {
                    test: /\.jsx?$/,
                    // React native modules usually always need to be loaded by metro
                    exclude: isReactNative ? undefined : jsLoaderExceptionList,
                    use: 'happypack/loader?id=js-component-loader',
                },
                {
                    test: /\.tsx?$/,
                    // React native modules usually always need to be loaded by metro
                    exclude: isReactNative ? undefined : tsLoaderExceptionList,
                    use: 'happypack/loader?id=ts-component-loader',
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
            alias: {
                __GLOBAL__CONFIG__: configPath,
                'react-dom': '@hot-loader/react-dom'
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
                        loader: noPropsInTsxComponents ? 'js-component' : 'ts-component',
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
