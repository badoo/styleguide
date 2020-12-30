import React from 'react';
import styled from 'styled-components';

const NavigationSectionBlock = styled.div`
    display: block;
`;

const NavigationSectionName = styled.div`
    position: relative;
    display: block;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    background: #fff;
    color: ${props => (props.isActive ? '#7000e3' : '#000')};
    font-size: 16px;
    cursor: pointer;
    user-select: none;
`;

const NavigationSectionComponents = styled.div`
    padding: 16px;
    display: ${props => (props.isOpened ? undefined : 'none')};
`;

const NavigationSectionComponentsItem = styled.div`
    padding: 8px 16px;
`;

const NavigationSectionComponentsItemLink = styled.a`
    text-decoration: none;
    color: ${props => (props.isActive ? '#7000e3' : '#666')};
    font-weight: ${props => (props.isActive ? 600 : undefined)};
`;

class NavigationSection extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: props.isOpened,
            isActive: false,
        };

        this.toggleSection = this.toggleSection.bind(this);
    }

    componentDidMount() {
        this.setActiveSection();
    }

    componentDidUpdate() {
        this.setActiveSection();
    }

    render() {
        const { name, components } = this.props;

        return (
            <NavigationSectionBlock>
                <NavigationSectionName
                    isActive={this.state.isActive && !this.state.isOpened}
                    onClick={this.toggleSection}
                >
                    {name}
                </NavigationSectionName>
                <NavigationSectionComponents isOpened={this.state.isOpened}>
                    {components &&
                        components.map((link, index) => {
                            const { name, url, isActive } = link;
                            const key = url || index;

                            return (
                                <NavigationSectionComponentsItem key={key}>
                                    <NavigationSectionComponentsItemLink
                                        isActive={isActive}
                                        data-vrt-locator={'link'}
                                        href={`#${url}`}
                                    >
                                        {name}
                                    </NavigationSectionComponentsItemLink>
                                </NavigationSectionComponentsItem>
                            );
                        })}
                </NavigationSectionComponents>
            </NavigationSectionBlock>
        );
    }

    setActiveSection() {
        const activeSection = this.props.components.some(({ isActive }) => isActive === true);

        this.setState({ isActive: activeSection });
    }

    toggleSection() {
        this.setState({
            isOpened: !this.state.isOpened,
        });
    }
}

export default NavigationSection;
