# Changelog

## v0.0.34-alpha.2
* Move `cache-loader` to dependencies for reducing dependencies in consumers
* Proccessing of arguments now in one module
* Caching now works by default, we switch it off only if `--buildDir` parameter defined

## v0.0.34-alpha.1
* Remove unused loader
    * `ts-loader`
* Add `cache-loader` for speeding up the following builds
* Add `--ci` option for switching off cache during the build
* Remove unused dependencies
    * `react-svg-loader`
    * `raw-loader`
    * `ts-loader`
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
