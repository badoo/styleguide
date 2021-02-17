module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        [
            require.resolve('@babel/preset-react'),
            {
                development: true,
            },
        ],
    ],
    plugins: [
        [
            require.resolve('babel-plugin-styled-components'),
            {
                displayName: true,
            },
        ],
    ],
};
