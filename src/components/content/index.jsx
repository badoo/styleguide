import React from 'react';

import './index.scss';

class Content extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <main className="styleguide-content">{this.props.children}</main>;
    }
}

export default Content;
