const postcss = require('postcss');
const cssnext = require('postcss-cssnext');

const browsers = [
    'Chrome >= 35',
    'Firefox >= 40',
    'Safari >= 8',
    'Explorer 11',
    'Edge >= 14',
    'Opera >= 36',
];

const pcssProcessor = postcss([
    cssnext({
        browsers,
        features: {
            colorRgba: false,
            pseudoClassAnyLink: false,
            pseudoElements: false,
            rem: false,
            initial: false,
            filter: false,
            fontVariant: false,
            colorHexAlpha: false,
            colorGray: false,
            colorHwb: false,
            colorRebeccapurple: false,
            customSelectors: false,
            mediaQueriesRange: false,
            customMedia: false,
            nesting: false,
        },
    }),
]);

module.exports = function(content, map, meta) {
    const callback = this.async();

    pcssProcessor.process(content).then(function(result) {
        callback(null, result.css, map, meta);
    });
};
