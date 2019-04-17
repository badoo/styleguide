import { hot } from 'react-hot-loader/root';
import React from 'react';
import 'normalize.css';
import './index.scss';

import App from './app';

import config from '__GLOBAL__CONFIG__';

class Index extends React.Component {
    componentDidMount() {
        const metaViewport = document.createElement('meta');
        metaViewport.name = 'viewport';
        metaViewport.content =
            'initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimum-scale=1.0, width=device-width';
        document.getElementsByTagName('head')[0].appendChild(metaViewport);

        if (config.browserSetup) {
            config.browserSetup();
        }
    }

    render() {
        return <App config={config} />;
    }
}

export default hot(Index);
