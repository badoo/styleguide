/* eslint-env node */

module.exports = {
    getSections() {
        return [
            {
                name: 'Examples',
                components: [
                    // require('examples/my-typescript-component/my-typescript-component'),
                    require('examples/my-javascript-component/my-javascript-component'),
                ]
            },
            {
                name: 'UI',
                components: [
                    require('components/component/component'),
                ],
            },
        ];
    },

    getComponentRoots({ path }) {
        const cwd = path.resolve(__dirname, '.');

        return [
            path.resolve(cwd, 'src'),
            path.resolve(cwd, 'examples'),
        ];
    },

    getWebpackConfig({ path }) {
        const cwd = path.resolve(__dirname, '.');

        return {
            resolve: {
                modules: [
                    path.resolve(cwd, 'src/'),
                    path.resolve(cwd, 'node_modules/'),
                ],
            },
        };
    },
};
