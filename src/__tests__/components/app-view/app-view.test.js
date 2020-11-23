import React from 'react';
import renderer, { create, act } from 'react-test-renderer';
import 'jest-styled-components';
import AppView from '../../../components/app-view/app-view';

describe('AppView tests:', () => {
    it('AppView render', () => {
        let root;

        act(() => {
            root = create(<AppView />);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('AppView sidebar visibility toggled', () => {
        const component = renderer.create(<AppView />);
        const tree = component.toJSON();
        const instance = component.getInstance();

        expect(tree).toMatchSnapshot();
        expect(instance.state.sidebarOpened).toBe(true);

        instance.setSidebarVisible(false);
        expect(instance.state.sidebarOpened).toBe(false);
    });

    it('AppView sidebar handleKeyDown', () => {
        let root;

        act(() => {
            root = create(<AppView />);
        });

        act(() => {
            root.update(<AppView />);
            const event = { keyCode: 83 };
            let instance = root.getInstance();
            instance.handleKeyDown(event);
        });

        act(() => {
            const event = { keyCode: 83 };
            let instance = root.getInstance();

            instance.handleKeyDown(event);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('AppView sidebar handleScreenResize', () => {
        let root;
        act(() => {
            root = create(<AppView />);
        });

        act(() => {
            root.update(<AppView />);
            const event = {
                target: {
                    navigator: {
                        userAgent:
                            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
                    },
                },
            };
            let instance = root.getInstance();
            instance.handleScreenResize(event);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });
});
