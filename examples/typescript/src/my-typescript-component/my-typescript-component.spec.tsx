import React from 'react';
import MyTypescriptComponent, { Color } from 'my-typescript-component/my-typescript-component';

export const SpecMyTypescriptComponentDefault: React.FunctionComponent = () => (
    <MyTypescriptComponent name={'Lorem'} />
);

export const SpecMyTypescriptComponentPositive: React.FunctionComponent = () => (
    <MyTypescriptComponent name={'Lorem positive'} color={Color.POSITIVE} />
);

export const SpecMyTypescriptComponentNegative: React.FunctionComponent = () => (
    <MyTypescriptComponent name={'Lorem negative'} color={Color.NEGATIVE} />
);
