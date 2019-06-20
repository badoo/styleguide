import React from 'react';
import MyJavascriptComponent, { Color } from 'my-javascript-component/my-javascript-component';

export const SpecMyJavascriptComponentDefault = () => <MyJavascriptComponent name={'Lorem'} />;

export const SpecMyJavascriptComponentPositive = () => (
    <MyJavascriptComponent name={'Lorem positive'} color={Color.POSITIVE} />
);

export const SpecMyJavascriptComponentNegative = () => (
    <MyJavascriptComponent name={'Lorem negative'} color={Color.NEGATIVE} />
);
