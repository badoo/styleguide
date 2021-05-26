import * as React from 'react';
import styled from 'styled-components';

const SidebarBlock = styled.aside`
    -webkit-font-smoothing: antialiased;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f0f0f0;
    border-right: 1px solid #f0f0f0;
    width: inherit;
`;

const SidebarHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
    flex: 0 0 auto;
`;

const SidebarNavigation = styled.div`
    flex: 1 1 auto;
    overflow-y: auto;
`;

const SidebarSearchField = styled.div`
    width: 100%;
    padding: 0 16px;
`;

const SidebarLogo = styled.div`
    width: 32px;
    height: 32px;
    margin-bottom: 8px;
`;

const Sidebar = (props) => {
    return (
        <SidebarBlock className={props.className}>
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

                <SidebarSearchField>{props.searchField}</SidebarSearchField>
            </SidebarHeader>

            <SidebarNavigation>{props.navigation}</SidebarNavigation>
        </SidebarBlock>
    );
};
export default Sidebar;
