import React from 'react';
import renderer from 'react-test-renderer';
import Pagestyles from '../components/page/page-styles';

const setGLobalStyles = () => renderer.create(<Pagestyles />).toJSON();
const setStyleElement = () => document.head.querySelector('style');

describe('Styled-components global styles', () => {
    it('styled components render global tag by default', () => {
        setGLobalStyles();

        const styleTag = setStyleElement();

        expect(styleTag.textContent).toMatchSnapshot();
    });
});
