import React from 'react';
import styled from 'styled-components';

import NavigationSection from '../navigation-section/navigation-section';

const NavigationBlock = styled.nav`
    position: relative;
    max-height: 100vh;
    font-family: sans-serif;
`;

const NavigationSectionBlock = styled.div`
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
`;

class Navigation extends React.PureComponent {
    render() {
        const { sections, expandAll, currentHash } = this.props;

        return (
            <NavigationBlock>
                {sections.map((section, key) => {
                    const { name, isOpened, components } = section;

                    return (
                        <NavigationSectionBlock key={key}>
                            <NavigationSection
                                key={name}
                                name={name}
                                isOpened={isOpened || expandAll}
                                components={components.map(item => ({
                                    name: item.name,
                                    url: item.url,
                                    isActive: item.url === currentHash,
                                }))}
                            />
                        </NavigationSectionBlock>
                    );
                })}
            </NavigationBlock>
        );
    }
}

export default Navigation;
