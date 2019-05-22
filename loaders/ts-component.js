const path = require('path');
const reactDocsTS = require('react-docgen-typescript');
const loaderUtils = require('loader-utils');
const { isDebug } = require('../build-arguments');

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

    let results;

    try {
        const docs = reactDocsTS.withCustomConfig(tsConfigPath).parse(this.resourcePath);

        if (!docs[0]) {
            return source;
        }

        const doc = docs[0];
        const fileName = path.basename(this.resourcePath);

        const meta = {
            name: doc.displayName,
            description: doc.description,
            filePath: this.resourcePath,
            fileName,
            fileNameWithoutPrefix: fileName
                .split('.')
                .slice(0, -1)
                .join('.'),
            propTypes: doc.props
                ? Object.keys(doc.props).reduce(function(types, key) {
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
                }, {})
                : null,
        };

        /* eslint-disable no-useless-escape */
        results = `${source}
            export const __meta = ${JSON.stringify(meta)};
            export const __dependencyResolver = require.context('./', true, /\.(j|t)sx?/);`;
        /* eslint-enable no-useless-escape */
    } catch (err) {
        console.warn(path.basename(this.resourcePath), isDebug ? err : err.message);

        results = source;
    }

    return results;
};
