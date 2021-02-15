/* eslint-disable */
import * as React from 'react';

const element = props => {
    if (!props.in) return null;

    return (
        <React.Fragment>
            {typeof props.children === 'function' ? props.children() : props.children}
        </React.Fragment>
    );
};

const CSSTransition = element;
const Transition = element;

const TransitionGroup = props => {
    const { children } = props;

    if (props.component === null) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    return <div>{children}</div>;
};

export { Transition, CSSTransition, TransitionGroup };
