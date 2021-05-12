import 'jest-styled-components';
import React from 'react';
import { create, act } from 'react-test-renderer';
import App from '../app';
import AppProps from './app-view.mockup.json';
import config from '../../styleguide.config';

describe('App generic tests', () => {
    let root;

    it('When app is open', () => {
        act(() => {
            const mockedConfig = Object.assign(config, {
                getSections() {
                    return JSON.parse(AppProps.openApp).sections;
                },
            });
            root = create(<App config={mockedConfig} />);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('When app receive no sections', () => {
        act(() => {
            const mockedConfig = Object.assign(config, {
                getSections() {
                    return JSON.parse(AppProps.openApp).sections;
                },
            });
            root = create(<App config={mockedConfig} />);
        });

        act(() => {
            const mockedConfig = Object.assign(config, {
                getSections() {
                    return JSON.parse(AppProps.openComponent).sections;
                },
            });
            root.update(<App config={mockedConfig} />);
        });

        act(() => {
            let instance = root.getInstance();
            instance.state.searchQuery = 's';
            instance.componentDidUpdate(JSON.parse(AppProps.openApp));
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('When app is is unmounted', () => {
        act(() => {
            const mockedConfig = Object.assign(config, {
                getSections() {
                    return JSON.parse(AppProps.openApp).sections;
                },
            });
            root = create(<App config={mockedConfig} />);
        });

        act(() => {
            let instance = root.getInstance();

            instance.componentWillUnmount();
        });

        expect(root.toJSON()).toMatchSnapshot();
    });
});

describe('App url tests', () => {
    let root;
    const url = '#Structure-Component';
    const { location } = window;

    beforeAll(() => {
        delete window.location;

        window.location = {
            hash: url,
        };
    });

    afterAll(() => {
        window.location = location;
    });

    it('When app perform handleHashChange', () => {
        act(() => {
            const mockedConfig = Object.assign(config, {
                getSections() {
                    return JSON.parse(AppProps.openApp).sections;
                },
            });
            root = create(<App config={mockedConfig} />);
        });

        act(() => {
            let instance = root.getInstance();

            instance.handleHashChange();

            expect(instance.state.hash).toBe('Structure-Component');
        });
    });
});
