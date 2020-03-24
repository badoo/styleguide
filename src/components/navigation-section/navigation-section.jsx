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
    color: #000;
    font-size: 16px;
    cursor: pointer;
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
        };
    }

    componentDidUpdate(prevProps) {
        const { isOpened } = this.props;

        if (isOpened !== prevProps.isOpened || isOpened) {
            this.setState({
                isOpened: this.props.isOpened,
            });
        }
    }

    render() {
        const { name, components } = this.props;

        const onClickHandler = () =>
            this.setState(prevState => ({ isOpened: !prevState.isOpened }));

        return (
            <NavigationSectionBlock>
                <NavigationSectionName onClick={onClickHandler}>{name}</NavigationSectionName>
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
}

export default NavigationSection;
