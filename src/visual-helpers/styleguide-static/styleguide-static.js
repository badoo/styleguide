import ReactDOMServer from 'react-dom/server';
import InlinedImage from './inlined-image/inlined-image';

const PROVIDER = 'https://via.placeholder.com';

export default function getImageUrl(options) {
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
}
