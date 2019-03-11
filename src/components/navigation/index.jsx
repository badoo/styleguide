import React from 'react';
import './index.scss';

import Menu from '../menu';

function Navigation(props) {
    const { list, currentUrl } = props;

    return (
        <nav className="styleguide-navigation">
            {list.length ? (
                <Menu list={list} currentUrl={currentUrl} />
            ) : (
                <div className="styleguide-navigation__error">
                    Nothing found. Try to update your search query
                </div>
            )}
        </nav>
    );
}

export default Navigation;
