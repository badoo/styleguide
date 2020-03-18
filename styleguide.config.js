/* eslint-env node */

module.exports = {
    getSectionComponents({ path }) {
        return [
            {
                components: [path.resolve('src/components/component/component')],
            },
            {
                components: [path.resolve('src/components/error-boundary/error-boundary')],
            },
        ];
    },

    getExceptionForLoaders() {
        return {
            jsLoader: [/spec\.jsx$/],
        };
    },

    getSections() {
        return [
            {
                name: 'Structure',
                components: [require('components/component/component')],
            },
            {
                name: 'Components',
                components: [require('components/error-boundary/error-boundary')],
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
