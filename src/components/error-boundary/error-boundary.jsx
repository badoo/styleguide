import React from 'react';
import styled from 'styled-components';

const ErrorBoundaryBlock = styled.section`
    font-family: monospace;
    line-height: 1.5;
    padding: 16px;
    background: rgba(222, 23, 56, 0.2);
    color: rgba(222, 23, 56, 1);
`;

const ErrorBoundaryTitle = styled.h3`
    margin: 0;
`;

const ErrorBoundaryShowMore = styled.p`
    margin: 10px 0 0;
    cursor: pointer;
    text-decoration: underline;
`;

const ErrorBoundaryText = styled.p`
    margin: 10px 0 0;
    white-space: pre-wrap;
`;

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.toggleErrorStack = this.toggleErrorStack.bind(this);

        this.state = {
            error: null,
            showStack: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    toggleErrorStack() {
        this.setState({ showStack: !this.state.showStack });
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorBoundaryBlock>
                    <ErrorBoundaryTitle>{this.state.error.toString()}</ErrorBoundaryTitle>

                    {this.state.showStack ? (
                        <React.Fragment>
                            <ErrorBoundaryShowMore onClick={this.toggleErrorStack}>
                                Hide error stack
                            </ErrorBoundaryShowMore>
                            <ErrorBoundaryText>{this.state.error.stack}</ErrorBoundaryText>
                        </React.Fragment>
                    ) : (
                        <ErrorBoundaryShowMore onClick={this.toggleErrorStack}>
                            Show error stack
                        </ErrorBoundaryShowMore>
                    )}
                </ErrorBoundaryBlock>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
