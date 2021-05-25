import * as React from 'react';

export type StyleguideCellProps = {
    /**
     * The caption, shown upon the rendered component
     */
    legend?: string;
    /**
     * The font-size for caption: number , px, vh or any other units
     */
    fontSize?: string | number;
    /**
     * Background-color for component
     */
    backgroundColor?: string;
    /**
     * Width of cell for component's render
     */
    width?: number;
    /**
     * height of cell for component's render
     */
    height?: string | number;
    /**
     * If set to true - show visual border
     */
    border?: boolean;
    /**
     * The elements to be inserted in the content block
     */
    children?: React.ReactNode;
    /**
     * The elements to be inserted in the content block
     */
    isVirtualElement?: boolean;
};

declare const StyleguideCell: React.FunctionComponent<StyleguideCellProps>;

export default StyleguideCell;
