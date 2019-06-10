import React from 'react';

import './error-boundary.scss';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true, error, errorInfo });
    }

    render() {
        const errorMessage = this.state.error ? this.state.error.toString() : null;
        const errorInfoMessage = this.state.errorInfo ? this.state.errorInfo.componentStack : null;

        return this.state.hasError ? (
            <section className="error-boundary js-styleguide-sandbox__content">
                <h3 className="error-boundary__title">{errorMessage}</h3>
                <p className="error-boundary__text">{errorInfoMessage}</p>
            </section>
        ) : (
            this.props.children
        );
    }
}
