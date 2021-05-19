import * as React from 'react';
import PropTypes from 'prop-types';
import View from '../styleguide-view';
import Text from '../styleguide-text';
import config from '__GLOBAL__CONFIG__';

const Platform = {
    OS: 'web',
};

const propTypes = {
    legend: PropTypes.string,
    fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    backgroundColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    border: PropTypes.bool,
    children: PropTypes.node,
    isVirtualElement: PropTypes.bool,
};

function StyleguideCell(props) {
    const {
        legend,
        backgroundColor,
        width,
        height,
        border,
        fontSize = config.legendFontSize ? config.legendFontSize : 10,
        children,
        isVirtualElement,
    } = props;

    return (
        <View isVirtualElement={!legend || isVirtualElement}>
            {legend ? (
                <Text
                    style={{
                        width,
                        margin: 0,
                        marginBottom: 10,
                        fontSize,
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
