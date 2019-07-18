import React from 'react';
import ErrorBoundary from './error-boundary';

export const SpecErrorBoundaryValid = () => (
    <ErrorBoundary>
        <div>I am valid</div>
    </ErrorBoundary>
);

class BrokenComponent extends React.PureComponent {
    render() {
        return <div>{this.state.broken.length}</div>;
    }
}

export const SpecErrorBoundaryInvalid = () => (
    <ErrorBoundary>
        <BrokenComponent />
    </ErrorBoundary>
);
