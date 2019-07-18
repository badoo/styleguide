import React from 'react';
import ErrorBoundary from 'components/error-boundary/error-boundary';

export const SpecErrorBoundaryValid: React.FunctionComponent = () => (
    <ErrorBoundary>
        <div>I am valid</div>
    </ErrorBoundary>
);

class BrokenComponent extends React.PureComponent<{}, { broken: any }> {
    render() {
        return <div>{this.state.broken.length}</div>;
    }
}

export const SpecErrorBoundaryInvalid = () => (
    <ErrorBoundary>
        <BrokenComponent />
    </ErrorBoundary>
);
