import React from 'react';

import config from '__GLOBAL__CONFIG__';
import Icon from '../icon/icon';
import Dialog from '../dialog/dialog';
import ErrorBoundary from '../error-boundary/error-boundary';

import './sandbox.scss';

export default class Sandbox extends React.Component {
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
                                <Icon name={Icon.Names.MINIMIZE_OFF} />
                            ) : (
                                <Icon name={Icon.Names.MINIMIZE_ON} />
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
                                <Icon name={Icon.Names.FULLSCREEN_ON} />
                            ) : (
                                <Icon name={Icon.Names.FULLSCREEN_OFF} />
                            )}
                        </span>
                    </div>
                </header>

                <ErrorBoundary>
                    {this.state.isVisible && (
                        <div
                            className="styleguide-sandbox__content js-styleguide-sandbox__content"
                            style={{ resize: config.hasResizableSandbox ? 'both' : 'none'}}
                        >
                            {this.props.children}
                        </div>
                    )}

                    <Dialog
                        isOpened={this.state.isFullScreen}
                        onClose={() => this.setState({ isFullScreen: false })}
                        title={this.props.title}
                        content={this.props.children}
                    />
                </ErrorBoundary>
            </section>
        );
    }
}
