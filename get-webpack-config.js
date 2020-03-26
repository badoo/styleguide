/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const { isDebug, buildDir } = require('./build-arguments');
const getBabelOptions = require('./get-babel-options');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const isCompiling = buildDir => {
    const hasPath = buildDir === '' || Boolean(buildDir);

    return !hasPath;
};
const useCache = isCompiling(buildDir);
const setCachingForLoaders = (useCache, loaders) =>
    useCache ? loaders : ['cache-loader', ...loaders];
const setLoaders = (internalLoaders, externalLoader) =>
    externalLoader ? [internalLoaders, ...externalLoader] : [internalLoaders];

const setComponents = getSectionComponents => {
    const sectionList = getSectionComponents({ path });

    return sectionList
        ? sectionList.map(section => section.components).reduce((acc, val) => acc.concat(val), [])
        : undefined;
};

module.exports = function getWebpackConfig({
    devServerUrl,
    buildDir,
    isReactNative,
    configPath,
    getComponentRoots,
    getSectionComponents,
    getExceptionForLoaders,
    getBabelConfig,
    getBabelParserOptions,
    getLoadersForComponents,
    getLoaderForModule,
    tsConfigPath,
}) {
    const exceptionsList = getExceptionForLoaders && getExceptionForLoaders({ path });
    const components = getSectionComponents ? setComponents(getSectionComponents) : undefined;
    const loadersFromConsumers = getLoadersForComponents ? getLoadersForComponents({ path }) : null;

    const jsComponentLoaders = {
        loader: 'js-component',
        options: {
            componentRoots: getComponentRoots({ path }),
            babelParserOptions: getBabelParserOptions ? getBabelParserOptions() : undefined,
        },
    };

    const tsComponentLoaders = {
        loader: 'ts-component',
        options: {
            componentRoots: getComponentRoots({ path }),
            babelParserOptions: getBabelParserOptions ? getBabelParserOptions() : undefined,
            tsConfigPath,
        },
    };

    const genericJsLoader = {
        loader: 'babel-loader',
        options: getBabelOptions({ isReactNative, getBabelConfig }),
    };

    const genericTsLoader = {
        loader: 'ts-loader',
        options: {
            configFile: tsConfigPath,
            compilerOptions: {
                noEmit: false,
            },
        },
    };

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
                            use: ['style-loader', 'css-loader', 'sass-loader'],
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
                            use: setCachingForLoaders(
                                useCache,
                                setLoaders(genericJsLoader, loadersFromConsumers)
                            ),
                        },
                        {
                            test: /\.tsx?$/,
                            // React native modules usually always need to be loaded by metro
                            exclude: isReactNative
                                ? undefined
                                : /node_modules\/(?!badoo-styleguide)/,
                            use: setCachingForLoaders(
                                useCache,
                                setLoaders(genericTsLoader, loadersFromConsumers)
                            ),
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
                    include: components ? components : undefined,
                    use: setCachingForLoaders(
                        useCache,
                        setLoaders(jsComponentLoaders, loadersFromConsumers)
                    ),
                },
                {
                    test: /\.tsx?$/,
                    // React native modules usually always need to be loaded by metro
                    exclude: isReactNative ? undefined : tsLoaderExceptionList,
                    include: components ? components : undefined,
                    use: setCachingForLoaders(
                        useCache,
                        setLoaders(tsComponentLoaders, loadersFromConsumers)
                    ),
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
        ],
    };
};
