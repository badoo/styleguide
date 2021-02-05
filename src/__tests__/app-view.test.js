import React from 'react';
import ReactDOM from 'react-dom';
import renderer, { create, act } from 'react-test-renderer';
import 'jest-styled-components';
import AppView from '../app-view';
import AppProps from './app-view.mockup.json';
import Component from '../components/component/component';
import Dialog from '../components/dialog/dialog';

const setComponentsForTestsInProps = (props) =>
    Object.assign({}, props, {
        sections: props.sections.map((section) => {
            section.components.map((component) => {
                component.tests.map((test) => {
                    test.url = `${section.name}-${component.name}-${test.name}`;
                    test.Component = Component;

                    return test;
                });
                return component;
            });
            return section;
        }),
    });

describe('App-view generic tests', () => {
    let component = renderer.create(<AppView {...JSON.parse(AppProps.openApp)} />).toJSON();
    const sandboxUrl = 'Structure-Component-SpecComponentPropTypes';
    const componentUrl = 'Structure-Component';

    beforeAll(() => {
        window.location.hash = sandboxUrl;
        ReactDOM.createPortal = jest.fn((element) => {
            return element;
        });
    });

    afterEach(() => {
        ReactDOM.createPortal.mockClear();
    });

    it('When app is open', () => {
        const tree = component;

        expect(tree).toMatchSnapshot();
    });

    it('When we open component from app', () => {
        const importedProps = JSON.parse(AppProps.openApp);
        const props = setComponentsForTestsInProps(importedProps);
        const updatedProps = setComponentsForTestsInProps(JSON.parse(AppProps.openComponent));
        let root;

        act(() => {
            root = create(<AppView {...props} />);
        });

        expect(root.toJSON()).toMatchSnapshot();

        act(() => {
            root.update(<AppView {...updatedProps} />);

            // let instance = root.getInstance();

            // instance.componentDidUpdate(updatedProps);
        });
    });

    it('When component is open', () => {
        const importedProps = JSON.parse(AppProps.openComponent);
        const props = setComponentsForTestsInProps(importedProps);

        component = renderer.create(<AppView {...props} />).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('When filter show components', () => {
        const importedProps = JSON.parse(AppProps.searchForComponentSuccess);
        const props = setComponentsForTestsInProps(importedProps);

        component = renderer.create(<AppView {...props} />).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('When filter doesn`t show components', () => {
        const importedProps = JSON.parse(AppProps.searchForComponentFailure);
        const props = setComponentsForTestsInProps(importedProps);

        component = renderer.create(<AppView {...props} />).toJSON();

        expect(component).toMatchSnapshot();
    });

    it('When we search', () => {
        const importedProps = JSON.parse(AppProps.searchForComponentSuccess);
        const props = setComponentsForTestsInProps(importedProps);

        const root = renderer.create(
            <AppView {...props} onSearchFieldChange={(event) => `we test output of ${event}`} />
        );

        const instance = root.getInstance();

        const statement = instance.props.onSearchFieldChange('this test');

        expect(statement).toBe('we test output of this test');
    });

    it('When we open direct link with sandbox', () => {
        let root;
        const importedProps = JSON.parse(AppProps.searchForComponentSuccess);
        const props = setComponentsForTestsInProps(importedProps);

        act(() => {
            root = create(<AppView {...props} />);
        });

        expect(root.toJSON()).toMatchSnapshot();

        act(() => {
            root.update(<AppView {...props} currentHash={sandboxUrl} />);
        });

        let instance = root.getInstance();
        expect(instance.state.isDialogOpened).toBe(true);
        expect(root.toJSON()).toMatchSnapshot();
    });

    it('will change window.location.hash after dialog closed', () => {
        const importedProps = JSON.parse(AppProps.openComponent);
        const props = setComponentsForTestsInProps(importedProps);
        component = renderer.create(<AppView {...props} currentHash={sandboxUrl} />);

        expect(window.location.hash).toMatch(sandboxUrl);

        act(() => {
            let instance = component.getInstance();
            instance.handleDialogClose();
        });

        expect(window.location.hash).toMatch(componentUrl);
    });
});
