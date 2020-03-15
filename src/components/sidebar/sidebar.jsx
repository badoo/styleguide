import React from 'react';
import styled from 'styled-components';

const SidebarBlock = styled.aside`
    overflow-x: hidden;
    width: 300px;
    -webkit-font-smoothing: antialiased;

    .styleguide-search-field {
        margin-bottom: 8px;
    }
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

class Sidebar extends React.Component {
    render() {
        return (
            <SidebarBlock>
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

                    {this.props.children}
                </SidebarContent>
            </SidebarBlock>
        );
    }
}

export default Sidebar;
