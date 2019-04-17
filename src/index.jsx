import React from 'react';
import * as ReactDom from 'react-dom';
import HotIndex from './hot-index';

ReactDom.render(<HotIndex />, getWrapperElement());

function getWrapperElement() {
    const wrapper = document.getElementById('styleguide-wrapper');

    if (wrapper) {
        return wrapper;
    }

    const element = document.createElement('div');
    element.setAttribute('class', 'styleguide-wrapper');
    element.setAttribute('id', 'styleguide-wrapper');
    document.body.appendChild(element);

    return element;
}
