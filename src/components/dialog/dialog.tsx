import React from 'react';
import ReactDOM from 'react-dom';

import Icon, { IconName } from '../icon/icon';

import './dialog.scss';

const KEYCODES = {
    ESCAPE: 27,
};

interface DialogProps {
    isOpened?: boolean;
    onClose?: () => void;
    content?: React.ReactNode;
    title?: React.ReactNode;
}

interface DialogState {
    active: boolean;
    portal?: React.ReactNode;
}

class Dialog extends React.Component<DialogProps, DialogState> {
    private portal: React.RefObject<HTMLInputElement>;
    constructor(props: DialogProps) {
        super(props);

        this.portal = React.createRef();
        this.handleKeydown = this.handleKeydown.bind(this);
        this.state = {
            active: false,
        };
    }

    componentDidUpdate(prevProps: DialogProps) {
        if (this.props.isOpened !== prevProps.isOpened) {
            if (this.props.isOpened) {
                this.openDialog();
            } else {
                this.closeDialog();
            }
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeydown);
    }

    handleKeydown = (event: KeyboardEvent) => {
        if (event.keyCode === KEYCODES.ESCAPE && this.state.active) {
            this.closeDialog();
        }
    };

    openDialog() {
        return this.state.active ? null : this.setState({ active: true });
    }

    closeDialog() {
        if (!this.state.active) {
            return;
        }

        const onCloseHandler = this.props.onClose ? this.props.onClose() : null;

        this.setState({ active: false }, () => onCloseHandler);
    }

    render() {
        const { title, content } = this.props;

        if (!this.state.active) {
            return null;
        }

        const onClick = () => this.closeDialog();

        const dialog = (
            <div className="styleguide-dialog" ref={this.portal}>
                <div className="styleguide-dialog__header">
                    <h1 className="styleguide-dialog__title">{title}</h1>
                    <div className="styleguide-dialog__close" onClick={onClick}>
                        <Icon name={IconName.CLOSE} />
                    </div>
                </div>
                <div className="styleguide-dialog__content">{content}</div>
            </div>
        );

        return ReactDOM.createPortal(dialog, document.body);
    }
}

export default Dialog;
