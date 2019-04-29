import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Names = {
    CLOSE: 'CLOSE',
    FULLSCREEN_OFF: 'FULLSCREEN_OFF',
    FULLSCREEN_ON: 'FULLSCREEN_ON',
    MINIMIZE_OFF: 'MINIMIZE_OFF',
    MINIMIZE_ON: 'MINIMIZE_ON',
};

const mapNameToCode = {
    [Names.CLOSE]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M15 2.41L13.59 1 8 6.59 2.41 1 1 2.41 6.59 8 1 13.59 2.41 15 8 9.41 13.59 15 15 13.59 9.41 8z" />
        </svg>
    ),
    [Names.FULLSCREEN_OFF]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M1 12h3v3h2v-5H1v2zm3-8H1v2h5V1H4v3zm6 11h2v-3h3v-2h-5v5zm2-11V1h-2v5h5V4h-3z" />
        </svg>
    ),
    [Names.FULLSCREEN_ON]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M3 10H1v5h5v-2H3v-3zM1 6h2V3h3V1H1v5zm12 7h-3v2h5v-5h-2v3zM10 1v2h3v3h2V1h-5z" />
        </svg>
    ),
    [Names.MINIMIZE_OFF]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path
                d="M13.444 2H2.556C1.696 2 1 2.696 1 3.556v9.333c0 .859.696 1.555 1.556 1.555h3.11V12.89h-3.11V5.11h10.888v7.778h-3.11v1.555h3.11c.856 0 1.556-.7 1.556-1.555V3.556C15 2.696 14.304 2 13.444 2zM8 6.667l-3.111 3.11h2.333v4.667h1.556V9.778h2.333L8 6.667z" />
        </svg>
    ),
    [Names.MINIMIZE_ON]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path
                d="M13.444 14.444H2.556c-.86 0-1.556-.696-1.556-1.555V3.556C1 2.696 1.696 2 2.556 2h3.11v1.556h-3.11v7.777h10.888V3.556h-3.11V2h3.11C14.3 2 15 2.7 15 3.556v9.333c0 .859-.696 1.555-1.556 1.555zM8 9.778L4.889 6.667h2.333V2h1.556v4.667h2.333L8 9.777z" />
        </svg>
    )
};

class Icon extends PureComponent {
    render() {
        return (
            <div className="styleguide-icon" role="presentation">
                {mapNameToCode[this.props.name]}
            </div>
        );
    }
}

Icon.propTypes = {
    name: PropTypes.oneOf(Object.keys(Names)).isRequired,
};

Icon.Names = Names;

export default Icon;
