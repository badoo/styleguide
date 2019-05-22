import React from 'react';
import classNames from 'classnames';
import Icon from 'components/icon/icon';

import './navigation.scss';

class NavigationSection extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: props.isOpened,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isOpened !== prevProps.isOpened || this.props.isOpened) {
            this.setState({
                isOpened: this.props.isOpened
            });
        }
    }

    render() {
        return (
            <div className="styleguide-navigation__section">
                <div
                    className={'styleguide-navigation__name'}
                    onClick={() => this.setState(prevState => ({ isOpened: !prevState.isOpened }))}
                >
                    {this.props.name}
                </div>
                {(this.state.isOpened) && (
                    <div className="styleguide-navigation__components">
                        {this.props.links.map((link, index) => (
                            <div className="styleguide-navigation__item" key={link.url || index}>
                                <a
                                    href={`#${link.url}`}
                                    className={classNames({
                                        'styleguide-navigation__link': true,
                                        'is-active': link.isActive
                                    })}
                                >
                                    {link.name}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

NavigationSection.propTypes = {};

export default NavigationSection;
