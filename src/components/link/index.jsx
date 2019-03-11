import React from 'react';

function Link(props) {
    return (
        <a className="styleguide-link" href={props.href}>
            {props.text}
        </a>
    );
}

export default Link;
