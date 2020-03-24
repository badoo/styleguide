# Badoo Styleguide

[![npm version](https://badge.fury.io/js/badoo-styleguide.svg)](https://badge.fury.io/js/badoo-styleguide)

**Work in progress**: This is a styleguide used by the frontend team in Badoo, at the moment we are in the process of open sourcing it. Just working out some issues, cleaning up the API and adding documentation.

## To Do

* [ ] Branding/Logo
* [ ] Simplify configuration needed
* [ ] Add example projects
* [ ] Explain the philosophy/goals/anti-goals/tradeoffs/pros/cons/roadmap behind inventing another styleguide
* [ ] Add Travis builds
* [ ] Add contribution guide
* [ ] Consider splitting out into styleguide/react and styleguide/react-native to reduce npm dependencies needed upon installation
* [ ] Move dependencies which are used strictly for development into devDependencies

## Usage

* [Getting started](#getting-started)
* [Examples](#examples)
* [Debugging](#debugging)

## Getting started

### Add styleguide dependency

```bash
yarn add badoo-styleguide --dev
```

### Create a styleguide config

Create a file called `styleguide.config.js` in your project (The name doesn't really matter).

Add the following content to the file

```js
module.exports = {
    /**
     * Set it to true if your project is a React native project
     * @optional
     */
    isReactNative: false,

    /**
     * Set it to true if you want to resize sandboxes with the resize handle
     * @optional
     */
    hasResizableSandbox: false,

    /**
     * Min-width for the sandbox wrapper (number | string)
     * default – 320
     * @optional
     */
    sandboxMinWidth: 320,

    /**
     * Max-width for the sandbox wrapper (number | string)
     * default – 960
     * @optional
     */
    sandboxMaxWidth: '100%',

    /**
     * This function will tell the styleguide if the component being included
     * is a specification/example component
     * @optional
     */
    isSpecificationPath(componentMeta, path) {
        return path.indexOf(`${componentMeta.fileNameWithoutPrefix}.spec`) !== -1;
    },

    /**
     * This function allows to set up global objects 
     * in browser environment
     * @optional
     */
    browserSetup() {
        window.parameters = true;
    }

    /**
     * This function returns element, which will be used for wrapping
     * of the sandboxes content. This element can be used for introducing
     * different extra features: context providers, props, controls
     * @optional
     * @returns {Component}
     */
    getComponentWrapper() {
        return require('MyComponent');
    },

    /**
     * This function returns array of all the elements in the styleguide
     * @optional
     * @returns Array<Object>
     */
    getSectionComponents({ path }) {
        return [
            {
                components: [path.resolve('src/components/component/component')],
            },
            {
                components: [path.resolve('src/components/error-boundary/error-boundary')],
            },
        ];
    },

    /**
     * Returns an array of all the sections in the styleguide
     * @returns Array<Object>
     */
    getSections() {
        return [
            {
                name: 'MyComponentSection',
                components: [
                    require('MyComponent'),
                ],
            },
        ];
    },

    // This method tells us the root folder of your component
    // hierarchy
    getComponentRoots({ path }) {
        return [
            path.resolve(cwd, 'src')
        ];
    },

    // This method provide list of exceptions for loaders
    getExceptionForLoaders({ path }) {
        return {
            jsLoader: path.resolve(cwd, 'src'),
            tsLoader: /src/,
        };
    },

    /**
     * Returns the webpack configuration for your module setup
     * @param {string} path - The "path" node module to help you resolve any paths
     * @returns Object
     */
    getWebpackConfig({ path }) {
        const cwd = path.resolve(__dirname, '.');

        // Any custom webpack configuration you need, this will be merged
        // using webpack-merge
        return {
            resolve: {
                modules: [
                    path.resolve(cwd, 'src/'),
                    path.resolve(cwd, 'node_modules/'),
                ],
            }
        };
    }
}
```

### Running and compiling

The styleguide can be run as a local dev server or be compiled if you want to serve it from another host.

#### Running

```yarn badoo-styleguide --config=PATH_TO_STYLEGUIDE_CONFIG.js```

**Note:** Styleguide benefits from caching results of initial build. It makes all subsequents recompilations much faster.

#### Compiling

```yarn badoo-styleguide --config=PATH_TO_STYLEGUIDE_CONFIG.js --buildDir=dist/```

Or add it to your package.json "scripts" section

```json
{
    "scripts": {
        "styleguide": "badoo-styleguide --config=PATH_TO_STYLEGUIDE_CONFIG.js",
        "styleguide:compile": "badoo-styleguide --config=PATH_TO_STYLEGUIDE_CONFIG.js --buildDir=dist/"
    }
}
```

The buildDir parameter switches off webpack-server and caching.

**Note:** The buildDir is resolved relative to where you ran "yarn" from

## Examples

* [Basic example](./examples/basic)
* [Typescript project example](./examples/typescript)

## Debugging

Pass --debug flag to the command line to get additional debug information.

```bash
yarn badoo-styleguide --config=PATH_TO_STYLEGUIDE_CONFIG.js --debug
```
