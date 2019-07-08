import React from 'react';

import './error-boundary.scss';

interface ErrorBoundaryProps {
    children: React.ReactNode[];
};

interface ErrorBoundaryErrorInfo {
    componentStack?: string | object;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: object | null;
    errorInfo: ErrorBoundaryErrorInfo | null;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error: object | null, errorInfo: ErrorBoundaryErrorInfo) {
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
