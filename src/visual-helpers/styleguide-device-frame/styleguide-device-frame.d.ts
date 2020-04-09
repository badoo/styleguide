import React from 'react';

export type StyleguideDeviceFrameProps = {
    /**
     * The predefined size of frame
     */
    size?: 'SMALL' | 'MEDIUM' | 'LARGE';
    /**
     * The caption, shown upon the rendered component
     */
    legend?: string;
    /**
     * The elements to be inserted in the content block
     */
    children?: React.ReactNode;
};

declare const StyleguideDeviceFrame: React.FunctionComponent<StyleguideDeviceFrameProps>;

export default StyleguideDeviceFrame;
