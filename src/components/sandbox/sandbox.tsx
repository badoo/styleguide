import React from 'react';
import cx from 'classnames';

import config from '__GLOBAL__CONFIG__';

import './sandbox.scss';

import Dialog from 'components/dialog/dialog';
import ErrorBoundary from 'components/error-boundary/error-boundary';
import Icon, { IconName } from 'components/icon/icon';

interface SandboxProps {
    name: string;
    title?: string;
    children?: React.ReactNode;
}

interface SandboxState {
    isFullScreen?: boolean;
    isVisible?: boolean;
}

export default class Sandbox extends React.Component<SandboxProps, SandboxState> {
    constructor(props: SandboxProps) {
        super(props);

        this.state = {
            isFullScreen: false,
            isVisible: true,
        };
    }

    onHeaderClickHandler = () => {
        this.setState({ isVisible: !this.state.isVisible });
    };

    onToggleVisibilityClickHandler = (event: React.MouseEvent) => {
        event.stopPropagation();
        this.setState({ isVisible: !this.state.isVisible });
    };

    onToggleFullScreenClickHandler = (event: React.MouseEvent) => {
        event.stopPropagation();
        this.setState({ isFullScreen: !this.state.isFullScreen });
    };

    render() {
        const { name, title, children } = this.props;

        const controlVisibilityIcon = this.state.isVisible ? (
            <Icon name={IconName.MINIMIZE_OFF} />
        ) : (
            <Icon name={IconName.MINIMIZE_ON} />
        );

        const controlFullScreenIcon = this.state.isFullScreen ? (
            <Icon name={IconName.FULLSCREEN_ON} />
        ) : (
            <Icon name={IconName.FULLSCREEN_OFF} />
        );

        return (
            <section className="styleguide-sandbox" data-vrt-locator={'sandbox'} data-name={name}>
                <header className="styleguide-sandbox__header" onClick={this.onHeaderClickHandler}>
                    <h1 className="styleguide-sandbox__title">{title}</h1>
                    <div className="styleguide-sandbox__controls">
                        <span
                            className="styleguide-sandbox__control"
                            onClick={this.onToggleVisibilityClickHandler}
                        >
                            {controlVisibilityIcon}
                        </span>

                        <span
                            className="styleguide-sandbox__control"
                            onClick={this.onToggleFullScreenClickHandler}
                        >
                            {controlFullScreenIcon}
                        </span>
                    </div>
                </header>

                <div data-vrt-locator={'sandbox-content'}>
                    <ErrorBoundary>
                        {this.state.isVisible && (
                            <div
                                className={cx({
                                    'styleguide-sandbox__content': true,
                                    'is-resizable': config.hasResizableSandbox
                                        ? config.hasResizableSandbox
                                        : false,
                                })}
                            >
                                {children}
                            </div>
                        )}

                        <Dialog
                            isOpened={this.state.isFullScreen}
                            onClose={() => this.setState({ isFullScreen: false })}
                            title={title}
                            content={children}
                        />
                    </ErrorBoundary>
                </div>
            </section>
        );
    }
}
