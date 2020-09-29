import * as React from 'react';

export type StyleguideGroupProps = {
    /**
     * The elements to be inserted in the content block
     */
    children?: React.ReactNode;
    /**
     * Should items take full width of container?
     */
    fullWidthItems?: boolean;
};

declare const StyleguideGroup: React.FunctionComponent<StyleguideGroupProps>;

export default StyleguideGroup;
