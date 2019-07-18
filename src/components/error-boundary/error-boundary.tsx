import React from 'react';

import './error-boundary.scss';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    error: Error | null;
    showStack: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            error: null,
            showStack: false,
        };
    }

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            return (
                <section className="error-boundary">
                    <h3 className="error-boundary__title">{this.state.error.toString()}</h3>
                    {this.state.showStack ? (
                        <React.Fragment>
                            <p
                                className="error-boundary__show-more"
                                onClick={() => this.setState({ showStack: false })}
                            >
                                Hide error stack
                            </p>
                            <p className="error-boundary__text">{this.state.error.stack}</p>
                        </React.Fragment>
                    ) : (
                        <p
                            className="error-boundary__show-more"
                            onClick={() => this.setState({ showStack: true })}
                        >
                            Show error stack
                        </p>
                    )}
                </section>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
