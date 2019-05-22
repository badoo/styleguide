import React from 'react';

import './navigation.scss';
import NavigationSection from 'components/navigation/navigation-section';

class Navigation extends React.PureComponent {
    render() {
        const {
            sections,
            expandAll,
            currentHash,
        } = this.props;

        return (
            <nav className="styleguide-navigation">
                {sections.map(section => (
                    <NavigationSection
                        key={section.name}
                        name={section.name}
                        isOpened={section.isOpened || expandAll}
                        links={section.components.map(item => ({
                            name: item.name,
                            url: item.url,
                            isActive: item.url === currentHash
                        }))}
                    />
                ))}
            </nav>
        );
    }
}

export default Navigation;
