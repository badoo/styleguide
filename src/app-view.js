import React from 'react';
import PropTypes from 'prop-types';

import SearchField from './components/search-field/search-field';
import Navigation from './components/navigation/navigation';
import Content from './components/content/content';
import Section from './components/section/section';
import Component from './components/component/component';
import AppViewComponent from '././components/app-view/app-view';
import Dialog from './components/dialog/dialog';

class AppView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            component: null,
            sandbox: null,
            sections: [],
            isDialogOpened: false,
        };

        this.searchFieldRef = React.createRef();
        this.checkDisplayedComponent = this.checkDisplayedComponent.bind(this);
        this.checkSandboxLink = this.checkSandboxLink.bind(this);
        this.checkCurrentSection = this.checkCurrentSection.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    componentDidMount() {
        this.checkCurrentSection();
        this.checkDisplayedComponent();
        this.checkSandboxLink();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentHash !== this.props.currentHash) {
            this.checkDisplayedComponent();
            this.checkCurrentSection();
            this.checkSandboxLink(); //?
        }

        if (this.props.sections !== prevProps.sections) {
            this.setState({
                sections: mapPropsToSections(this.props.sections, this.props.currentHash),
            });
        }
    }

    render() {
        const { sandbox } = this.state;
        const DialogComponent = !!sandbox && sandbox.Component;

        return (
            <AppViewComponent
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

                        <Dialog
                            isOpened={this.state.isDialogOpened}
                            onClose={this.handleDialogClose}
                            title={sandbox ? sandbox.name : ''}
                            content={sandbox ? <DialogComponent /> : false}
                        />
                    </Content>
                }
            />
        );
    }

    checkSandboxLink() {
        const { sections, currentHash } = this.props;

        const sandbox = findMatchingSandbox(sections, currentHash);

        this.setState({
            sandbox,
            isDialogOpened: Boolean(sandbox),
        });
    }

    checkCurrentSection() {
        this.setState({
            sections: mapPropsToSections(this.props.sections, this.props.currentHash),
        });
    }

    checkDisplayedComponent() {
        const { currentHash, sections } = this.props;

        const section = findMatchingSection(sections, currentHash);
        const component = !!section && findMatchingComponent(section.components, currentHash);

        this.setState({
            component,
        });
    }

    handleDialogClose() {
        this.setState({ isDialogOpened: false, sandbox: null }, () => {
            // returns back to component page
            window.location.hash = window.location.hash.substr(1).split('-').slice(0, 2).join('-');
        });
    }

    handleSidebarToggleClick() {
        this.setSidebarVisibility();
    }
}

function mapPropsToSections(sections, hash) {
    return sections.map((section) =>
        Object.assign({}, section, {
            isOpened: Boolean(findMatchingComponent(section.components, hash)),
        })
    );
}

export function findMatchingSection(sections = [], hash) {
    return (
        sections.filter((section) => !!findMatchingComponent(section.components, hash))[0] || null
    );
}

export function findMatchingComponent(components = [], hash) {
    return components.filter((component) => component.url === hash)[0] || null;
}

export function findMatchingSandbox(sections, hash) {
    return (
        sections
            .flatMap((i) => i.components)
            .flatMap((i) => i.tests)
            .find((i) => i.url === hash && i) || null
    );
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
