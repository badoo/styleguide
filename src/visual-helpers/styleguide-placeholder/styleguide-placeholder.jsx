import * as React from 'react';
import PropTypes from 'prop-types';
import View from '../styleguide-view';
import Text from '../styleguide-text';

const propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    placeholder: PropTypes.string,
};

function StyleguidePlaceholder(props) {
    const { width, height, backgroundColor, color, placeholder } = props;

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
                    fontSize: 8,
                    fontFamily: 'monospace',
                    color: color || '#777',
                }}
                ellipsizeMode={'middle'}
                numberOfLines={1}
            >
                {placeholderText}
            </Text>
        </View>
    );
}

StyleguidePlaceholder.propTypes = propTypes;

export default StyleguidePlaceholder;
