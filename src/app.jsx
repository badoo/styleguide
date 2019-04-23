import React, { Component } from 'react';

import Sidebar from './components/sidebar';
import Content from './components/content';
import Section from './components/section';
import Navigation from './components/navigation';
import SearchField from './components/search-field';

const VRT_URL = 'vrt';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleHashChange = this.handleHashChange.bind(this);

        this.state = {
            searchQuery: null,
            hash: window.location.hash.substr(1),
            sections: [],
            defaultSections: [],
        };
    }

    getDefaultSections() {
        return this.state.defaultSections.map(({ name, components }) => ({
            name,
            components: components.map(component => component),
        }));
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.handleHashChange);
    }

    // Needed for hot loader
    static getDerivedStateFromProps(props, state) {
        const configSections = props.config.getSections();
        const testPattern = props.config.testPattern;

        let sections = processConfigSections({ configSections, testPattern });

        if (state.searchQuery) {
            sections = sections.filter(section => {
                const components = section.components.filter(component => {
                    const searchValue = component.name.toLowerCase();

                    return searchValue.indexOf(state.searchQuery) !== -1;
                });

                if (components.length > 0) {
                    section.isOpened = true;
                    section.components = components;

                    return true;
                } else {
                    return false;
                }
            });
        }

        return {
            hash: window.location.hash.substr(1),
            sections,
            defaultSections: processConfigSections({ configSections, testPattern }),
        };
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    handleHashChange() {
        this.setState({
            hash: window.location.hash.substr(1),
        });
    }

    getCurrentComponentAndSection(sections) {
        const result = {
            section: sections[0],
            component: sections[0].components[0],
        };

        if (!this.state.hash) {
            return result;
        }

        for (let i = 0, isFound = false; i < sections.length; i += 1) {
            for (let j = 0; j < sections[i].components.length; j += 1) {
                if (sections[i].components[j].url === this.state.hash) {
                    result.section = sections[i];
                    result.section.isOpened = true;
                    result.component = sections[i].components[j];
                    isFound = true;
                    break;
                }
            }

            if (isFound) {
                break;
            }
        }

        return result;
    }

    handleSearchChange(event) {
        const searchQuery = event.target.value.toLowerCase();
        this.setState({ searchQuery });
    }

    render() {
        if (!this.state) {
            return null;
        }

        let content = null;
        let currentUrl = null;
        const sections = this.state.sections;

        if (sections.length > 0) {
            if (this.state.hash === VRT_URL) {
                content = sections.map(({ name, components }) => (
                    <Section key={name} title={name} list={components} isVrtEnabled={true} />
                ));
            } else {
                const { section, component } = this.getCurrentComponentAndSection(sections);
                currentUrl = component.url;
                content = <Section title={section.name} list={[component]} />;
            }
        }

        return (
            <div className="styleguide">
                <Sidebar>
                    <SearchField onChange={event => this.handleSearchChange(event)} />
                    <Navigation list={sections} currentUrl={currentUrl} />
                </Sidebar>
                <Content>{content}</Content>
            </div>
        );
    }
}

export default App;

function processConfigComponent({ component, sectionName, isSpecificationPath }) {
    const meta = component.__meta;
    const dependencyResolver = component.__dependencyResolver;

    if (!dependencyResolver) {
        return null;
    }

    const isSpecPath = isSpecificationPath || defaultIsSpecificationPath;

    const testsPaths = dependencyResolver.keys().filter(key => isSpecPath(meta, key));

    const testsModules = testsPaths.map(dependencyResolver);

    const tests = getTestConfiguration(testsModules);

    return {
        url: encodeURIComponent(`${sectionName}-${meta.name}`),
        name: meta.name,
        description: meta.description,
        propTypes: meta.propTypes,
        tests,
    };
}

function getTestConfiguration(testModules) {
    return testModules
        .reduce((list, module) => {
            const variations = Object.keys(module)
                // Filter out system stuff (__meta, __dependencyResolver)
                // @todo make explicit
                .filter(exportKey => exportKey.indexOf('__') === -1)
                .map(exportKey => module[exportKey]);

            return list.concat(variations);
        }, [])
        .map(Test => ({
            name: Test.name,
            Component: Test,
        }));
}

function processConfigSection({ section: { name, components }, testPattern }) {
    return {
        name,
        components: components
            .map(component => processConfigComponent({ component, sectionName: name, testPattern }))
            .filter(Boolean),
    };
}

function processConfigSections({ configSections, testPattern }) {
    return configSections.map(section => processConfigSection({ section, testPattern }));
}

function defaultIsSpecificationPath(componentMeta, path) {
    return path.indexOf(`${componentMeta.fileNameWithoutPrefix}.spec`) !== -1;
}
