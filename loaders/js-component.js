const path = require('path');
const reactDocs = require('react-docgen');
const setParamsTypeDefinitionFromFunctionType = require('typescript-react-function-component-props-handler');
const loaderUtils = require('loader-utils');
const { isDebug } = require('../build-arguments');

module.exports = function(source) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = loaderUtils.getOptions(this);
    let results;

    try {
        let doc = reactDocs.parse(
            source,
            reactDocs.resolver.findAllComponentDefinitions,
            [setParamsTypeDefinitionFromFunctionType, ...reactDocs.defaultHandlers],
            {
                parserOptions: {
                    filename: '',
                    plugins: options.babelParserOptions
                        ? ['jsx', ...options.babelParserOptions]
                        : ['jsx'],
                },
            }
        );
        /* currently we support the approach for the UI-architeture
        as 1 module - 1 component */
        if (doc.length && doc.length > 0) {
            const filterName = path.parse(this.resourcePath).name.replace(/-/g, '');
            doc = doc.find(item => item.displayName.toLowerCase() === filterName);
        }

        const meta = {
            name: doc.displayName,
            description: doc.description,
            fileNameWithoutPrefix: path.parse(this.resourcePath).name,
            propTypes: doc.props
                ? Object.keys(doc.props).reduce(function(types, key) {
                      const originalProp = doc.props[key];
                      const type = originalProp.type ? originalProp.type.name : key;

                      types[key] = {
                          type,
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
            export const __highOrderComponentInnerComponent = ${doc.displayName}
            export const __dependencyResolver = require.context('./', true, /\.(j|t)sx?/);`;
        } else {
            results = `${source}
            export const __meta = ${JSON.stringify(meta)};
            export const __dependencyResolver = require.context('./', true, /\.(j|t)sx?/);`;
        }
        /* eslint-enable no-useless-escape */
    } catch (err) {
        if (!/Multiple exported component definitions found/.test(err)) {
            console.warn(this.resourcePath, isDebug ? err : err.message);
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
