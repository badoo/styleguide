import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Component from '../../../components/component/component';
import componentProps from './component.mockup.json';

describe('Component generic tests:', () => {
    it('When component has props & tests', () => {
        const props = Object.assign({}, componentProps, {
            tests: componentProps.tests.map(test => {
                test.Component = Component;

                return test;
            }),
        });
        const component = renderer.create(<Component {...props} />).toJSON();
        const tree = component;

        expect(tree).toMatchSnapshot();
    });

    it('When component has only props', () => {
        const props = Object.assign({}, componentProps, {
            tests: null,
        });
        const component = renderer.create(<Component {...props} />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();

        const instance = component.getInstance();

        expect(instance.state.isPropTableOpened).toBe(false);
        instance.toggleProps();
        expect(instance.state.isPropTableOpened).toBe(true);
    });

    it('When component has only props - show props table', () => {
        const props = Object.assign({}, componentProps, {
            tests: null,
            isPropTableOpened: true,
        });
        const component = renderer.create(<Component {...props} />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('When component has only tests', () => {
        const props = Object.assign({}, componentProps, {
            propTypes: null,
        });
        const component = renderer.create(<Component {...props} />).toJSON();
        const tree = component;

        expect(tree).toMatchSnapshot();
    });

    it('When component has one test with no element to return', () => {
        try {
            const props = Object.assign({}, componentProps, {
                tests: [{ name: 'testEmpty' }],
            });
            const component = renderer.create(<Component {...props} />).toJSON();
            const tree = component;

            expect(tree).toMatchSnapshot();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    });

    it('When component has one test with no valid react element to return', () => {
        try {
            const props = Object.assign({}, componentProps, {
                tests: [
                    {
                        name: 'TestWithWrongComponent',
                        Component: 'false',
                    },
                ],
            });
            const component = renderer.create(<Component {...props} />).toJSON();
            const tree = component;

            expect(tree).toMatchSnapshot();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    });
});
