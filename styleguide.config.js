/* eslint-env node */

module.exports = {
    applyBabelToTypescriptCode: true,

    legendFontSize: 30,

    placeholderFontSize: 30,

    getExceptionForLoaders() {
        return {
            jsLoader: [/spec\.jsx$/],
        };
    },

    getSections() {
        return [
            {
                name: 'Structure',
                components: [
                    require('components/component/component'),
                    require('components/error-boundary/error-boundary'),
                ],
            },
            {
                name: 'Components',
                components: [
                    require('components/error-boundary/error-boundary'),
                    require('components/component/component'),
                ],
            },
        ];
    },

    getComponentRoots({ path }) {
        const cwd = path.resolve(__dirname, '.');

        return [path.resolve(cwd, 'src')];
    },

    getWebpackConfig({ path }) {
        const cwd = path.resolve(__dirname, '.');

        return {
            resolve: {
                modules: [path.resolve(cwd, 'src/'), path.resolve(cwd, 'node_modules/')],
            },
        };
    },

    hasResizableSandbox: false,

    sandboxMinWidth: undefined,

    sandboxMaxWidth: undefined,
};
