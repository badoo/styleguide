import * as React from 'react';
import PropTypes from 'prop-types';
import View from '../styleguide-view';
import Text from '../styleguide-text';

const Platform = {
    OS: 'web',
};

const propTypes = {
    legend: PropTypes.string,
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    border: PropTypes.bool,
    children: PropTypes.node,
};

function StyleguideCell(props) {
    const { legend, backgroundColor, width, height, border, children } = props;

    return (
        <View>
            {legend ? (
                <Text
                    style={{
                        width,
                        margin: 0,
                        marginBottom: 10,
                        fontSize: 10,
                        fontFamily: 'monospace',
                    }}
                >
                    {legend}
                </Text>
            ) : null}

            <View
                style={{
                    position: 'relative',
                    backgroundColor: backgroundColor || 'transparent',
                    width,
                    height,
                    borderWidth: border ? 1 : 0,
                    borderColor: '#aaa',
                    borderStyle: 'solid',
                    overflow: 'auto',
                    transform:
                        Platform.OS === 'web' ? 'translate3d(0, 0, 0)' : [{ translateZ: '0' }],
                }}
            >
                {children}
            </View>
        </View>
    );
}

StyleguideCell.propTypes = propTypes;

export default StyleguideCell;
