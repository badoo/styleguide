import * as React from 'react';
import PropTypes from 'prop-types';
import StyleguideGroup from '../styleguide-group/styleguide-group';
import StyleguideCell from '../styleguide-cell/styleguide-cell';

const propTypes = {
    children: PropTypes.node,
    fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

function StyleguideDeviceRange(props) {
    const { children, fontSize } = props;

    return (
        <StyleguideGroup>
            <StyleguideCell
                fontSize={fontSize}
                width={375}
                height={812}
                border={true}
                legend={'iPhone X'}
            >
                {children}
            </StyleguideCell>
            <StyleguideCell
                fontSize={fontSize}
                width={414}
                height={736}
                border={true}
                legend={'iPhone 6/7/8 Plus'}
            >
                {children}
            </StyleguideCell>
            <StyleguideCell
                fontSize={fontSize}
                width={375}
                height={667}
                border={true}
                legend={'iPhone 6/7/8'}
            >
                {children}
            </StyleguideCell>
            <StyleguideCell
                fontSize={fontSize}
                width={320}
                height={568}
                border={true}
                legend={'iPhone 5s'}
            >
                {children}
            </StyleguideCell>
        </StyleguideGroup>
    );
}

StyleguideDeviceRange.propTypes = propTypes;

export default StyleguideDeviceRange;
