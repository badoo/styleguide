import React from 'react';
import { create, act } from 'react-test-renderer';
import App from '../app';
import AppProps from './app-view.mockup.json';

describe('App generic tests', () => {
    let root;

    it('When app is open', () => {
        act(() => {
            root = create(<App sections={JSON.parse(AppProps.openApp).sections} />);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });
});
