import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

const IframeWrapper = styled.div`
    position: relative;
    display: block;
    height: 100%;
`;
const IframeBlock = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
`;

const propTypes = {
    children: PropTypes.node,
    styleList: PropTypes.arrayOf(PropTypes.node),
    title: PropTypes.string,
};

const StyleguideIFrame = React.memo(
    ({
        children,
        title = `iframe-${Date.now()}`,
        styleList = [...document.querySelectorAll('style')],
        ...props
    }) => {
        const [contentRef, setContentRef] = useState(null);
        const mountNode = contentRef && contentRef.contentWindow.document.body;

        useEffect(() => {
            if (contentRef && styleList) {
                styleList.map(style => {
                    const iframeNewStyleElement = style.cloneNode(true);

                    contentRef.contentWindow.document.head.appendChild(iframeNewStyleElement);
                });
            }
        });

        return (
            <IframeWrapper>
                <IframeBlock {...props} title={title} ref={setContentRef}>
                    {mountNode && createPortal(React.Children.only(children), mountNode)}
                </IframeBlock>
            </IframeWrapper>
        );
    }
);

StyleguideIFrame.displayName = 'Frame';
StyleguideIFrame.propTypes = propTypes;

export default StyleguideIFrame;
