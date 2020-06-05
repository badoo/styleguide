const ReactDOMServer = require('react-dom/server');
const InlinedImage = require('./inlined-image/inlined-image').default;

const PROVIDER = 'https://via.placeholder.com';

module.exports = function getImageUrl(options) {
    const { width = 200, height, color, text, inlined = true } = options;

    if (inlined) {
        return ReactDOMServer.renderToString(InlinedImage(options));
    }

    let widthPart = '';
    let heightPart = '';
    let colorPart = '';
    let textPart = '';

    if (width) {
        widthPart = width;
    }

    if (height) {
        heightPart = `x${height}`;
    } else {
        heightPart = `x${width}`;
    }

    if (color) {
        colorPart = `/${color}`;
    }

    if (text) {
        textPart = `?text=${text}`;
    }

    return `${PROVIDER}/${widthPart}${heightPart}${colorPart}${textPart}`;
};
