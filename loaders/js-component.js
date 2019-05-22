const path = require('path');
const reactDocs = require('react-docgen');
const loaderUtils = require('loader-utils');
const { isDebug } = require('../build-arguments');

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
        const doc = reactDocs.parse(source, null, null, {
            // Babel parser doesn't like it if you pass config
            // but don't pass the file to scan other configs from
            // even though you explicitly don't want to use babelrc
            filename: '',
        });

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
                          type: originalProp.type.name,
                          required: originalProp.required,
                          description: originalProp.description,
                      };

                      if (originalProp.defaultValue) {
                          types[key].defaultValue = originalProp.defaultValue.value;
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
        } else {
            results = `${source}
            export const __meta = ${JSON.stringify(meta)};
            export const __dependencyResolver = require.context('./', true, /\.(j|t)sx?/);`;
        }
        /* eslint-enable no-useless-escape */
    } catch (err) {
        if (!/Multiple exported component definitions found/.test(err)) {
            const componentPath = this.resourcePath.replace(foundComponentRoot, '');
            console.warn(componentPath, isDebug ? err : err.message);
        }

        results = source;
    }

    return results;
};
