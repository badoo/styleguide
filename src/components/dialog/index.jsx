import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Icon from '../icon';

import IconClose from './icon-close.svg';

const KEYCODES = {
    ESCAPE: 27,
};

class Dialog extends Component {
    constructor(props) {
        super(props);

        this.portal = null;
        this.defaultOpen = false;
        this.handleKeydown = this.handleKeydown.bind(this);
        this.state = {
            active: this.defaultOpen,
        };
    }

    componentDidUpdate(prevProps) {
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

    handleKeydown(e) {
        if (e.keyCode === KEYCODES.ESCAPE && this.state.active) {
            this.closeDialog();
        }
    }

    openDialog() {
        if (this.state.active) {
            return null;
        }

        this.setState({ active: true });
    }

    closeDialog() {
        if (!this.state.active) {
            return;
        }

        this.setState({ active: false }, this.props.onClose);
        this.destroyPortal();
    }

    setPortal() {
        this.portal = document.createElement('div');
        this.portal.className = 'styleguide-dialog';
        document.body.appendChild(this.portal);
    }

    destroyPortal() {
        document.body.removeChild(this.portal);
        this.portal = null;
    }

    createDialog(children) {
        if (!this.state.active) {
            return null;
        }

        if (!this.portal) {
            this.setPortal();
        }

        return ReactDOM.createPortal(
            <React.Fragment key="dialog">
                <div className="styleguide-dialog__header">
                    <h1 className="styleguide-dialog__title">{this.props.title}</h1>
                    <div className="styleguide-dialog__close" onClick={e => this.closeDialog(e)}>
                        <Icon name={Icon.Names.CLOSE} />
                    </div>
                </div>
                <div className="styleguide-dialog__content">{children}</div>
            </React.Fragment>,
            this.portal
        );
    }

    render() {
        return this.createDialog(this.props.content);
    }
}

export default Dialog;
