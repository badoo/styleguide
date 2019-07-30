import React from 'react';

export enum Color {
    NEUTRAL = 'NEUTRAL',
    POSITIVE = 'POSITIVE',
    NEGATIVE = 'NEGATIVE',
}

interface MyJavascriptComponentProps {
    color?: Color;
    name?: string;
    children?: never;
}

declare const MyJavascriptComponent: React.FunctionComponent<MyJavascriptComponentProps>;

MyJavascriptComponent.defaultProps = {
    color: Color.NEUTRAL,
};

export default MyJavascriptComponent;
