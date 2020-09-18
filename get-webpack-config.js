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

const getComponentsFromSections = sections => {
    const sectionList = sections.toString();
    const componentPaths = sectionList
        .match(/(((?<!\/[/*]\s))require\([/'_\-A-Za-z0-9]+\))/gm)
        .map(path => path.replace(/require\((.+)\)/g, '$1').replace(/'/g, ''));

    return Array.from(new Set(componentPaths));
};

const resolveComponentPathsFromComponentRoots = (components, getComponentRoots) => {
    const listOfResolvedComponents = getComponentRoots({ path }).map(root =>
        components.map(component => path.resolve(root, component))
    );

    return listOfResolvedComponents.reduce(
        (flatComponentsList, section) => flatComponentsList.concat(section),
        []
    );
};

module.exports = function getWebpackConfig({
    devServerUrl,
    buildDir,
    isReactNative,
    configPath,
    getSections,
    getComponentRoots,
    getExceptionForLoaders,
    getBabelConfig,
    getBabelParserOptions,
    getLoadersForComponents,
    getLoaderForModule,
    getTypescriptCompilerOptions,
    applyBabelToTypescriptCode = false,
    tsConfigPath,
}) {
    const components = getSections ? getComponentsFromSections(getSections) : undefined;
    const includePaths =
        components && getComponentRoots
            ? resolveComponentPathsFromComponentRoots(components, getComponentRoots)
            : undefined;
    const exceptionsList = getExceptionForLoaders && getExceptionForLoaders({ path });
    const loadersFromConsumers = getLoadersForComponents ? getLoadersForComponents({ path }) : null;
    const jsComponentLoaders = {
        loader: 'js-component',
        options: {
            babelParserOptions: getBabelParserOptions ? getBabelParserOptions() : undefined,
        },
    };
    const tsComponentLoaders = {
        loader: 'ts-component',
        options: {
            babelParserOptions: getBabelParserOptions ? getBabelParserOptions() : undefined,
            tsConfigPath,
        },
    };
    const genericJsLoader = {
        loader: 'babel-loader',
        options: getBabelOptions({ isReactNative, getBabelConfig }),
    };
    const compilerOptions = getTypescriptCompilerOptions
        ? getTypescriptCompilerOptions()
        : {
              noEmit: false,
          };
    const genericTsLoader = {
        loader: 'ts-loader',
        options: {
            configFile: tsConfigPath,
            transpileOnly: true,
            onlyCompileBundledFiles: true,
            compilerOptions,
        },
    };

    /**
     * sometimes we need to parse transpiled typescript code with babel
     * after initial transform
     */
    const genericLoaders = applyBabelToTypescriptCode
        ? [genericJsLoader, ...setLoaders(genericTsLoader, loadersFromConsumers)]
        : setLoaders(genericTsLoader, loadersFromConsumers);

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

    const tsLoaderExtraExceptionList =
        exceptionsList && exceptionsList.tsLoader
            ? [...exceptionsList.tsExtraLoader]
            : [];
    
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
                                : tsLoaderExtraExceptionList.concat(/node_modules\/(?!badoo-styleguide)/),
                            use: genericLoaders,
                        },
                        {
                            test: /\.(gif|png|jpe?g|woff|ttf)$/i,
                            use: ['file-loader'],
                        },
                    ],
                },
                {
                    test: /\.(j|t)sx?$/,
                    exclude: tsLoaderExtraExceptionList.concat(/node_modules/),
                    use: ['react-hot-loader/webpack'],
                },
                {
                    test: /\.jsx?$/,
                    // React native modules usually always need to be loaded by metro
                    exclude: isReactNative ? undefined : jsLoaderExceptionList,
                    include: includePaths,
                    use: setCachingForLoaders(
                        useCache,
                        setLoaders(jsComponentLoaders, loadersFromConsumers)
                    ),
                },
                {
                    test: /\.tsx?$/,
                    // React native modules usually always need to be loaded by metro
                    exclude: isReactNative ? undefined : tsLoaderExceptionList,
                    include: includePaths,
                    use: setCachingForLoaders(
                        useCache,
                        setLoaders(tsComponentLoaders, loadersFromConsumers)
                    ),
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            modules: [path.resolve(__dirname, 'node_modules')],
            alias: {
                __GLOBAL__CONFIG__: configPath,
            },
        },
        resolveLoader: {
            modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'loaders')],
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
