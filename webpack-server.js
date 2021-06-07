#!/usr/bin/env node

/* eslint-env node */
/* eslint-disable no-console */

const path = require('path');
const args = require('./build-arguments');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const middleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const getWebpackConfig = require('./get-webpack-config');
const express = require('express');

if (!args.config) {
    throw new Error('Please provide config path --config=PATH_TO_CONFIG.js');
}

let isCompiling = false;

if (args.buildDir) {
    isCompiling = true;
}

const configPath = path.resolve(process.cwd(), args.config);
const config = require(configPath);
const PORT = args.port || 8080;
const HOST = args.host || 'localhost';

const webpackConfigFromProject = config.getWebpackConfig({
    nodeRequire: require,
    path,
    webpack,
});

if (
    webpackConfigFromProject &&
    webpackConfigFromProject.module &&
    webpackConfigFromProject.module.rules
) {
    throw new Error(
        `Please don't use module.rules in your webpack config, pass getLoaderForModule() instead. See the documentation for more info.`
    );
}

const tsConfigPath = config.tsConfigPath
    ? config.tsConfigPath
    : path.resolve(process.cwd(), './tsconfig.json');

const ourWebpackConfig = getWebpackConfig({
    buildDir: args.buildDir,
    configPath,
    getSections: config.getSections,
    getComponentRoots: config.getComponentRoots,
    getExceptionForLoaders: config.getExceptionForLoaders,
    getBabelConfig: config.getBabelConfig,
    getBabelParserOptions: config.getBabelParserOptions,
    getLoadersForComponents: config.getLoadersForComponents,
    getLoaderForModule: config.getLoaderForModule,
    getTypescriptCompilerOptions: config.getTypescriptCompilerOptions,
    applyBabelToTypescriptCode: config.applyBabelToTypescriptCode,
    tsConfigPath,
});

const mergedConfig = webpackMerge.smart(ourWebpackConfig, webpackConfigFromProject);

const compiler = webpack(mergedConfig);

if (isCompiling) {
    compiler.run((err, stats) => {
        // Stats Object
        if (err) {
            throw err;
        }

        if (stats.hasErrors()) {
            throw stats.toString({
                // Add console colors
                colors: true,
            });
        }

        console.log('Styleguide compiled');
    });
} else {
    const server = express();

    server
        .use(
            middleware(compiler, {
                publicPath: mergedConfig.output.publicPath,
            })
        )
        .use(hotMiddleware(compiler));

    server.listen(PORT, HOST, () => {
        console.log(`Starting server on http://${HOST}:${PORT}`);
    });
}
