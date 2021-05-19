import * as React from 'react';
import PropTypes from 'prop-types';
import View from '../styleguide-view';
import Text from '../styleguide-text';
import config from '__GLOBAL__CONFIG__';

const propTypes = {
    width: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    placeholder: PropTypes.string,
};

function StyleguidePlaceholder(props) {
    const {
        width,
        height,
        backgroundColor,
        color,
        fontSize = config.placeholderFontSize ? config.placeholderFontSize : 8,
        placeholder,
    } = props;

    const placeholderText = placeholder || 'placeholder';

    return (
        <View
            style={{
                width: width || '100%',
                height: height || '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: backgroundColor || '#fefefe',
            }}
        >
            <Text
                style={{
                    fontSize,
                    fontFamily: 'monospace',
                    color: color || '#777',
                }}
            >
                {placeholderText}
            </Text>
        </View>
    );
}

StyleguidePlaceholder.propTypes = propTypes;

export default StyleguidePlaceholder;
