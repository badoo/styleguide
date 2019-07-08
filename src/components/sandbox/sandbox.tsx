import React from 'react';
import cx from 'classnames';

import Icon, { IconNames } from '../icon/icon';
import Dialog from '../dialog/dialog';
import ErrorBoundary from '../error-boundary/error-boundary';

import config from '__GLOBAL__CONFIG__';


import './sandbox.scss';

interface SandboxProps {
    name?: React.ReactNode;
    title?: React.ReactNode;
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

    render() {
        const {
            name,
            title,
            children
        } = this.props;

        const onHeaderClickHandler = () => {
            this.setState({ isVisible: !this.state.isVisible });
        };

        const onToggleVisibilityClickHandler = (event: React.MouseEvent) => {
            event.stopPropagation();
            this.setState({ isVisible: !this.state.isVisible });
        }

        const onToggleFullScreenClickHandler = (event: React.MouseEvent) => {
            event.stopPropagation();
            this.setState({ isFullScreen: !this.state.isFullScreen });
        }

        const controlVisibilityIcon = (this.state.isVisible) ? (
            <Icon name={IconNames.MINIMIZE_OFF} />
        ) : (
            <Icon name={IconNames.MINIMIZE_ON} />
        );

        const controlFullScreenIcon = (this.state.isFullScreen) ? (
            <Icon name={IconNames.FULLSCREEN_ON} />
        ) : (
            <Icon name={IconNames.FULLSCREEN_OFF} />
        );

        return (
            <section
                className="styleguide-sandbox js-styleguide-sandbox"
                data-name={name}
            >
                <header
                    className="styleguide-sandbox__header"
                    onClick={onHeaderClickHandler}
                >
                    <h1 className="styleguide-sandbox__title">{title}</h1>
                    <div className="styleguide-sandbox__controls">
                        <span
                            className="styleguide-sandbox__control"
                            onClick={onToggleVisibilityClickHandler}
                        >
                            {controlVisibilityIcon}
                        </span>

                        <span
                            className="styleguide-sandbox__control"
                            onClick={onToggleFullScreenClickHandler}
                        >
                            {controlFullScreenIcon}
                        </span>
                    </div>
                </header>

                <ErrorBoundary>
                    {this.state.isVisible && (
                        <div
                            className={cx({
                                'styleguide-sandbox__content': true,
                                'js-styleguide-sandbox__content': true,
                                'is-resizable': (config.hasResizableSandbox) ? config.hasResizableSandbox: false,
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
            </section>
        );
    }
}
