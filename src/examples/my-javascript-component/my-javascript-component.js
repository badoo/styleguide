import React from 'react';
import PropTypes from 'prop-types';

export const Color = {
    NEUTRAL: 'NEUTRAL',
    POSITIVE: 'POSITIVE',
    NEGATIVE: 'NEGATIVE',
};

const mapColorToHex = {
    [Color.NEUTRAL]: '#333',
    [Color.POSITIVE]: '#090',
    [Color.NEGATIVE]: '#900',
};

const MyJavascriptComponent = props => {
    const { name, color } = props;

    return <div style={{ color: mapColorToHex[color] }}>The name is {name}!</div>;
};

MyJavascriptComponent.propTypes = {
    color: PropTypes.oneOf(Object.values(Color)),
    name: PropTypes.string,
};

MyJavascriptComponent.defaultProps = {
    color: Color.NEUTRAL,
};

export default MyJavascriptComponent;
