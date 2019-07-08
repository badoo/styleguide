import React from 'react';

import './content.scss';

interface ContentProps {
    children: React.ReactNode;
};

const Content: React.FunctionComponent<ContentProps> = (props) => {
    const {
        children
    } = props;

    return (<main className="styleguide-content">{children}</main>);
}

export default Content;
