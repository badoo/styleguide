import React from 'react';
import PropTypes from 'prop-types';
import StyleguideGroup from './styleguide-group';
import StyleguideCell from './styleguide-cell';

const propTypes = {
    children: PropTypes.node,
};

function StyleguideDeviceRange(props) {
    const { children } = props;

    return (
        <StyleguideGroup>
            <StyleguideCell width={375} height={812} border={true} legend={'iPhone X'}>
                {children}
            </StyleguideCell>
            <StyleguideCell width={414} height={736} border={true} legend={'iPhone 6/7/8 Plus'}>
                {children}
            </StyleguideCell>
            <StyleguideCell width={375} height={667} border={true} legend={'iPhone 6/7/8'}>
                {children}
            </StyleguideCell>
            <StyleguideCell width={320} height={568} border={true} legend={'iPhone 5s'}>
                {children}
            </StyleguideCell>
        </StyleguideGroup>
    );
}

StyleguideDeviceRange.propTypes = propTypes;

export default StyleguideDeviceRange;
