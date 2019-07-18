import React from 'react';

import './content.scss';

const Content = props => {
    const { children } = props;

    return <main className="styleguide-content">{children}</main>;
};

export default Content;
