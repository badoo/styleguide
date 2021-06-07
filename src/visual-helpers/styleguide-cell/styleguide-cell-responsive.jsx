import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import View from '../styleguide-view';
import Text from '../styleguide-text';
import { deviceSizes } from '../../utilities';
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

const StyledView = styled(View)`
    display: grid;
    max-width: ${(props) => props.size.width}px;

    @media (min-width: ${deviceSizes.phone}px) and (max-width: ${deviceSizes.phoneLg}px) {
        max-width: 100vw;
    }

    & > * {
        grid-area: 1 / 1 / 2 / 2;
    }
`;

function StyleguideCellResponsive(props) {
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

            <StyledView
                size={{ width, height }}
                style={{
                    position: 'relative',
                    backgroundColor: backgroundColor || 'transparent',
                    borderWidth: border ? 1 : 0,
                    borderColor: '#aaa',
                    borderStyle: 'solid',
                    transform:
                        Platform.OS === 'web' ? 'translate3d(0, 0, 0)' : [{ translateZ: '0' }],
                }}
            >
                <svg viewBox={`0 0 ${width} ${height}`} />

                {children}
            </StyledView>
        </View>
    );
}

StyleguideCellResponsive.propTypes = propTypes;

export default StyleguideCellResponsive;
