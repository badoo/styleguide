import React from 'react';
import styled from 'styled-components';

const AppViewBlock = styled.div`
    background: #fff;
    display: grid;
    grid-template-columns: 300px auto;

    @media screen and (max-width: 375px) {
        grid-template-columns: minmax(0, 100vw);
    }
`;

const AppView = props => {
    const { children } = props;

    return <AppViewBlock>{children}</AppViewBlock>;
};

export default AppView;
