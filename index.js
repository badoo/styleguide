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

let isCompiling = false;

if (argv.buildDir) {
    isCompiling = true;
}

const configPath = path.resolve(process.cwd(), argv.config);
const config = require(configPath);
const PORT = argv.port || 8080;
const HOST = argv.host || 'localhost';

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

const ourWebpackConfig = getWebpackConfig({
    devServerUrl: `http://${HOST}:${PORT}`,
    buildDir: argv.buildDir,
    isReactNative: config.isReactNative,
    configPath,
    getBabelConfig: config.getBabelConfig,
    getComponentRoots: config.getComponentRoots,
    getLoaderForModule: config.getLoaderForModule,
    tsConfigPath: path.resolve(process.cwd(), './tsconfig.json')
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
    const devServerOptions = Object.assign({}, ourWebpackConfig.devServer);
    const server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(PORT, HOST, () => {
        console.log(`Starting server on http://${HOST}:${PORT}`);
    });
}
