# Badoo Styleguide

[![npm version](https://badge.fury.io/js/badoo-styleguide.svg)](https://badge.fury.io/js/badoo-styleguide)

**[Work in progress](#to-do)**: This is a styleguide used by the frontend team in [Magiclab](https://magiclab.co/), at the moment we are in the process of open sourcing it. Just working out some issues, cleaning up the API and adding documentation.

## Table of contents

- [Getting started](#getting-started)
- [How to define and document components](#how-to-define-and-document-components)
- [Examples](#examples)
- [Visual helpers](#visual-helpers)
- [Debugging](#debugging)
- [ToDo](#to-do)

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
     * This function will apply provided actions during render of component
     * @optional
     */
    actionOnRender() {
        // eslint-disable-next-line no-undef
        if (document & !document.querySelector('body').classList) {
            // eslint-disable-next-line no-undef
            document.querySelector('body').classList.add('test')
        }
    },

    /**
     * Set it to true if you want to handle reset css & and default minimal css
     * for styleguide outside of project
     * equals to both noDefaultStyleguideStyles & noDefaultStyleguideStyles
     * set to true
     * @optional
     */
    noDefaultGlobalStyles: false,

    /**
     * Set it to true if you want to switch off default Styleguide
     * minimal style reset.
     * @optional
     */
    noDefaultStyleguideStyles: false,

    /**
     * Set it to true if you want to switch off normalize used for reset
     * of styles
     * @optional
     */
    noDefaultNormalize: false,

    /**
     * Set it to true if you want to get rid of some common flacky tests in VRT
     * @optional
     */
    useStylesForVRT: false,

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
     * This function will supply babel config object directly to babel-loader
     * for list of options, please refer to https://babeljs.io/docs/en/config-files
     * @optional
     * @returns Object
     */
    getBabelConfig() {
        return {...};
    }

    /**
     * This function will supply options directly to babel/parser
     * for list of options, please refer to https://babeljs.io/docs/en/babel-parser
     * @optional
     * @returns Array<String>
     */
    getBabelParserOptions() {
        return ['classProperties'];
    },

    /**
     * Set it to true if you need to apply babel-loader with config to typecsript code
     * @optional
     */
    applyBabelToTypescriptCode: true,

    /**
     * Set not standart path fot tsconfig for the project
     * default – undefined, resolves to path.resolve(process.cwd(), './tsconfig.json');
     * @optional
     */

    tsConfigPath: path.resolve(process.cwd(), './tsconfig-new.json');

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

    // Return an array of all folders, where
    // we need to look for components
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
     * Returns the webpack loaders list for usage before component props eevaluation
     * @param {string} path - The "path" node module to help you resolve any paths
     * @returns Array<Object, string>
     */

    getLoadersForComponents({ path }) {
        return ['babel-loader'];
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

## How to define and document components

Loaders `js-component` and `ts-component` use `react-docgen` for documentation generation. We check for all exported definitions in files from `getSections` components section. Firstly, we look for the the filename (any filename case or convention), comparing it to the found definitions. If we don't have any definition, we use fallback for the first found definition (previous behaviour). Please use `--debug` for showing these fallbacks in console.

this is example of how to set component in section in config:

```js
module.exports = {
    // part of config
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
};
```

this is a code of component:

```js
interface MyComponentProps {
    name: string;
}

const MyComponent: React.FunctionComponent<MyComponentProps> = props => {
    const { name } = props;

    return <div>The name is {name}!</div>;
};

export default MyComponent;
```

## Examples

* [Basic example](https://github.com/badoo/styleguide/tree/master/examples/basic)
* [Typescript project example](https://github.com/badoo/styleguide/tree/master/examples/typescript)

## Visual helpers

For easier work with different devices / media-queries we introduced several components:

* `StyleguidePlaceholder` returns mockup of component with provided parameters
* `StyleguideStatic` returns image src from [placeholder.com](https://placeholder.com) with provided parameters
* `StyleguideCell` returns component and its `legend`
* `StyleguideDeviceFrame` returns one of predefined frames, based on mobile device aspect-ratio
* `StyleguideDeviceGroup` returns set of predefined frames, based on mobile device aspect-ratio

```js

import { getImageUrl } from 'badoo-styleguide';

```

## Debugging

Pass `--debug` flag to the command line to get additional debug information.

```bash
yarn badoo-styleguide --config=PATH_TO_STYLEGUIDE_CONFIG.js --debug
```

## To Do

* [ ] Branding/Logo
* [ ] Simplify configuration needed
* [ ] Add example projects
* [ ] Explain the philosophy/goals/anti-goals/tradeoffs/pros/cons/roadmap behind inventing another styleguide
* [ ] Add Travis builds
* [ ] Add contribution guide
* [ ] Consider splitting out into styleguide/react and styleguide/react-native to reduce npm dependencies needed upon installation
* [ ] Move dependencies which are used strictly for development into devDependencies
