import PropTypes from 'prop-types';

const propTypes = {
    text: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    fontFamily: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    textColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dominantBaseline: PropTypes.oneOf([
        'auto',
        'text-bottom',
        'alphabetic',
        'ideographic',
        'middle',
        'central',
        'mathematical',
        'hanging',
        'text-top',
    ]),
    textAnchor: PropTypes.oneOf(['start', 'middle', 'end', 'inherit']),
};

function InlinedImage(props) {
    const {
        width = 200,
        height = 180,
        color = 'ccc',
        text = '',
        fontFamily = 'Arial, Tahoma',
        textColor = '969696',
        fontSize = 16,
        fontWeight = 300,
        letterSpacing = 1,
        dominantBaseline = 'middle',
        textAnchor = 'middle',
    } = props;

    const placeholderText = text ? text : `${width} x ${height}`;

    const svgSource = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <path d="m0 0h${width}v${height}h-${width}z" fill="#${color}" fill-rule="evenodd"/>
        <text
            x="50%"
            y="50%"
            fill="#${textColor}"
            font-family="${fontFamily}"
            font-size="${fontSize}"
            font-weight="${fontWeight}"
            letter-spacing="${letterSpacing}"
            dominant-baseline="${dominantBaseline}"
            text-anchor="${textAnchor}"
        >${placeholderText}</text>
    </svg>
    `;

    const inlinedbase64ImageSrc = window.btoa(svgSource);

    return `data:image/svg+xml;base64,${inlinedbase64ImageSrc}`;
}

InlinedImage.propTypes = propTypes;

export default InlinedImage;
