import React, { Component } from 'react';
import classNames from 'classnames';
import MenuItem from '../menu-item';
import './index.scss';

class Menu extends Component {
    constructor() {
        super();
    }

    render() {
        const classnames = {
            block: classNames({
                'styleguide-menu': true,
                'styleguide-menu--sub': this.props.sub,
            }),
        };

        return (
            <ul className={classnames.block}>
                {this.props.list.map((item, key) => (
                    <MenuItem
                        title={item.name}
                        key={key}
                        url={item.url}
                        isActive={item.url ? item.url === this.props.currentUrl : false}
                        isOpened={item.isOpened}
                    >
                        {item.components ? (
                            <Menu
                                list={item.components}
                                sub={true}
                                currentUrl={this.props.currentUrl}
                            />
                        ) : null}
                    </MenuItem>
                ))}
            </ul>
        );
    }
}

export default Menu;
