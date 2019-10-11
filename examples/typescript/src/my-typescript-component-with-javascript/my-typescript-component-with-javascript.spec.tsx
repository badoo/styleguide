import React from 'react';
import MyTypescriptComponentWithJavascript, {
    Color,
} from 'my-typescript-component-with-javascript/my-typescript-component-with-javascript';

export const SpecMyTypescriptComponentDefault: React.FunctionComponent = () => (
    <MyTypescriptComponentWithJavascript name={'Lorem'} />
);

export const SpecMyTypescriptComponentPositive: React.FunctionComponent = () => (
    <MyTypescriptComponentWithJavascript name={'Lorem positive'} color={Color.POSITIVE} />
);

export const SpecMyTypescriptComponentNegative: React.FunctionComponent = () => (
    <MyTypescriptComponentWithJavascript name={'Lorem negative'} color={Color.NEGATIVE} />
);
