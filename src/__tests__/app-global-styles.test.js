import React from 'react';
import renderer from 'react-test-renderer';
import AppViewGlobalStyles from '../app-global-styles';

const setGLobalStyles = () => renderer.create(<AppViewGlobalStyles />).toJSON();
const setStyleElement = () => document.head.querySelector('style');

it('styled components render global tag by default', () => {
    setGLobalStyles();

    const styleTag = setStyleElement();

    expect(styleTag.textContent).toMatchSnapshot();
});

it('styled components version to be equal to 5.0.1', () => {
    setGLobalStyles();

    const styleTag = setStyleElement();

    expect(styleTag.getAttribute('data-styled-version')).toEqual('5.0.1');
});
