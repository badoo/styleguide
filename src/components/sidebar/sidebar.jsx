import * as React from 'react';
import styled from 'styled-components';

const SidebarBlock = styled.aside`
    overflow-x: hidden;
    width: 300px;
    -webkit-font-smoothing: antialiased;
    transition: transform 0.2s cubic-bezier(0.87, 0, 0.13, 1);
    transition-delay: ${props => (props.isVisible ? '.2s' : '0s')};
    transform: ${props =>
        props.isVisible ? 'translate3d(0px, 0px, 0px)' : 'translate3d(-100%, 0px, 0px)'};
    will-change: transform;
`;

const SidebarContent = styled.div`
    position: fixed;
    background: #f0f0f0;
    border-right: 1px solid #f0f0f0;
    width: inherit;
    overflow-y: scroll;
    top: 0;
    left: 0;
    bottom: 0;
`;

const SidebarHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
    padding-top: 16px;
`;

const SidebarLogo = styled.div`
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
`;

const SidebarVisibilityToggler = styled.div`
    position: fixed;
    z-index: 1;
    cursor: pointer;
    width: 24px;
    height: 24px;

    svg {
        fill: currentColor;
    }
`;

const SidebarOpenIcon = styled(SidebarVisibilityToggler)`
    top: 16px;
    left: 16px;
    transform: ${props =>
        props.isVisible ? 'translate3d(-50px, 0px, 0px)' : 'translate3d(0px, 0px, 0px)'};
    transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
    transition-delay: ${props => (props.isVisible ? '0' : '0.3s')};
`;

const SidebarCloseIcon = styled(SidebarVisibilityToggler)`
    top: 16px;
    left: 316px;
    transform: ${props => (props.isVisible ? 'scale(1)' : 'scale(0.5)')};
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    transition-delay: ${props => (props.isVisible ? '.4s' : '0')};
    opacity: ${props => (props.isVisible ? 1 : 0)};
`;

const Sidebar = ({ onClickToggle, isVisible, children }) => {
    return (
        <React.Fragment>
            <SidebarCloseIcon isVisible={isVisible} onClick={onClickToggle}>
                <svg id="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M6.23 4.81A1 1 0 004.8 6.23L10.6 12 4.8 17.77a1 1 0 101.42 1.42L12 13.4l5.78 5.78a1 1 0 001.4-1.42L13.42 12l5.78-5.77a1 1 0 10-1.41-1.42L12 10.6 6.23 4.8z" />
                </svg>
            </SidebarCloseIcon>

            <SidebarOpenIcon isVisible={isVisible} onClick={onClickToggle}>
                <svg id="open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15">
                    <path d="M0 1a1 1 0 011-1h18a1 1 0 110 2H1a1 1 0 01-1-1zM0 7.03a1 1 0 011-1h18a1 1 0 110 2H1a1 1 0 01-1-1zM1 12.06a1 1 0 100 2h18a1 1 0 000-2H1z" />
                </svg>
            </SidebarOpenIcon>

            <SidebarBlock isVisible={isVisible}>
                <SidebarContent>
                    <SidebarHeader>
                        <SidebarLogo>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
                                <rect width="44" height="44" fill="#7000E3" rx="3.9" />
                                <path
                                    fill="#FF671B"
                                    d="M28 11.3c-2.3 0-4.6 1-6 3-1.4-2-3.7-3-6-3-4.3 0-7.8 3.3-7.8 7.6 0 6.5 9.3 15 13.8 15s13.8-8.5 13.8-15c0-4.4-3.5-7.7-7.8-7.7"
                                />
                            </svg>
                        </SidebarLogo>
                    </SidebarHeader>

                    {children}
                </SidebarContent>
            </SidebarBlock>
        </React.Fragment>
    );
};

export default Sidebar;
