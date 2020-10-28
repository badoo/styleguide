import React from 'react';
import styled from 'styled-components';

const AppViewBlock = styled.div`
    background: #fff;
    display: grid;
    grid-template-columns: 300px auto;
`;

const AppView = props => {
    const { children } = props;

    return <AppViewBlock {...props}>{children}</AppViewBlock>;
};

export default AppView;
