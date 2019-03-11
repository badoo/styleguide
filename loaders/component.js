const reactDocs = require('react-docgen');
const loaderUtils = require('loader-utils');

module.exports = function(source) {
    if (this.cacheable) {
        this.cacheable();
    }

    const options = loaderUtils.getOptions(this);

    // We only want to componentise files in current working directory
    if (this.resourcePath.indexOf(options.cwd) === -1) {
        return source;
    }

    let results;

    try {
        const doc = reactDocs.parse(source);

        const meta = {
            name: doc.displayName,
            description: doc.description,
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

        /* eslint-disable no-useless-escape */
        results = `${source}
        export const __meta = ${JSON.stringify(meta)};
        export const __dependencyResolver = require.context('./', true, /\.jsx?/);`;
        /* eslint-enable no-useless-escape */
    } catch (err) {
        if (!/Multiple exported component definitions found/.test(err)) {
            console.warn(this.resourcePath, err);
        }

        results = source;
    }

    return results;
};
