const path = require('path');
const reactDocsTS = require('react-docgen-typescript');
const loaderUtils = require('loader-utils');
const { isDebug } = require('../build-arguments');

function setPropsFromDoc(doc) {
    function setProps (types, key) {
        const originalProp = doc.props[key];

        types[key] = {
            type: originalProp.type.name.replace('| undefined', ''),
            description: originalProp.description,
        };

        // props with default value are not required
        if (originalProp.defaultValue) {
            types[key].defaultValue = originalProp.defaultValue.value;
        } else {
            types[key].required = originalProp.required;
        }

        return types;
    }

    return Object.keys(doc.props).reduce(setProps, {})
}

function setResults(tsConfigPath, resourcePath, source) {
    try {
        const docs = reactDocsTS.withCustomConfig(tsConfigPath).parse(resourcePath);

        if (!docs[0]) {
            return source;
        }

        const doc = docs[0];
        const fileName = path.basename(resourcePath);
        const fileNameWithoutPrefix = fileName.split('.').slice(0, -1).join('.');
        const propTypes = doc.props ? setPropsFromDoc(doc) : null;

        const meta = {
            name: doc.displayName,
            description: doc.description,
            filePath: resourcePath,
            fileName,
            fileNameWithoutPrefix,
            propTypes,
        };

        /* eslint-disable no-useless-escape */
        return `${source}
            export const __meta = ${JSON.stringify(meta)};
            export const __dependencyResolver = require.context('./', true, /\.(j|t)sx?/);`;
        /* eslint-enable no-useless-escape */
    } catch (err) {
        console.warn(path.basename(resourcePath), isDebug ? err : err.message);

        return source;
    }
}

module.exports = function(source) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = loaderUtils.getOptions(this);
    const componentRoots = options.componentRoots;
    const tsConfigPath = options.tsConfigPath;

    const isComponent = componentRoots.some(componentRoot => {
        // We only want to componentise files in current working directory
        return this.resourcePath.indexOf(componentRoot) !== -1;
    });

    if (!isComponent) {
        return source;
    }

    return setResults(tsConfigPath, this.resourcePath, source);
};
