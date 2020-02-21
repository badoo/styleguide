module.exports = function getBabelOptions({ isReactNative, getBabelConfig }) {
    let babelOverrides = {
        compact: false,
        minified: false,
        cacheDirectory: true,
    };

    if (getBabelConfig) {
        const babelConfig = getBabelConfig({ path });

        if (!babelConfig.plugins) {
            babelConfig.plugins = [];
        }

        babelConfig.plugins.unshift(require.resolve('react-hot-loader/babel'));

        return Object.assign({}, babelConfig, babelOverrides);
    }

    // @TODO - rethink this, should clients always pass their babel config? Or should we auto-detect it?
    if (isReactNative) {
        return Object.assign(
            {
                babelrc: false,
                presets: [require.resolve('metro-react-native-babel-preset')],
                plugins: [require.resolve('react-hot-loader/babel')],
            },
            babelOverrides
        );
    }

    // @TODO - rethink this, should clients always pass their babel config? Or should we auto-detect it?
    return Object.assign(
        {
            babelrc: false,
            presets: [
                [
                    require.resolve('@babel/preset-env'),
                    {
                        targets: {
                            ie: 11,
                        },
                    },
                ],
                [
                    require.resolve('@babel/preset-react'),
                    {
                        development: true,
                    },
                ],
                [
                    '@babel/preset-typescript',
                    {
                        isTSX: true,
                        allExtensions: true,
                    },
                ],
            ],
            plugins: [
                require.resolve('react-hot-loader/babel'),

                // Needed to have parity with TS class properties
                '@babel/plugin-proposal-class-properties',

                // Allow experimental rest spread syntax
                [
                    '@babel/plugin-proposal-object-rest-spread',
                    {
                        useBuiltIns: true,
                    },
                ],
            ],
        },
        babelOverrides
    );
};
