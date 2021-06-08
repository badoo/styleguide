import * as React from 'react';
import styled from 'styled-components';
import Pagestyles from './page-styles';
import Sidebar from '../sidebar/sidebar';
import SidebarVisibilityToggler from '../sidebar/sidebar-toggler';
import { checkMobileScreen, deviceSizes } from '../../utilities';

const SIDEBAR_WIDTH = 300;
const KEYCODES = {
    S: 83,
};

const PageSidebar = styled(Sidebar)`
    transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${SIDEBAR_WIDTH}px;
    z-index: 1;
    will-change: transform;
`;

const PageContent = styled.main`
    padding: 32px 0;
    min-width: 0;
    position: absolute;
    background: #fff;
    right: 0;
    left: 0;
    height: 100vh;
    transition: left 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    will-change: left;

    @media screen and (min-width: ${deviceSizes.tablet}px) {
        padding: 0 32px;
        left: ${(props) => (props.sidebarOpened ? '300px' : '0px')};
    }
`;

const PageBlock = styled.div`
    background: #fff;
    display: flex;

    ${PageSidebar} {
        transform: translateX(${(props) => (props.sidebarOpened ? 0 : '-100%')});

        @media screen and (max-width: ${deviceSizes.phone}px) {
            right: 0;
            width: auto;
        }
    }
`;

class Page extends React.Component {
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
            <PageBlock
                isDeviceViewport={this.state.deviceViewport}
                sidebarOpened={this.state.sidebarOpened}
            >
                <Pagestyles />

                <SidebarVisibilityToggler
                    isVisible={this.state.sidebarOpened}
                    isMobile={this.state.deviceViewport}
                    onClick={() => {
                        this.setSidebarVisible(!this.state.sidebarOpened);
                    }}
                />
                <PageSidebar
                    searchField={this.props.searchField}
                    navigation={this.props.navigation}
                />

                <PageContent sidebarOpened={this.state.sidebarOpened}>
                    {this.props.content}
                </PageContent>
            </PageBlock>
        );
    }
}

export default Page;
