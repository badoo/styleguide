/* eslint-env node */

module.exports = {
    getSections() {
        return [
            {
                name: 'Examples',
                components: [require('my-typescript-component/my-typescript-component')],
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
                modules: [path.resolve(cwd, 'src'), path.resolve(cwd, 'node_modules/')],
            },
        };
    },
};
