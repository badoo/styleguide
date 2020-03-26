const path = require('path');
const reactDocs = require('react-docgen');
const reactDocsTS = require('react-docgen-typescript');
const setParamsTypeDefinitionFromFunctionType = require('typescript-react-function-component-props-handler');
const loaderUtils = require('loader-utils');
const { isDebug } = require('../build-arguments');

function setMeta(doc, fileName, resourcePath, source) {
    const meta = {
        name: doc.displayName,
        description: doc.description,
        filePath: resourcePath,
        fileName,
        fileNameWithoutPrefix: fileName
            .split('.')
            .slice(0, -1)
            .join('.'),
        propTypes: doc.props
            ? Object.keys(doc.props).reduce(function(types, key) {
                  const originalProp = doc.props[key];
                  const type = originalProp.type ? originalProp.type.name : key;

                  types[key] = {
                      type: originalProp.tsType ? originalProp.tsType.name : type,
                      required: originalProp.required,
                      description: originalProp.description,
                  };

                  if (originalProp.defaultValue) {
                      types[key].defaultValue = originalProp.defaultValue.value;
                      types[key].type = originalProp.defaultValue.value
                          .split('.')
                          .slice(0, -1)
                          .join('.');
                  }

                  return types;
              }, {})
            : null,
    };

    // Simple check to use if we are using ES6 or CJS
    /* eslint-disable no-useless-escape */
    if (source.indexOf('module.exports') !== -1) {
        results = `${source}
        module.exports.__meta = ${JSON.stringify(meta)};
        module.exports.__dependencyResolver = require.context('./', true, /\.(j|t)sx?/);`;
    } else if (/export\s+default/.test(source)) {
        results = `${source}
        ${doc.displayName}.__meta = ${JSON.stringify(meta)};
        export const __dependencyResolver = require.context('./', true, /\.(j|t)sx?/);`;
    } else {
        results = `${source}
        export const __meta = ${JSON.stringify(meta)};
        export const __dependencyResolver = require.context('./', true, /\.(j|t)sx?/);`;
    }
    /* eslint-enable no-useless-escape */

    return results;
}

function useGenericParser(source, options) {
    return reactDocs.parse(
        source,
        null,
        [setParamsTypeDefinitionFromFunctionType, ...reactDocs.defaultHandlers],
        {
            filename: '',
            parserOptions: {
                plugins: options.babelParserOptions
                    ? ['typescript', 'jsx', options.babelParserOptions]
                    : ['typescript', 'jsx'],
            },
        }
    );
}

function useTSParser(resourcePath, tsConfigPath) {
    return reactDocsTS.withCustomConfig(tsConfigPath).parse(resourcePath, {
        filename: '',
    });
}

module.exports = function(source) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = loaderUtils.getOptions(this);
    const componentRoots = options.componentRoots;

    let isComponent = false;
    let foundComponentRoot = null;

    componentRoots.forEach(componentRoot => {
        // We only want to componentise files in current working directory
        if (this.resourcePath.indexOf(componentRoot) !== -1) {
            isComponent = true;
            foundComponentRoot = componentRoot;
        }
    });

    if (!isComponent) {
        return source;
    }

    let results;

    try {
        const doc = useGenericParser(source, options);
        const fileName = path.basename(this.resourcePath);

        results = setMeta(doc, fileName, this.resourcePath, source);
    } catch (err) {
        if (err.message === `No suitable component definition found.`) {
            const tsConfigPath = options.tsConfigPath;
            const docs = useTSParser(this.resourcePath, tsConfigPath);

            if (docs && source && this.resourcePath) {
                const fileName = path.basename(this.resourcePath);

                if (!docs[0]) {
                    return source;
                }

                let doc = docs[0];

                doc.displayName =
                    doc.displayName.charAt(0).toUpperCase() + doc.displayName.slice(1);

                results = setMeta(doc, fileName, this.resourcePath, source);

                return results;
            }
        }

        if (!/Multiple exported component definitions found/.test(err)) {
            const componentPath = this.resourcePath.replace(foundComponentRoot, '');
            console.warn(componentPath, isDebug ? err : err.message);
        }

        /* eslint-disable no-useless-escape */
        if (source.indexOf('module.exports') !== -1) {
            results = `${source}
            module.exports.__dependencyResolver = require.context('./', true, /\.(j|t)sx?/);`;
        } else if (/export\s+default/.test(source)) {
            results = `${source}
            export const __dependencyResolver = require.context('./', true, /\.(j|t)sx?/);`;
        } else {
            results = `${source}
            export const __dependencyResolver = require.context('./', true, /\.(j|t)sx?/);`;
        }
        /* eslint-enable no-useless-escape */
    }

    return results;
};
