import * as React from 'react';

export type StyleguideDeviceRangeProps = {
    /**
     * The font-size for caption of all devices in range: number , px, vh or any other units
     */
    fontSize?: string | number;
    /**
     * The elements to be inserted in the content block
     */
    children?: React.ReactNode;
};

declare const StyleguideDeviceRange: React.FunctionComponent<StyleguideDeviceRangeProps>;

export default StyleguideDeviceRange;
