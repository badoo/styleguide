import React, { Component } from 'react';
import './index.scss';

import Icon from '../icon';
import IconFullScreenOn from './icon-fullscreen-on.svg';
import IconFullScreenOff from './icon-fullscreen-off.svg';
import IconMinimizeOn from './icon-minimize-on.svg';
import IconMinimizeOff from './icon-minimize-off.svg';
import Dialog from '../dialog';

export default class Sandbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFullScreen: false,
            isVisible: true,
        };
    }

    render() {
        return (
            <section
                className="styleguide-sandbox js-styleguide-sandbox"
                data-name={this.props.name}
            >
                <header
                    className="styleguide-sandbox__header"
                    onClick={() => {
                        this.setState({ isVisible: !this.state.isVisible });
                    }}
                >
                    <h1 className="styleguide-sandbox__title">{this.props.title}</h1>
                    <div className="styleguide-sandbox__controls">
                        <span
                            className="styleguide-sandbox__control"
                            onClick={e => {
                                e.stopPropagation();
                                this.setState({ isVisible: !this.state.isVisible });
                            }}
                        >
                            {this.isVisible ? (
                                <Icon src={<IconMinimizeOff />} />
                            ) : (
                                <Icon src={<IconMinimizeOn />} />
                            )}
                        </span>

                        <span
                            className="styleguide-sandbox__control"
                            onClick={e => {
                                e.stopPropagation();
                                this.setState({ isFullScreen: !this.state.isFullScreen });
                            }}
                        >
                            {this.state.isFullScreen ? (
                                <Icon src={<IconFullScreenOn />} />
                            ) : (
                                <Icon src={<IconFullScreenOff />} />
                            )}
                        </span>
                    </div>
                </header>

                {this.state.isVisible && (
                    <div className="styleguide-sandbox__content js-styleguide-sandbox__content">
                        {this.props.children}
                    </div>
                )}

                <Dialog
                    isOpened={this.state.isFullScreen}
                    onClose={() => this.setState({ isFullScreen: false })}
                    title={this.props.title}
                    content={this.props.children}
                />
            </section>
        );
    }
}
