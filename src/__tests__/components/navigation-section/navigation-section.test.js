import React from 'react';
import renderer, { create, act } from 'react-test-renderer';
import NavigationSection from '../../../components/navigation-section/navigation-section';
import navigationSectionProps from './navigation-section.mockup.json';

describe('Navigation-Section Tests:', () => {
    it('When we open app', () => {
        const props = navigationSectionProps.sections[0];
        const component = renderer.create(<NavigationSection {...props} />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('When we toggle section to open state', () => {
        const props = navigationSectionProps.sections[0];
        const component = renderer.create(<NavigationSection {...props} />);

        const instance = component.getInstance();

        expect(instance.state.isOpened).toBe(false);
        instance.toggleSection();

        expect(instance.state.isOpened).toBe(true);
    });

    it('When we toggle other section', () => {
        const props = navigationSectionProps.sections[1];
        let component = renderer.create(<NavigationSection {...props} />);

        const instance = component.getInstance();

        expect(instance.state.isOpened).toBe(false);

        const updatedProps = Object.assign({}, props, {
            isOpened: true,
        });

        component = renderer.create(<NavigationSection {...updatedProps} />);

        instance.toggleSection();

        expect(instance.state.isOpened).toBe(true);
    });

    it('When we toggle isOpened for section', () => {
        let root;

        const props = navigationSectionProps.sections[1];

        act(() => {
            root = create(<NavigationSection {...props} />);
        });

        expect(root.toJSON()).toMatchSnapshot();

        act(() => {
            const updatedProps = Object.assign({}, props, {
                isOpened: true,
            });
            root.update(<NavigationSection {...updatedProps} />);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });
});
