import React from 'react';
import AppView from './app-view';
import { defaultIsSpecificationPath, processConfigSections, processSearchQuery } from './utilities';

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
            sections: this.getSectionsFromConfig(),
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
        if (prevProps.config !== this.props.config) {
            let sections = this.getSectionsFromConfig();

            // filter them if the search mode is active
            if (this.state.searchQuery) {
                sections = processSearchQuery(this.state.searchQuery, this.getSectionsFromConfig());
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

    getSectionsFromConfig() {
        const configSections = this.props.config.getSections();
        const isSpecificationPath =
            this.props.config.isSpecificationPath || defaultIsSpecificationPath;

        return processConfigSections({ configSections, isSpecificationPath });
    }

    handleSearchChange(event) {
        const searchQuery = event.target.value.toLowerCase();

        if (searchQuery && searchQuery !== this.state.searchQuery) {
            const sections = processSearchQuery(searchQuery, this.getSectionsFromConfig());

            this.setState({ searchQuery, sections });
        } else if (!searchQuery) {
            this.setState({ searchQuery: '', sections: this.getSectionsFromConfig() });
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
