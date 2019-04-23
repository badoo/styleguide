#!/usr/bin/env node

/* eslint-env node */
/* eslint-disable no-console */

const path = require('path');
const argv = require('yargs').argv;

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');
const getWebpackConfig = require('./get-webpack-config');

if (!argv.config) {
    throw new Error('Please provide config path --config=PATH_TO_CONFIG.js');
}

const configPath = path.resolve(process.cwd(), argv.config);
const config = require(configPath);
const PORT = argv.port || 8080;
const HOST = argv.host || 'localhost';

const {
    webpackConfig: webpackConfigFromProject,
    getComponentRoots,
    babelConfig,
} = config.getWebpackConfig({
    nodeRequire: require,
    path,
    webpack,
});

const ourWebpackConfig = getWebpackConfig({
    devServerUrl: `http://${HOST}:${PORT}`,
    buildDir: argv.buildDir,
    isReactNative: config.isReactNative,
    getComponentRoots,
    configPath,
    babelConfig,
});

const mergedConfig = webpackMerge.smart(ourWebpackConfig, webpackConfigFromProject);

const compiler = webpack(mergedConfig);
const devServerOptions = Object.assign({}, ourWebpackConfig.devServer);

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(PORT, HOST, () => {
    console.log(`Starting server on http://${HOST}:${PORT}`);
});
