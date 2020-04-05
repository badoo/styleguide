const PROVIDER = 'https://placehold.it';

export function getImageUrl(options) {
    const { width = 200, height, color, text } = options;

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
