module.exports = {
    root: true,
    env: {
        es6: true,
        browser: false,
        commonjs: true,
        node: true,
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            globalReturn: false,
            impliedStrict: true,
            jsx: true,
        },
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    rules: {
        'no-console': 0,
    },
    overrides: [
        {
            files: [
                'src/**/*.*',
                'examples/**/*.*'
            ],
            env: {
                browser: true,
                node: false,
            },
            rules: {
                'no-console': 1,
                'react/prop-types': 0,
                'react/no-deprecated': 2,
            },
        },
    ],
};
