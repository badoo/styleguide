# Changelog

## v0.0.15

* Fixed compilation of styleguide into static folder
* Merged [pull/2](https://github.com/badoo/styleguide/pull/2)

## v0.0.16

* Refactor how the styleguide configuration works
  * Deprecated babelConfig object in favour of getBabelConfig()
  * Instead of hacky merging let the user return loaders for files using getLoaderForModule
  * Move getComponentRoots out of getWebpackConfig