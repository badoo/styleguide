import * as React from 'react';

const View = (props) => {
    const { isVirtualElement, ...realProps } = props;

    if (isVirtualElement) {
        return <React.Fragment {...realProps} />;
    }

    return <div {...realProps} />;
};

export default View;
