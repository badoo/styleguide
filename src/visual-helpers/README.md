# Badoo Styleguide

[![npm version](https://badge.fury.io/js/badoo-styleguide.svg)](https://badge.fury.io/js/badoo-styleguide)

## Available tools

**[Work in progress](#to-do)**: This is a list of visual components, which can help with most regular test-cases.

For easier work with different devices / media-queries we introduced several components:

* `StyleguidePlaceholder` returns mockup of component with provided parameters
* `StyleguideStatic` returns image src from [placeholder.com](https://placeholder.com) with provided parameters
* `StyleguideCell` returns component and its `legend`
* `StyleguideDeviceFrame` returns one of predefined frames, based on mobile device aspect-ratio
* `StyleguideDeviceGroup` returns set of predefined frames, based on mobile device aspect-ratio

```js

import { getImageUrl } from 'badoo-styleguide';

```

## How to define fonts-sizes for placeholders / legends for all tools

Now we can setup consistent font-sizes via config

this is example of how to setup these settings in config:

```js
module.exports = {
    // part of config
    legendFontSize: 25,

    placeholderFontSize: 30,
};
```

If you would prefer to setup individualy font-sizes - you can do it for each instance of component.
