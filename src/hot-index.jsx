import { hot } from 'react-hot-loader/root';
import React from 'react';
import config from '__GLOBAL__CONFIG__';
import AppWrapper from './app-wrapper';

class HotIndex extends React.Component {
    constructor(props) {
        super(props);

        if (config.browserSetup) {
            config.browserSetup();
        }
    }

    componentDidMount() {
        const metaViewport = document.createElement('meta');
        metaViewport.name = 'viewport';
        metaViewport.content =
            'initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimum-scale=1.0, width=device-width';
        document.getElementsByTagName('head')[0].appendChild(metaViewport);
    }

    render() {
        return <AppWrapper config={config} />;
    }
}

export default hot(HotIndex);
