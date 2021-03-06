import React from 'react';
import PropTypes from 'prop-types';
import SearchField from './components/search-field/search-field';
import Navigation from './components/navigation/navigation';
import Content from './components/content/content';
import Section from './components/section/section';
import Component from './components/component/component';
import Page from './components/page/page';

class AppView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            component: null,
            sections: [],
        };

        this.searchFieldRef = React.createRef();
        this.checkDisplayedComponent = this.checkDisplayedComponent.bind(this);
        this.checkCurrentSection = this.checkCurrentSection.bind(this);
    }

    componentDidMount() {
        this.checkCurrentSection();
        this.checkDisplayedComponent();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentHash !== this.props.currentHash) {
            this.checkDisplayedComponent();
            this.checkCurrentSection();
        }

        if (this.props.sections !== prevProps.sections) {
            this.setState({
                sections: this.props.sections
                    ? mapPropsToSections(this.props.sections, this.props.currentHash)
                    : [],
            });
        }
    }

    render() {
        return (
            <Page
                searchField={
                    <SearchField
                        value={this.props.searchQuery}
                        onChange={this.props.onSearchFieldChange}
                        onFocus={this.props.onSearchFieldFocus}
                        onBlur={this.props.onSearchFieldBlur}
                    />
                }
                navigation={
                    <Navigation
                        expandAll={!!this.props.searchQuery}
                        currentHash={this.props.currentHash}
                        sections={this.state.sections}
                    />
                }
                content={
                    <Content>
                        {this.state.component ? (
                            <Section content={this.state.component} />
                        ) : (
                            <Component
                                name="Welcome!"
                                description="Style guide is a tool to illustrate, sandbox and test your components."
                            />
                        )}
                    </Content>
                }
            />
        );
    }

    checkCurrentSection() {
        this.setState({
            sections: this.props.sections
                ? mapPropsToSections(this.props.sections, this.props.currentHash)
                : [],
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
}

function mapPropsToSections(sections, hash) {
    return sections.map((section) =>
        Object.assign({}, section, {
            isOpened: Boolean(findMatchingComponent(section.components, hash)),
        })
    );
}

function findMatchingSection(sections = [], hash) {
    return (
        sections.filter((section) => !!findMatchingComponent(section.components, hash))[0] || null
    );
}

function findMatchingComponent(components = [], hash) {
    return components.filter((component) => component.url === hash)[0] || null;
}

AppView.propTypes = {
    currentHash: PropTypes.string,
    sections: PropTypes.array,
    searchQuery: PropTypes.string,
    onSearchFieldChange: PropTypes.func,
    onSearchFieldFocus: PropTypes.func,
    onSearchFieldBlur: PropTypes.func,
};

export default AppView;
