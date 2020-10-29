import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './components/sidebar/sidebar';
import SearchField from './components/search-field/search-field';
import Navigation from './components/navigation/navigation';
import Content from './components/content/content';
import Section from './components/section/section';
import Component from './components/component/component';
import AppViewComponent from '././components/app-view/app-view';
import AppViewGlobalStyles from './app-global-styles';

class AppView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            component: null,
            sections: [],
            isSidebarVisible: true,
        };

        this.checkDisplayedComponent = this.checkDisplayedComponent.bind(this);
        this.checkCurrentSection = this.checkCurrentSection.bind(this);
        this.handleSidebarToggleClick = this.handleSidebarToggleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        this.checkCurrentSection();
        this.checkDisplayedComponent();

        window.addEventListener('keyup', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeyDown);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentHash !== this.props.currentHash) {
            this.checkDisplayedComponent();
            this.checkCurrentSection();
        }

        if (this.props.sections !== prevProps.sections) {
            this.setState({
                sections: mapPropsToSections(this.props.sections, this.props.currentHash),
            });
        }
    }

    render() {
        return (
            <AppViewComponent>
                <AppViewGlobalStyles />
                <Sidebar
                    isVisible={this.state.isSidebarVisible}
                    onClickToggle={this.handleSidebarToggleClick}
                >
                    <SearchField
                        value={this.props.searchQuery}
                        onChange={this.props.onSearchFieldChange}
                    />
                    <Navigation
                        expandAll={!!this.props.searchQuery}
                        currentHash={this.props.currentHash}
                        sections={this.state.sections}
                    />
                </Sidebar>
                <Content isExpanded={!this.state.isSidebarVisible}>
                    {this.state.component ? (
                        <Section content={this.state.component} />
                    ) : (
                        <Component
                            name={'Welcome!'}
                            description={
                                'Style guide is a tool to illustrate, sandbox and test your components.'
                            }
                        />
                    )}
                </Content>
            </AppViewComponent>
        );
    }

    setSidebarVisibility() {
        this.setState(state => ({ isSidebarVisible: !state.isSidebarVisible }));
    }

    handleKeyDown(event) {
        if (event.keyCode === 83) {
            this.setSidebarVisibility();
        }
    }

    checkCurrentSection() {
        this.setState({
            sections: mapPropsToSections(this.props.sections, this.props.currentHash),
        });
    }

    checkDisplayedComponent() {
        const { currentHash, sections } = this.props;

        let component;

        const section = findMatchingSection(sections, currentHash);
        component = !!section && findMatchingComponent(section.components, currentHash);

        this.setState({
            component,
        });
    }

    handleSidebarToggleClick() {
        this.setSidebarVisibility();
    }
}

function mapPropsToSections(sections, hash) {
    return sections.map(section =>
        Object.assign({}, section, {
            isOpened: Boolean(findMatchingComponent(section.components, hash)),
        })
    );
}

export function findMatchingSection(sections = [], hash) {
    return sections.filter(section => !!findMatchingComponent(section.components, hash))[0] || null;
}

export function findMatchingComponent(components = [], hash) {
    return components.filter(component => component.url === hash)[0] || null;
}

AppView.propTypes = {
    currentHash: PropTypes.string,
    sections: PropTypes.array,
    searchQuery: PropTypes.string,
    onSearchFieldChange: PropTypes.func,
};

export default AppView;
