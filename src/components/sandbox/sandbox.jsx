import React from 'react';
import styled from 'styled-components';
import config from '__GLOBAL__CONFIG__';
import Dialog from '../dialog/dialog';
import ErrorBoundary from '../error-boundary/error-boundary';
import Icon, { IconName } from '../icon/icon';

const SandboxBlock = styled.section`
    display: block;
`;

const SandboxHeader = styled.header`
    display: flex;
    user-select: none;
    cursor: pointer;
    background: #f0f0f0;
    border-radius: 4px 4px 0 0;
    color: #000;
    padding: 0 16px;

    .styleguide-sandbox &:only-child {
        border-radius: 4px;
    }
`;

const SandboxTitle = styled.h1`
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    font-family: sans-serif;
    padding: 16px 0;
    word-break: break-word;
`;

const SandboxControls = styled.div`
    margin-left: auto;
    display: flex;
`;

const SandboxControl = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #202020;
    opacity: 0.5;
    transition: opacity 0.1s ease;
    padding: 0 8px;

    &:hover {
        opacity: 1;
    }
`;

const SandboxContent = styled.div`
    padding: 20px;
    border: 1px solid #f0f0f0;
    border-top: 0;
    box-shadow: 0 -1px 0 0 #f0f0f0;
    transform: translate3d(0, 0, 0);
    overflow: ${config.hasResizableSandbox ? 'auto' : undefined};
    resize: ${config.hasResizableSandbox ? 'both' : undefined};
`;

class Sandbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFullScreen: false,
            isVisible: true,
        };

        this.onHeaderClickHandler = this.onHeaderClickHandler.bind(this);
        this.onToggleVisibilityClickHandler = this.onToggleVisibilityClickHandler.bind(this);
        this.onToggleFullScreenClickHandler = this.onToggleFullScreenClickHandler.bind(this);
    }

    onHeaderClickHandler() {
        this.setState({ isVisible: !this.state.isVisible });
    }

    onToggleVisibilityClickHandler(event) {
        event.stopPropagation();
        this.setState({ isVisible: !this.state.isVisible });
    }

    onToggleFullScreenClickHandler(event) {
        event.stopPropagation();
        this.setState({ isFullScreen: !this.state.isFullScreen });
    }

    render() {
        const { title, children } = this.props;

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
            <SandboxBlock data-vrt-locator={'sandbox'} data-name={title || 'empty'}>
                <SandboxHeader onClick={this.onHeaderClickHandler}>
                    <SandboxTitle>{title}</SandboxTitle>
                    <SandboxControls>
                        <SandboxControl onClick={this.onToggleVisibilityClickHandler}>
                            {controlVisibilityIcon}
                        </SandboxControl>

                        <SandboxControl onClick={this.onToggleFullScreenClickHandler}>
                            {controlFullScreenIcon}
                        </SandboxControl>
                    </SandboxControls>
                </SandboxHeader>

                <div data-vrt-locator={'sandbox-content'}>
                    <ErrorBoundary>
                        {this.state.isVisible && <SandboxContent>{children}</SandboxContent>}

                        <Dialog
                            isOpened={this.state.isFullScreen}
                            onClose={() => this.setState({ isFullScreen: false })}
                            title={title}
                            content={children}
                        />
                    </ErrorBoundary>
                </div>
            </SandboxBlock>
        );
    }
}

export default Sandbox;
