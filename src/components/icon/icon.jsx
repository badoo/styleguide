import React from 'react';
import cx from 'classnames';

import './icon.scss';

export const IconSize = {
    LARGE: 0,
};

const mapSizeToClassname = {
    [IconSize.LARGE]: 'styleguide-icon--lg',
};

export const IconName = {
    CLOSE: 'CLOSE',
    FULLSCREEN_OFF: 'FULLSCREEN_OFF',
    FULLSCREEN_ON: 'FULLSCREEN_ON',
    MINIMIZE_OFF: 'MINIMIZE_OFF',
    MINIMIZE_ON: 'MINIMIZE_ON',
    SEARCH: 'SEARCH',
};

const mapNameToCode = {
    [IconName.CLOSE]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M15 2.41L13.59 1 8 6.59 2.41 1 1 2.41 6.59 8 1 13.59 2.41 15 8 9.41 13.59 15 15 13.59 9.41 8z" />
        </svg>
    ),
    [IconName.FULLSCREEN_OFF]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M1 12h3v3h2v-5H1v2zm3-8H1v2h5V1H4v3zm6 11h2v-3h3v-2h-5v5zm2-11V1h-2v5h5V4h-3z" />
        </svg>
    ),
    [IconName.FULLSCREEN_ON]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M3 10H1v5h5v-2H3v-3zM1 6h2V3h3V1H1v5zm12 7h-3v2h5v-5h-2v3zM10 1v2h3v3h2V1h-5z" />
        </svg>
    ),
    [IconName.MINIMIZE_OFF]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M13.444 2H2.556C1.696 2 1 2.696 1 3.556v9.333c0 .859.696 1.555 1.556 1.555h3.11V12.89h-3.11V5.11h10.888v7.778h-3.11v1.555h3.11c.856 0 1.556-.7 1.556-1.555V3.556C15 2.696 14.304 2 13.444 2zM8 6.667l-3.111 3.11h2.333v4.667h1.556V9.778h2.333L8 6.667z" />
        </svg>
    ),
    [IconName.MINIMIZE_ON]: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d="M13.444 14.444H2.556c-.86 0-1.556-.696-1.556-1.555V3.556C1 2.696 1.696 2 2.556 2h3.11v1.556h-3.11v7.777h10.888V3.556h-3.11V2h3.11C14.3 2 15 2.7 15 3.556v9.333c0 .859-.696 1.555-1.556 1.555zM8 9.778L4.889 6.667h2.333V2h1.556v4.667h2.333L8 9.777z" />
        </svg>
    ),
    [IconName.SEARCH]: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path
                d="M20.5 20.92l7.62 7.67-1.43 1.4-7.72-7.79A10.83 10.83 0 0 1 2 13.28v-.45a10.84 10.84 0 0 1 21.67 0v.45c0 2.98-1.21 5.68-3.16 7.64zM4 12.82v.46a8.83 8.83 0 0 0 17.67 0v-.45a8.83 8.83 0 0 0-17.67 0z"
                fillRule="evenodd"
            />
        </svg>
    ),
};

const Icon = props => {
    const { name, size } = props;

    const classnames = cx(
        { 'styleguide-icon': true },
        typeof size !== 'undefined' && mapSizeToClassname[size]
    );

    return (
        <div className={classnames} role="presentation">
            {mapNameToCode[name]}
        </div>
    );
};

export default Icon;
