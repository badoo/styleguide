import React from 'react';
import styled from 'styled-components';
import config from '__GLOBAL__CONFIG__';
import Dialog from '../dialog/dialog';
import ErrorBoundary from '../error-boundary/error-boundary';
import Icon, { IconName } from '../icon/icon';
import { deviceSizes } from '../../utilities';

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
    flex: 1 0 auto;
    font-size: 16px;
    font-weight: 300;
    font-family: sans-serif;
    padding: 16px 0;
    word-break: break-word;

    @media screen and (max-width: ${deviceSizes.phone}px) {
        flex: 1 1 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: initial;
    }
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

const VisibilityIcon = {
    hidden: false,
    visible: true,
};
const mapVisibilityIconToState = {
    [VisibilityIcon.hidden]: <Icon name={IconName.MINIMIZE_ON} />,
    [VisibilityIcon.visible]: <Icon name={IconName.MINIMIZE_OFF} />,
};

const FullscreenIcon = {
    off: false,
    on: true,
};

const mapFullscreenIconToState = {
    [FullscreenIcon.off]: <Icon name={IconName.FULLSCREEN_OFF} />,
    [FullscreenIcon.on]: <Icon name={IconName.FULLSCREEN_ON} />,
};

class Sandbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFullScreen: false,
            isContentVisible: true,
        };

        this.toggleContentVisibility = this.toggleContentVisibility.bind(this);
        this.toggleFullscreenMode = this.toggleFullscreenMode.bind(this);
    }

    render() {
        const { title = 'empty', children } = this.props;

        return (
            <SandboxBlock data-vrt-locator={'sandbox'} data-name={title}>
                <SandboxHeader>
                    <SandboxTitle onClick={this.toggleContentVisibility}>{title}</SandboxTitle>
                    <SandboxControls>
                        <SandboxControl onClick={this.toggleContentVisibility}>
                            {mapVisibilityIconToState[this.state.isContentVisible]}
                        </SandboxControl>

                        <SandboxControl onClick={this.toggleFullscreenMode}>
                            {mapFullscreenIconToState[this.state.isFullScreen]}
                        </SandboxControl>
                    </SandboxControls>
                </SandboxHeader>

                <div data-vrt-locator={'sandbox-content'}>
                    <ErrorBoundary>
                        {this.state.isContentVisible && <SandboxContent>{children}</SandboxContent>}

                        <Dialog
                            isOpened={this.state.isFullScreen}
                            onClose={this.toggleFullscreenMode}
                            title={title}
                            content={children}
                        />
                    </ErrorBoundary>
                </div>
            </SandboxBlock>
        );
    }

    toggleFullscreenMode() {
        this.setState({ isFullScreen: !this.state.isFullScreen });
    }

    toggleContentVisibility() {
        this.setState({ isContentVisible: !this.state.isContentVisible });
    }
}

export default Sandbox;
