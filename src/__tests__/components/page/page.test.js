import React from 'react';
import { create, act } from 'react-test-renderer';
import 'jest-styled-components';
import Page from '../../../components/page/page';

describe('Page tests:', () => {
    const mobileUserAgent =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';

    it('Page render', () => {
        let root;

        act(() => {
            root = create(<Page />);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('Page sidebar visibility toggled', () => {
        let root;

        act(() => {
            root = create(<Page />);
        });

        expect(root.toJSON()).toMatchSnapshot();
        expect(root.getInstance().state.isSidebarVisible).toBe(true);

        act(() => {
            root.update(<Page />);
            let instance = root.getInstance();
            instance.setSidebarVisible(false);
        });

        expect(root.getInstance().state.isSidebarVisible).toBe(false);
    });

    it('Page handleKeyDown test', () => {
        let root;

        act(() => {
            root = create(<Page />);
        });

        act(() => {
            root.update(<Page />);
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

    it('Page handleScreenResize test', () => {
        let root;

        act(() => {
            root = create(<Page />);
        });

        act(() => {
            root.update(<Page />);
            const event = {
                target: {
                    navigator: {
                        userAgent: mobileUserAgent,
                    },
                },
            };
            let instance = root.getInstance();
            instance.handleScreenResize(event);
        });

        expect(root.getInstance().state.deviceViewport).toBe(true);
    });

    it('Page sidebar should be closed when mobile detected', () => {
        let root;

        act(() => {
            root = create(<Page />);
        });

        act(() => {
            root.update(<Page />);
            const event = {
                target: {
                    navigator: {
                        userAgent: mobileUserAgent,
                    },
                },
            };
            let instance = root.getInstance();
            instance.handleScreenResize(event);
        });

        expect(root.getInstance().state.isSidebarVisible).toBe(false);
    });

    it('Page sidebar should be closed when hash changed while mobile detected', () => {
        let root;

        act(() => {
            root = create(<Page />);
        });

        act(() => {
            root.update(<Page />);
            const event = {
                target: {
                    navigator: {
                        userAgent: mobileUserAgent,
                    },
                },
            };
            let instance = root.getInstance();
            instance.handleScreenResize(event);
        });

        act(() => {
            root.update(<Page />);
            let instance = root.getInstance();
            instance.setSidebarVisible(true);
        });

        act(() => {
            root.update(<Page />);
            const event = {
                target: {
                    location: {
                        hash: '#Structure-Component',
                    },
                },
            };
            let instance = root.getInstance();
            instance.handleHashChange(event);
        });

        expect(root.getInstance().state.isSidebarVisible).toBe(false);
    });
});
