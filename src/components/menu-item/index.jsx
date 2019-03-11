import React, { Component } from 'react';
import classNames from 'classnames';
import Link from '../link';
import './index.scss';

export default class MenuItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: this.props.isOpened,
        };
    }

    hideMenu() {
        this.setState({
            isOpened: !this.state.isOpened,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.state.isOpened !== nextProps.isOpened
            ? this.setState({ isOpened: nextProps.isOpened })
            : null;
    }

    render() {
        const classnames = {
            block: classNames({
                'styleguide-menu-item': true,
                'is-opened': this.state.isOpened,
                'is-active': this.props.isActive,
            }),
        };

        return (
            <li className={classnames.block}>
                {this.props.children ? (
                    <div
                        className="styleguide-menu-item__title"
                        onClick={this.props.children ? this.hideMenu.bind(this) : null}
                    >
                        {this.props.title}

                        <div className="styleguide-menu-item__icon">
                            <i className="icon">
                                <svg className="icon-svg" viewBox="0 0 16 16">
                                    <path
                                        d="M10.347768,8.94361467 L5.84776801,13.4436147 C5.44964771,13.7422049 4.89255319,13.7026134 4.54066123,13.3507215 C4.18876927,12.9988295 4.14917778,12.441735 4.44776801,12.0436147 L8.23776801,8.24361467 L4.43776801,4.44361467 C4.10060276,4.04446877 4.12755264,3.45303672 4.49962117,3.08620859 C4.8716897,2.71938047 5.4634445,2.70082198 5.85776801,3.04361467 L10.357768,7.54361467 C10.7389109,7.93245818 10.7389109,8.55477116 10.357768,8.94361467 L10.347768,8.94361467 Z"
                                        id="Shape"
                                        transform="translate(7.422658, 8.220968) rotate(90.000000) translate(-7.422658, -8.220968) "
                                    />
                                </svg>
                            </i>
                        </div>
                    </div>
                ) : (
                    <Link href={`#${this.props.url}`} text={this.props.title} />
                )}

                {this.props.children ? (
                    <div className="styleguide-menu-item__content" hidden={!this.state.isOpened}>
                        {this.props.children}
                    </div>
                ) : null}
            </li>
        );
    }
}
