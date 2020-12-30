import * as React from 'react';
import styled from 'styled-components';
import { deviceSizes } from '../../utilities';

const SidebarOpenIcon = styled.div`
    position: fixed;
    z-index: 3;
    cursor: pointer;
    width: 24px;
    height: 24px;
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);

    svg {
        pointer-events: none;
        fill: currentColor;
    }

    top: 16px;
    left: 16px;
    transform: ${(props) =>
        !props.isVisible ? 'translate3d(-50px, 0px, 0px)' : 'translate3d(0px, 0px, 0px)'};
`;

const SidebarCloseIcon = styled.div`
    position: fixed;
    z-index: 3;
    cursor: pointer;
    width: 24px;
    height: 24px;
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);

    svg {
        pointer-events: none;
        fill: currentColor;
    }

    top: 18px;
    left: 260px;
    transform: scale(${(props) => (props.isVisible ? 1 : 0.5)});
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    pointer-events: ${(props) => !props.isVisible && 'none'};

    @media screen and (max-width: ${deviceSizes.phone}px) {
        right: 16px;
        left: initial;
    }
`;

const SidebarVisibilityToggler = (props) => (
    <React.Fragment>
        <SidebarOpenIcon isVisible={!props.isVisible} onClick={props.onClick}>
            <svg id="open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15">
                <path d="M0 1a1 1 0 011-1h18a1 1 0 110 2H1a1 1 0 01-1-1zM0 7.03a1 1 0 011-1h18a1 1 0 110 2H1a1 1 0 01-1-1zM1 12.06a1 1 0 100 2h18a1 1 0 000-2H1z" />
            </svg>
        </SidebarOpenIcon>
        <SidebarCloseIcon isVisible={props.isVisible} onClick={props.onClick}>
            <svg id="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M6.23 4.81A1 1 0 004.8 6.23L10.6 12 4.8 17.77a1 1 0 101.42 1.42L12 13.4l5.78 5.78a1 1 0 001.4-1.42L13.42 12l5.78-5.77a1 1 0 10-1.41-1.42L12 10.6 6.23 4.8z" />
            </svg>
        </SidebarCloseIcon>
    </React.Fragment>
);

export default SidebarVisibilityToggler;
