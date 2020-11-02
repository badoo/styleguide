import React from 'react';
import styled from 'styled-components';

const ContentBlock = styled.main`
    padding: 32px;
    position: relative;
    width: 100%;
    background: #fff;
    transition: transform 0.2s 0.05s cubic-bezier(0.87, 0, 0.13, 1);

    &.is-expanded {
        transform: translateX(-200px);
    }
`;

const Content = props => {
    const { children, isExpanded } = props;

    return <ContentBlock className={isExpanded && 'is-expanded'}>{children}</ContentBlock>;
};

export default Content;
