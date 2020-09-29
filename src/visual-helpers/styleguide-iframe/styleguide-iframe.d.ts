import * as React from 'react';

export type StyleguideIFrameProps = {
    /**
     * The elements to be inserted in the content block
     */
    children: React.ReactNode;
    /**
     * Styles tags, which want to pass in iframe. By default we take all styles from the app
     */
    styleList?: React.ReactNode[];
    /**
     * Each iframe should have unique title
     */
    title?: string;
};

/**
 * for fallback purposes we support properties of React.IframeHTMLAttributes<HTMLIFrameElement> too
 */
declare const StyleguideIFrame: React.FunctionComponent<StyleguideIFrameProps> &
    React.IframeHTMLAttributes<HTMLIFrameElement>;

export default StyleguideIFrame;
