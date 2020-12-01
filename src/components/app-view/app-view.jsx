import * as React from 'react';
import styled from 'styled-components';
import GlobalStyles from './app-global-styles';
import Sidebar from '../sidebar/sidebar';
import SidebarVisibilityToggler from '../sidebar/sidebar-toggler';
import { checkMobileScreen, deviceSizes } from '../../utilities';

const SIDEBAR_WIDTH = 300;
const KEYCODES = {
    S: 83,
};

const AppSidebar = styled(Sidebar)`
    transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${SIDEBAR_WIDTH}px;
    z-index: 1;
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

class AppView extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleScreenResize = this.handleScreenResize.bind(this);
        this.handleHashChange = this.handleHashChange.bind(this);
        this.setSidebarVisible = this.setSidebarVisible.bind(this);
        this.state = {
            sidebarOpened: true,
            deviceViewport: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.deviceViewport !== this.state.deviceViewport) {
            this.setSidebarVisible(!this.state.deviceViewport);
        }
    }

    componentDidMount() {
        document.addEventListener('keyup', this.handleKeyDown);
        window.addEventListener('resize', this.handleScreenResize);
        window.addEventListener('hashchange', this.handleHashChange);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyDown);
        window.removeEventListener('resize', this.handleScreenResize);
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    setDeviceViewport(value) {
        this.setState({ deviceViewport: value });
    }

    setSidebarVisible(value) {
        if (typeof value === 'undefined') {
            this.setState({ sidebarOpened: !this.state.sidebarOpened });
            return;
        }

        this.setState({ sidebarOpened: value });
    }

    handleKeyDown(event) {
        if (this.state.deviceViewport) return;

        if (event.keyCode === KEYCODES['S'] && !window.searchFieldHasFocus) {
            this.setSidebarVisible();
        }
    }

    handleScreenResize(event) {
        const isDeviceScreen = checkMobileScreen(event.target);

        this.setDeviceViewport(isDeviceScreen);
    }

    handleHashChange() {
        if (!this.state.deviceViewport) return;

        this.setSidebarVisible(false);
    }

    render() {
        return (
            <AppViewBlock
                isDeviceViewport={this.state.deviceViewport}
                isSidebarVisible={this.state.sidebarOpened}
            >
                <GlobalStyles />

                <SidebarVisibilityToggler
                    isVisible={this.state.sidebarOpened}
                    isMobile={this.state.deviceViewport}
                    onClick={() => {
                        this.setSidebarVisible(!this.state.sidebarOpened);
                    }}
                />
                <AppSidebar
                    searchField={this.props.searchField}
                    navigation={this.props.navigation}
                ></AppSidebar>

                <Content>{this.props.content}</Content>
            </AppViewBlock>
        );
    }
}

export default AppView;
