import React from 'react';

import './navigation.scss';

import NavigationSection from '../navigation-section/navigation-section';

class Navigation extends React.PureComponent {
    render() {
        const { sections, expandAll, currentHash } = this.props;

        return (
            <nav className="styleguide-navigation">
                {sections.map((section, key) => {
                    const { name, isOpened, components } = section;

                    return (
                        <div className="styleguide-navigation__section" key={key}>
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
                        </div>
                    );
                })}
            </nav>
        );
    }
}

export default Navigation;
