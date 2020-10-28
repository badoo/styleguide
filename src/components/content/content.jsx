import React from 'react';
import styled from 'styled-components';

const ContentBlock = styled.main`
    padding: 32px;
    position: relative;
    width: 100%;
    background: #fff;
`;

const Content = props => {
    const { children } = props;

    return <ContentBlock {...props}>{children}</ContentBlock>;
};

export default Content;
