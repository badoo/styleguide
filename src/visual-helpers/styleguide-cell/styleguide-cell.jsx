import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import View from '../styleguide-view';
import Text from '../styleguide-text';
import { deviceSizes } from '../../utilities';

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

const StyledView = styled(View)`
    display: grid;
    max-width: ${props => props.size.width}px;

    @media (min-width: ${deviceSizes.phone}px) and (max-width: ${deviceSizes.phoneLg}px) {
        max-width: 100vw;
    }

    & > * {
        grid-area: 1 / 1 / 2 / 2;
    }
`;

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

StyleguideCell.propTypes = propTypes;

export default StyleguideCell;
