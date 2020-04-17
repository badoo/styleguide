import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Sandbox from '../../../components/sandbox/sandbox';
import Component from '../../../components/component/component';
import componentProps from '../component/component.mockup.json';

describe('Sandbox tests:', () => {
    beforeAll(() => {
        ReactDOM.createPortal = jest.fn(element => {
            return element;
        });
    });

    afterEach(() => {
        ReactDOM.createPortal.mockClear();
    });

    /**
     * to cover config.hasResizableSandbox
     */

    const importedComponentProps = Object.assign({}, componentProps, {
        tests: componentProps.tests.map(test => {
            test.Component = Component;

            return test;
        }),
    });

    it('Sandbox render component', () => {
        const props = {
            title: 'SpecComponentEmpty',
            children: <Component {...importedComponentProps} />,
        };
        const component = renderer.create(<Sandbox {...props} />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Sandbox render component without title', () => {
        const props = {
            title: undefined,
            children: <Component {...importedComponentProps} />,
        };
        const component = renderer.create(<Sandbox {...props} />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Sandbox render component in fullscreen mode off & on', () => {
        const props = {
            title: 'SpecComponentEmpty',
            children: <Component {...importedComponentProps} />,
        };
        const component = renderer.create(<Sandbox {...props} />);
        const tree = component.toJSON();
        const instance = component.getInstance();

        expect(tree).toMatchSnapshot();
        expect(instance.state.isFullScreen).toBe(false);

        instance.toggleFullscreenMode();

        expect(instance.state.isFullScreen).toBe(true);
    });

    it('Sandbox render component in with and without content', () => {
        const props = {
            title: 'SpecComponentEmpty',
            children: <Component {...importedComponentProps} />,
        };
        const component = renderer.create(<Sandbox {...props} />);
        const tree = component.toJSON();
        const instance = component.getInstance();

        expect(tree).toMatchSnapshot();
        expect(instance.state.isContentVisible).toBe(true);

        instance.toggleContentVisibility();

        expect(instance.state.isContentVisible).toBe(false);
    });
});
