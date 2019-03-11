import React from 'react';

import './index.scss';

class Sidebar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <aside className="styleguide-sidebar">
                <div className="styleguide-sidebar__content">
                    <div className="styleguide-sidebar__header">
                        <div className="styleguide-sidebar__logo">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
                                <rect width="44" height="44" fill="#7000E3" rx="3.9" />
                                <path
                                    fill="#FF671B"
                                    d="M28 11.3c-2.3 0-4.6 1-6 3-1.4-2-3.7-3-6-3-4.3 0-7.8 3.3-7.8 7.6 0 6.5 9.3 15 13.8 15s13.8-8.5 13.8-15c0-4.4-3.5-7.7-7.8-7.7"
                                />
                            </svg>
                        </div>
                    </div>

                    {this.props.children}
                </div>
            </aside>
        );
    }
}

export default Sidebar;
