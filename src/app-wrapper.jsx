import React from 'react';
import App from './app';

class AppWrapper extends React.PureComponent {
    render() {
        const configSections = this.props.config.getSections();
        const isSpecificationPath =
            this.props.config.isSpecificationPath || defaultIsSpecificationPath;
        const sections = processConfigSections({ configSections, isSpecificationPath });

        return <App sections={sections} />;
    }
}

function defaultIsSpecificationPath(componentMeta, path) {
    return path.indexOf(`${componentMeta.fileNameWithoutPrefix}.spec`) !== -1;
}

function processConfigSections({ configSections, isSpecificationPath }) {
    return configSections.map(section => processConfigSection({ section, isSpecificationPath }));
}

function processConfigSection({ section: { name, components }, isSpecificationPath }) {
    return {
        name,
        components: components
            .map(component =>
                processConfigComponent({ component, sectionName: name, isSpecificationPath })
            )
            .filter(Boolean),
    };
}

function processConfigComponent({ component, sectionName, isSpecificationPath }) {
    const meta = component.default && component.default.__meta ? component.default.__meta : component.__meta;

    const dependencyResolver = component.__dependencyResolver;

    if (!dependencyResolver || !meta) {
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

export default AppWrapper;
