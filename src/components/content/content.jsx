import React from 'react';

const Content = props => {
    const { children } = props;

    return <React.Fragment>{children}</React.Fragment>;
};

export default Content;
