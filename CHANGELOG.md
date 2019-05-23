# Changelog

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
