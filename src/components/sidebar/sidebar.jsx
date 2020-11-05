import * as React from 'react';
import styled from 'styled-components';

const SidebarBlock = styled.aside`
    -webkit-font-smoothing: antialiased;
    position: relative;
`;

const SidebarContent = styled.div`
    background: #f0f0f0;
    border-right: 1px solid #f0f0f0;
    width: inherit;
    overflow-y: auto;
    min-height: 100%;
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

const Sidebar = props => {
    return (
        <SidebarBlock className={props.className}>
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

                {props.children}
            </SidebarContent>
        </SidebarBlock>
    );
};

export default Sidebar;
