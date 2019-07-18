/* eslint-env node */

module.exports = {
    getSections() {
        return [
            {
                name: 'UI',
                components: [
                    require('components/component/component'),
                    require('components/error-boundary/error-boundary'),
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
