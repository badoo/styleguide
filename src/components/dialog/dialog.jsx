import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Icon, { IconName } from '../icon/icon';

const KEYCODES = {
    ESCAPE: 27,
};

const DialogBlock = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #fff;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 10;
`;

const DialogHeader = styled.div`
    display: flex;
    align-items: center;
    flex: 0 1 auto;
    font-family: sans-serif;
    position: relative;
    padding: 16px;
    background-color: #fafafa;
    color: #282828;
`;

const DialogTitle = styled.h1`
    margin-bottom: 0;
    font: 400 16px -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu,
        'Helvetica Neue', 'Lucida Grande', sans-serif;
`;

const DialogClose = styled.div`
    position: absolute;
    display: flex;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s ease-out;

    &:hover {
        opacity: 1;
    }
`;

const DialogContent = styled.div`
    padding: 10px;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    transform: translate3d(0, 0, 0);
`;

class Dialog extends React.Component {
    constructor(props) {
        super(props);

        this.portal = React.createRef();
        this.closeDialog = this.closeDialog.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.state = {
            active: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.isOpened !== prevProps.isOpened) {
            if (this.props.isOpened) {
                this.openDialog();
                document.addEventListener('keydown', this.handleKeydown);
            } else {
                this.closeDialog();
                document.removeEventListener('keydown', this.handleKeydown);
            }
        }
    }

    render() {
        const { title, content } = this.props;

        if (!this.state.active) {
            return null;
        }

        const dialog = (
            <DialogBlock ref={this.portal}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogClose onClick={this.closeDialog}>
                        <Icon name={IconName.CLOSE} />
                    </DialogClose>
                </DialogHeader>
                <DialogContent>{content}</DialogContent>
            </DialogBlock>
        );

        return ReactDOM.createPortal(dialog, document.body);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeydown);
    }

    handleKeydown(event) {
        if (event.keyCode === KEYCODES.ESCAPE && this.state.active) {
            this.closeDialog();
        }
    }

    openDialog() {
        return this.state.active ? null : this.setState({ active: true });
    }

    closeDialog() {
        if (this.state.active) {
            this.setState({ active: false }, this.onCloseHandler);
        }
    }

    onCloseHandler() {
        if (this.props.onClose && typeof this.props.onClose === 'function') {
            this.props.onClose();
        }
    }
}

export default Dialog;
