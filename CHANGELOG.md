# Changelog

## Pre-release versions
* **v0.0.30-alpha**
    * Styleguide UI moved to Typescript
    * VRT locators added to navigation links and sandboxes

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
