import React from 'react';

import AppView from './app-view';

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleHashChange = this.handleHashChange.bind(this);
        this.onSearchFieldChange = this.handleSearchChange.bind(this);
        this.onSearchFieldFocus = this.onSearchFieldFocus.bind(this);
        this.onSearchFieldBlur = this.onSearchFieldBlur.bind(this);

        this.state = {
            searchQuery: '',
            hash: window.location.hash.substr(1),
            sections: this.props.sections,
        };
    }

    render() {
        return (
            <AppView
                currentHash={this.state.hash}
                sections={this.state.sections}
                searchQuery={this.state.searchQuery}
                onSearchFieldChange={this.onSearchFieldChange}
                onSearchFieldFocus={this.onSearchFieldFocus}
                onSearchFieldBlur={this.onSearchFieldBlur}
            />
        );
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.handleHashChange);
    }

    componentDidUpdate(prevProps) {
        // config is updated, need to update current state sections
        if (prevProps.sections !== this.props.sections) {
            let sections = this.props.sections;

            // filter them if the search mode is active
            if (this.state.searchQuery) {
                sections = processSearchQuery(this.state.searchQuery, this.props.sections);
            }

            this.setState({ sections });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    handleHashChange() {
        this.setState({
            hash: window.location.hash.substr(1),
        });
    }

    handleSearchChange(event) {
        const searchQuery = event.target.value.toLowerCase();

        if (searchQuery && searchQuery !== this.state.searchQuery) {
            const sections = processSearchQuery(searchQuery, this.props.sections);

            this.setState({ searchQuery, sections });
        } else if (!searchQuery) {
            this.setState({ searchQuery: '', sections: this.props.sections });
        }
    }

    onSearchFieldFocus() {
        window.searchFieldHasFocus = true;
    }

    onSearchFieldBlur() {
        window.searchFieldHasFocus = false;
    }
}

export default App;

function processSearchQuery(searchQuery, sections = []) {
    const searchResultSections = [];

    if (searchQuery) {
        sections.map((section) => {
            const components = section.components.filter((component) => {
                const searchValue = component.name.toLowerCase();
                return searchValue.indexOf(searchQuery) !== -1;
            });

            if (components.length) {
                const { ...filteredSectionFields } = section;

                searchResultSections.push({
                    ...filteredSectionFields,
                    isOpened: true,
                    components,
                });
            }
        });
    }

    return searchResultSections;
}
