import React from 'react';
import ReactDOM from 'react-dom';
import { create, act } from 'react-test-renderer';
import 'jest-styled-components';
import Dialog from '../../../components/dialog/dialog';
import Component from '../../../components/component/component';
import componentProps from '../component/component.mockup.json';

describe('Dialog tests:', () => {
    beforeAll(() => {
        ReactDOM.createPortal = jest.fn((element) => {
            return element;
        });
    });

    afterEach(() => {
        ReactDOM.createPortal.mockClear();
    });

    const importedComponentProps = Object.assign({}, componentProps, {
        tests: componentProps.tests.map((test) => {
            test.Component = Component;

            return test;
        }),
    });
    const props = {
        isOpened: false,
        title: 'SpecComponentEmpty',
        content: <Component {...importedComponentProps} />,
        onClose: null,
    };

    const updatedProps = Object.assign({}, props, {
        isOpened: true,
    });

    const updatedPropsWithOnCloseHandler = Object.assign({}, props, {
        onClose: () => null,
    });

    it('Dialog render null', () => {
        let root;

        act(() => {
            root = create(<Dialog {...props} />);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('Dialog render component', () => {
        let root;

        act(() => {
            root = create(<Dialog {...updatedProps} />);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('Dialog componentDidUpdate all paths', () => {
        let root;

        act(() => {
            root = create(<Dialog {...props} />);
        });

        act(() => {
            root.update(<Dialog {...updatedProps} />);

            let instance = root.getInstance();

            instance.componentDidUpdate(updatedProps);
        });

        expect(root.toJSON()).toMatchSnapshot();

        act(() => {
            root.update(<Dialog {...props} />);

            let instance = root.getInstance();

            instance.componentDidUpdate(updatedProps);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('Dialog handleKeydown test', () => {
        let root;

        act(() => {
            root = create(<Dialog {...props} />);
        });

        act(() => {
            root.update(<Dialog {...updatedProps} />);
            const event = { keyCode: 27 };
            let instance = root.getInstance();
            instance.handleKeydown(event);
        });

        act(() => {
            const event = { keyCode: 27 };
            let instance = root.getInstance();

            instance.handleKeydown(event);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('Dialog onCloseHandler test', () => {
        let root;

        act(() => {
            root = create(<Dialog {...updatedPropsWithOnCloseHandler} />);
        });

        act(() => {
            let instance = root.getInstance();
            instance.onCloseHandler();
        });

        expect(root.toJSON()).toMatchSnapshot();
    });
});
