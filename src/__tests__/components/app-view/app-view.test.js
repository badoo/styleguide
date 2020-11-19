import React from 'react';
import ReactDOM from 'react-dom';
import { create, act } from 'react-test-renderer';
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

    it('AppView sidebar closed', () => {
        let root;

        act(() => {
            root = create(<AppView isSidebarVisible={false} />);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });

    it('AppView mobile viewport', () => {
        let root;

        act(() => {
            root = create(<AppView isDesktopViewport={true} />);
        });

        expect(root.toJSON()).toMatchSnapshot();
    });
});
