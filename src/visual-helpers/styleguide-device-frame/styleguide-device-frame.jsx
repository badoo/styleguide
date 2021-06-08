import * as React from 'react';
import PropTypes from 'prop-types';
import StyleguideCell from '../styleguide-cell/styleguide-cell';
import StyleguideCellResponsive from '../styleguide-cell/styleguide-cell-responsive';
import StyleguideFrame from '../styleguide-iframe/styleguide-iframe';

import config from '__GLOBAL__CONFIG__';

const SIZES = {
    SMALL: 'SMALL',
    MEDIUM: 'MEDIUM',
    LARGE: 'LARGE',
};

const MapSizeToDimensions = {
    [SIZES.SMALL]: { width: 320, height: 568 },
    [SIZES.MEDIUM]: { width: 375, height: 667 },
    [SIZES.LARGE]: { width: 414, height: 736 },
};

const propTypes = {
    children: PropTypes.node,
    size: PropTypes.oneOf(Object.keys(SIZES)),
    legend: PropTypes.string,
    fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isIframe: PropTypes.bool,
    isResponsive: PropTypes.bool,
};

function StyleguideDeviceFrame(props) {
    const { children, size, legend, fontSize, isIframe, isResponsive } = props;
    const Wrapper = isIframe || config.setDeviceFramesAsIframes ? StyleguideFrame : React.Fragment;

    return (
        <React.Fragment>
            {!isResponsive ? (
                <StyleguideCell
                    {...MapSizeToDimensions[size]}
                    border={true}
                    legend={legend}
                    fontSize={fontSize}
                >
                    <Wrapper>{children}</Wrapper>
                </StyleguideCell>
            ) : (
                <StyleguideCellResponsive
                    {...MapSizeToDimensions[size]}
                    border={true}
                    legend={legend}
                    fontSize={fontSize}
                >
                    <Wrapper>{children}</Wrapper>
                </StyleguideCellResponsive>
            )}
        </React.Fragment>
    );
}

StyleguideDeviceFrame.propTypes = propTypes;
StyleguideDeviceFrame.SIZE = SIZES;

export default StyleguideDeviceFrame;
