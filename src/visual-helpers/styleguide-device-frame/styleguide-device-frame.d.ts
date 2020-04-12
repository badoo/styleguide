import React from 'react';

enum SIZES {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE',
}

export type StyleguideDeviceFrameProps = {
    /**
     * The predefined size of frame
     */
    size?: SIZES;
    /**
     * The caption, shown upon the rendered component
     */
    legend?: string;
    /**
     * The elements to be inserted in the content block
     */
    children?: React.ReactNode;
};

declare const StyleguideDeviceFrame: React.FunctionComponent<StyleguideDeviceFrameProps> & {
    SIZE: typeof SIZES;
};

export default StyleguideDeviceFrame;
