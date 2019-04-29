/* eslint-env node */

module.exports = {
    testPattern: /spec\./,

    getSections() {
        return [
            {
                name: 'UI',
                components: [
                    require('components/component/component'),
                ],
            },
        ];
    },

    getWebpackConfig({ path }) {
        const cwd = path.resolve(__dirname, '.');

        return {
            getComponentRoots() {
                return [
                    path.resolve(cwd, 'src')
                ];
            },

            webpackConfig: {
                resolve: {
                    modules: [
                        path.resolve(cwd, 'src/'),
                        path.resolve(cwd, 'node_modules/'),
                    ],
                },
                module: {
                    rules: [
                        {
                            test: /\.(jpe?g|png|gif)$/i,
                            use: [
                                {
                                    loader: 'file-loader',
                                    options: {
                                        hash: 'sha512',
                                        digest: 'hex',
                                        name: '[hash].[ext]',
                                    },
                                },
                            ],
                        },
                        {
                            test: /\.ttf$/,
                            loader: 'file-loader',
                        },
                    ],
                },
            },
        };
    },
};
