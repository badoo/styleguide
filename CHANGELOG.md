# Changelog

## 1.2.0-alpha.1

* Update dependencies

## 1.1.11

* Fixed `isInlined` condition

## 1.1.10

* Resolved security issues in outdated dependencies.


## 1.1.9

* Add font inlining for static build of styleguide.

## 1.1.8

* Add support for material-ui `withStyles` HOC.

## v1.1.7

* Add design fix for menu.

## v1.1.6

* fix markup bug with `styled-components` and `babel-core@7.4.0`.

## v1.1.5

* Update dependencies.

## v1.1.4

* Update dependencies.

## v1.1.3

* Add `navigation` extra UX improvements.

## v1.1.2

* Add `navigation` UX improvements.

## v1.1.1

* Fix `navigation` styles for case, when menu content doesn't fit in screen.

## v1.1.0

* Add fix for `styleguide-iframe` for components, which depend on parents dimensions.
* Update react-docgen props resolver to support.
* Add logs for erros during `js-component`, `ts-component` stage.
* Fix search and sidebar toggle function collision, introduced in 1.0.0

## v1.0.0

* Updated `react-docgen`
* **Attention**: Added possible breaking change - `id` in `Section` now is `data-id`.
* Added toggle function for sidebar.
* Added active state for navigation section.
* Added responsive design for the StyleGuide App.

## v0.0.82

* Add compilations only to es6 modules for bundle.
* Reduce bundle size.

## v0.0.81

* Add support for react-dom hot-reload.
* Update dependencies.

## v0.0.80

* Add support for exceptions for typescript modules, which should not be a part of bundle via `getSections` function.

## v0.0.79

* Update peerDependencies.

## v0.0.78

* Add support for digits in regexp for `getSections` function.

## v0.0.77

* Update dependencies.
* Update regexp for `getSections` function.

## v0.0.76

* Fix bug with doubled dependencies via peerDependencies.

## v0.0.75

* Add `jest-styled-components` for test-coverage.

## v0.0.74

* Add fix for covering several requires in one line in components definition for `getSections` function.

## v0.0.73

* Add fix for firefox iframe bug.

## v0.0.72

* Add focus styles for for search-input.

## v0.0.71

* Fix bug for components with names ends with 'js', 'jsx', 'ts', 'tsx', when it has more than 1 test case.

## v0.0.70

* revert fix for safe generation of vrt-locators of test from v.0.0.66

## v0.0.69

* Change to the order of elements in VRT index

## v0.0.68

* Fix for empty sections list

## v0.0.67

* Fix for empty page

## v0.0.66

* Fixed duplication of tests. Add warning for double tests in console.
* Add safe generation of vrt-locators, based on section, components IDS for VRT.

## v0.0.65

* Add support for tsconfig option for test scenarios:

```json
    compilerOptions": {
        "target": "ESNext",
    }
```

## v0.0.64

* Add visual helper `styleguide-iframe` for using iframes inside styleguide.
* Add `isIframe` to `StyleguideDeviceFrame`. Now you can set content of this helper inside of iframe individially.
* Add opportunity to set all `StyleguideDeviceFrames` content inside iframes in config by `setDeviceFramesAsIframes` to true.

## v0.0.63

* Make `useStylesForVRT` work with switched off default global styles

## v0.0.62

* Add `useStylesForVRT` to config - now we cover some flaky tests in VRT by css

## v0.0.61

* Change image provider used for mocks via `getImageUrl` to up-to-date provider.
* Add inlined images generation for `getImageUrl` as default behaviour. It will fix most of flaky tests, based on faulty internet requests API stays the same, but if you want still to use external provider please set options.inlined = false for `getImageUrl`.

## v0.0.60

* Update peer-dependencies

## v0.0.59

* Add `getTypescriptCompilerOptions` to config for redefining tsconfig compiler options

## v0.0.58

* Add `tsConfigPath` control to config. By default we resolve default path for tsconfig:

```js

path.resolve(process.cwd(), './tsconfig.json');

```

## v0.0.57

* Add `applyBabelToTypescriptCode` control in config

## v0.0.56

* Divide resolving modules in webpack between consumers and styleguide in order to avoid duplication of modules in bundles. More info is [here](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react)

## v0.0.55

* Provide examples of how components are defined & documented

## v0.0.54

* Provide details about props in `propTypes` of `Section` component

## v0.0.53

* Limit test-coverage scope and remove extra dependedencies.

## v0.0.52

* Loaders now always assigns proper doc to component in case of several functional components definitions in one file.
* Remove unused `filePath`, `fileName` from components definitions

## v0.0.51

* `getSectionComponents` deprecated, now we use `getSections` and `getComponentRoots` to limit scope of webpack build only to components enlisted in `getSections`. No longer we need for having 2 paths declarations in config.

## v0.0.50

* Add support for `HOC` components (classes, React.components, React.pureComponents)

## v0.0.49

* Add test-coverage via `jest`, `react-test-render`, `enzyme` to 100%

## v0.0.48

* Add improved size props for `styleguide-device-frame`

## v0.0.47

* Make import for visual helpers easier

## v0.0.46

* Move `actionOnRender` calls in `componentDidMount`, `componentDidUpdate`

## v0.0.45

