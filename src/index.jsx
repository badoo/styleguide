import React from 'react';
import * as ReactDom from 'react-dom';

import 'normalize.css';
import './index.scss';

import App from './app';

import config from '__GLOBAL__CONFIG__';

const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content =
    'initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimum-scale=1.0, width=device-width';
document.getElementsByTagName('head')[0].appendChild(metaViewport);

const element = document.createElement('div');
element.setAttribute('class', 'styleguide-wrapper');
document.body.appendChild(element);

function render() {
    if (config.browserSetup) {
        config.browserSetup();
    }

    ReactDom.render(<App config={config} />, element);
}

render();
