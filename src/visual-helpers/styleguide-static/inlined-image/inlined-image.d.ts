import * as React from 'react';

export type InlinedImageProps = {
    text?: string;
    width?: number | string;
    height?: number | string;
    color?: number | string;
    fontFamily?: number | string;
    fontSize?: number | string;
    fontWeight?: number | string;
    textColor?: number | string;
    letterSpacing?: number | string;
    dominantBaseline?: 'auto';
    'text-bottom';
    alphabetic;
    ideographic;
    middle;
    central;
    mathematical;
    hanging;
    'text-top';
    textAnchor?: 'start';
    middle;
    end;
    inherit;
};

declare const InlinedImage: React.FunctionComponent<InlinedImageProps>;

export default InlinedImage;