* Add [visual-helpers](https://github.com/badoo/styleguide/tree/master/visual-helpers/) components for prototyping

## v0.0.44

* Fix speed of build by setting up explicitly `transpileOnly` for `ts-loader`. It previously was set indirectly by [happypackmode](https://github.com/TypeStrong/ts-loader#happypackmode)
* Add `onlyCompileBundledFiles` to increase speed of `ts-loader`
* Add `react-docgen-typescript` for fallback as solution for multiple import / export case in one module.

## v0.0.43

* Remove interfering css-styles from global scope
* Return opportunity to set parser options to `react-docgen` for props-generation via `getBabelParserOptions`

## v0.0.42

* Add `actionOnRender` - this function will apply provided actions during render of component
* `react-docgen-typescript` removed - it still doesn't work on large projects due to complexity of tsconfig configurations

## v0.0.41

* Add `react-docgen-typescript` as solution for multiple import / export case in one module

## v0.0.40

* Add node-sass tar resolution

## v0.0.39

* Add css/scss support from the box

## v0.0.38

* Add `getLoadersForComponents` to help set loaders in config of webpack before props extraction from react-components
* Removed `happy-hack` due to low impact on speed

## v0.0.37

* Add reset for internal css styles of styleguide via `noDefaultGlobalStyles`, `noDefaultStyleguideStyles` ,`noDefaultNormalize`
* Move component scss to css-in-js

## v0.0.36

* Add opportunity to set parser options to `react-docgen` for props-generation via `getBabelParserOptions`

## v0.0.35

* Cleanup of `get-webpack-config`

## v0.0.34-beta.6

* Move custom handler `function-component-params-auto-definition` out of projects scope to separate module

## v0.0.34-beta.5

* Add minimal support for tsType from `react-docgen`
* Add support for UI components without props or props definition in `function-component-params-auto-definition`
* Add custom handler `function-component-params-auto-definition` for support types for props of react.functionComponents, defined in type of component
* Deprecate `--no-props-for-tsx-components` due to faster builds for ts-files with `react-docgen` custom hanlder
* Remove of `react-docgen-typescript` from project

## v0.0.34-beta.4

* Update `react-docgen` to 5.3.0
* Change `node-scss` to `styled-components` for internal components

## v0.0.34-beta.3

* Add new function `getSectionComponents` to make loading of components faster.

## v0.0.34-beta.2

* Fix `js-component` loader showed error on loading ts-component after transpliled with babel

## v0.0.34-beta.1

* Add `--no-props-for-tsx-components` for fast builds of typescript react-components
* Add `getExceptionForLoaders` function for adding custom exceptions for loaders

## v0.0.34-alpha.6

* Move get-babel-options to separate module

## v0.0.34-alpha.5

* Add skip of spec-files during generating of documentation stage
* Divide loader `ts-component` into several functions for readability

## v0.0.34-alpha.4

* Update `typescript` to 3.7.5 for general compatibility

## v0.0.34-alpha.3

* Add `cache-loader` for speeding up the following builds, not in use with `--buildDir` param
* Remove unused dependencies
  * `react-svg-loader`
  * `raw-loader`
  * `resolve-url-loader`
  * `react-arc`
  * `react-native-svg-web`
  * `react-native-web`
  * `react-native-web-linear-gradient`

## v0.0.33

* Fix race condition for `browserSetup` called after rendering components in styleguide.

## v0.0.32

* Fix the definition files support for TypeScript with Javascript file imports: don't pass them to special loader.

## v0.0.31

* Add `getComponentWrapper` function to config to wrap the content of sandboxes, for example to use special context providers
* Fix bugs

## v0.0.30

* Add VRT locators to navigation links and sandboxes
  * `data-vrt-locator="link"` for navigation items
  * `data-vrt-locator="sandbox"` for sandbox containers with `data-name` attribute with function name
  * `data-vrt-locator="sandbox-content` for inner sandbox content

## v0.0.29

* Fixed issue with meta information for components without proper reactDocs: both export and module.exports supported

## v0.0.28

* Fixed issue with HOC

## v0.0.27

* Fixed issue with detection of re-exported ES6 components

## v0.0.26

* Fixed issue with babel processing files which don't need to be processed

## v0.0.25

* Examples moved to a separate folder
* Resizable sandboxes don't affect overflow

## v0.0.24

* Bugfix for VRT results in v0.0.23 – extra pixel on top removed, VRT results are equal to v0.0.22

## v0.0.23

* Ability to resize sandboxes (configurable)
* Ability to set min and max width for sandboxes (configurable)

## v0.0.22

* Error output is more user friendly now

## v0.0.21

* Updated dependencies to fix security vulnerabilities

## v0.0.20

* Navigation is VRT compatible – you can get the list of components with css selector

## v0.0.19

* Fixed errors in 0.0.18
* Changelog reversed

## v0.0.18

* Added TypeScript support
* Hot load structure updated
* Styleguide Components simplified

## v0.0.17

* Remove unused dependency of icon

## v0.0.16

* Refactor how the styleguide configuration works
  * Deprecated babelConfig object in favour of getBabelConfig()
  * Instead of hacky merging let the user return loaders for files using getLoaderForModule
  * Move getComponentRoots out of getWebpackConfig

## v0.0.15

* Fixed compilation of styleguide into static folder
* Merged [pull/2](https://github.com/badoo/styleguide/pull/2)
