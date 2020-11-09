import React from 'react';
import { create, act } from 'react-test-renderer';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
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

    it('When app receive no sections', () => {
        act(() => {
            root = create(<App sections={JSON.parse(AppProps.openApp).sections} />);
        });

        act(() => {
            root.update(<App sections={JSON.parse(AppProps.openComponent).sections} />);
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
            root = create(<App sections={JSON.parse(AppProps.openApp).sections} />);
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
            root = create(<App sections={JSON.parse(AppProps.openApp).sections} />);
        });

        act(() => {
            let instance = root.getInstance();

            instance.handleHashChange();

            expect(instance.state.hash).toBe('Structure-Component');
        });
    });
});

describe('App search tests', () => {
    let root;
    const searchQueryRef = 'comp';

    it('When we search, we have results filtered', () => {
        act(() => {
            root = create(<App sections={JSON.parse(AppProps.openApp).sections} />);
        });

        expect(root.toJSON()).toMatchSnapshot();

        act(() => {
            let instance = root.getInstance();
            const event = {
                target: {
                    value: 'Comp',
                },
            };

            expect(instance.state.searchQuery).toBe('');

            instance.handleSearchChange(event);
        });

        act(() => {
            let instance = root.getInstance();
            const { searchQuery, sections } = instance.state;

            expect(searchQuery).toBe(searchQueryRef);
            expect(sections[0].components[0].name.toLowerCase().startsWith(searchQueryRef)).toBe(
                true
            );
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('When we clear search request', () => {
        act(() => {
            root = create(<App sections={JSON.parse(AppProps.openApp).sections} />);
        });

        act(() => {
            let instance = root.getInstance();
            const event = {
                target: {
                    value: 'Comp',
                },
            };

            expect(instance.state.searchQuery).toBe('');

            instance.handleSearchChange(event);
        });

        expect(root.toJSON()).toMatchSnapshot();

        act(() => {
            let instance = root.getInstance();

            expect(instance.state.searchQuery).toBe(searchQueryRef);

            const event = {
                target: {
                    value: '',
                },
            };

            instance.handleSearchChange(event);
            expect(instance.state.sections[0].components.length).toBe(1);
        });

        act(() => {
            let instance = root.getInstance();
            const { searchQuery, sections } = instance.state;

            expect(searchQuery).toBe('');

            const event = {
                target: {
                    value: '',
                },
            };

            instance.handleSearchChange(event);
            expect(sections[0].components.length).toBe(1);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });
});

describe('App accessability tests', () => {
    it('should not fail any accessibility tests', async () => {
        const { container } = render(<App sections={JSON.parse(AppProps.openApp).sections} />);

        expect(await axe(container)).toHaveNoViolations();
    });
});
