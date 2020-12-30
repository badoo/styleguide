import React from 'react';
import renderer, { create, act } from 'react-test-renderer';
import 'jest-styled-components';
import AppView from '../app-view';
import AppProps from './app-view.mockup.json';
import Component from '../components/component/component';

const setComponentsForTestsInProps = (props) =>
    Object.assign({}, props, {
        sections: props.sections.map((section) => {
            section.components.map((component) => {
                component.tests.map((test) => {
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
});
