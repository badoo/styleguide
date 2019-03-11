const rtlCss = require('./rtl-css/lib');
const rtlCssConfig = require('./rtl-css-config.json');

module.exports = function(content) {
    return rtlCss.processCss(rtlCss.processConfig(rtlCssConfig), 'ltr', content);
};
