import React from 'react';
import renderer from 'react-test-renderer';
import GlobalStyles from '../components/page/app-global-styles';

const setGLobalStyles = () => renderer.create(<GlobalStyles />).toJSON();
const setStyleElement = () => document.head.querySelector('style');

describe('Styled-components global styles', () => {
    it('styled components render global tag by default', () => {
        setGLobalStyles();

        const styleTag = setStyleElement();

        expect(styleTag.textContent).toMatchSnapshot();
    });

    it('styled components version to be equal to 5.2.1', () => {
        setGLobalStyles();

        const styleTag = setStyleElement();

        expect(styleTag.getAttribute('data-styled-version')).toEqual('5.2.1');
    });
});
