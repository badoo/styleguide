import * as React from 'react';

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
     * The font-size for legend: number , px, vh or any other units
     */
    fontSize?: string | number;
    /**
     * The elements to be inserted in the content block
     */
    children?: React.ReactNode;
    /**
     * To use a real iframe or not
     */
    isIframe?: boolean;
};

declare const StyleguideDeviceFrame: React.FunctionComponent<StyleguideDeviceFrameProps> & {
    SIZE: typeof SIZES;
};

export default StyleguideDeviceFrame;
