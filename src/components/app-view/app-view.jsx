import * as React from 'react';
import styled, { css } from 'styled-components';
import GlobalStyles from './app-global-styles';
import Sidebar from '../sidebar/sidebar';
import SidebarVisibilityToggler from '../sidebar/toggler';
import { checkMobileScreen, deviceSizes } from '../../utilities';

const SIDEBAR_WIDTH = 300;

const AppSidebar = styled(Sidebar)`
    min-height: 100vh;
    transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${SIDEBAR_WIDTH}px;
    z-index: 2;
    will-change: transform;
`;

const Content = styled.main`
    min-width: 0;
    padding: 32px;
    position: relative;
    background: #fff;
    width: calc(100% - ${SIDEBAR_WIDTH}px);
    transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
    will-change: transform;
`;

const AppViewBlock = styled.div`
    background: #fff;

    ${AppSidebar} {
        transform: translateX(${props => (props.isSidebarVisible ? 0 : '-100%')});

        @media screen and (max-width: ${deviceSizes.phone}px) {
            right: 0;
            width: auto;
        }
    }

    ${Content} {
        transform: translateX(${props => (!props.isSidebarVisible ? '100px' : '300px')});

        @media screen and (max-width: ${deviceSizes.phone}px) {
            width: 100%;
            transform: translateX(0);
        }
    }
`;

const AppView = props => {
    const [isSidebarVisible, setSidebarVisible] = React.useState(true);
    const [isDeviceViewport, setDeviceViewport] = React.useState(() => checkMobileScreen());

    const handleKeyDown = event => {
        if (isDeviceViewport) return;

        if (event.keyCode === 83) {
            setSidebarVisible(state => !state);
        }
    };

    const handleScreenResize = () => {
        const isDeviceScreen = checkMobileScreen();

        setDeviceViewport(isDeviceScreen);
    };

    const handleHashChange = () => {
        if (!isDeviceViewport) return;

        setSidebarVisible(state => !state);
    };

    React.useEffect(() => {
        document.addEventListener('keyup', handleKeyDown);
        window.addEventListener('resize', handleScreenResize);
        window.addEventListener('hashchange', handleHashChange);

        if (isDeviceViewport) {
            setSidebarVisible(false);
        }

        return () => {
            window.removeEventListener('resize', handleScreenResize);
            document.removeEventListener('keyup', handleKeyDown);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return (
        <AppViewBlock isDeviceViewport={isDeviceViewport} isSidebarVisible={isSidebarVisible}>
            <GlobalStyles />

            <SidebarVisibilityToggler
                isVisible={isSidebarVisible}
                isMobile={isDeviceViewport}
                onClick={() => {
                    setSidebarVisible(!isSidebarVisible);
                }}
            />
            <AppSidebar>
                {props.searchField}

                {props.navigation}
            </AppSidebar>

            <Content>{props.content}</Content>
        </AppViewBlock>
    );
};

export default AppView;
