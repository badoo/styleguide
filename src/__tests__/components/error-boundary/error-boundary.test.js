import React from 'react';
import { create, act } from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import sinon from 'sinon';
import ErrorBoundary from '../../../components/error-boundary/error-boundary';

class BrokenComponent extends React.PureComponent {
    render() {
        return (
            <div>
                <input type="text" value={null} />
            </div>
        );
    }
}

describe('ErrorBoundary tests:', () => {
    it('ErrorBoundary render no errors', () => {
        let root;

        act(() => {
            root = create(
                <ErrorBoundary>
                    <div>I am valid</div>
                </ErrorBoundary>
            );
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('ErrorBoundary render error', () => {
        let root;

        act(() => {
            root = create(
                <ErrorBoundary>
                    <BrokenComponent />
                </ErrorBoundary>
            );
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('ErrorBoundary getDerivedStateFromError test', () => {
        function Something() {
            return null;
        }
        const spy = sinon.spy();
        const wrapper = shallow(
            <ErrorBoundary spy={spy}>
                <Something />
            </ErrorBoundary>
        );
        const error = new Error('This is a test error!');
        wrapper.find(Something).simulateError(error);

        expect(wrapper.state()).toHaveProperty('error');
        expect(wrapper.state().error.toString()).toBe('Error: This is a test error!');

        expect(wrapper.html()).toMatchSnapshot();

        wrapper.instance().toggleErrorStack();

        expect(wrapper.html()).toMatchSnapshot();
    });
});
