import React from 'react';

export enum Color {
    NEUTRAL,
    POSITIVE,
    NEGATIVE,
}

interface MyTypescriptComponentProps {
    name: string;
    color?: Color;
    children?: never;
}

const mapColorToHex: { [key in Color]: string } = {
    [Color.NEUTRAL]: '#333',
    [Color.POSITIVE]: '#090',
    [Color.NEGATIVE]: '#900',
};

const MyTypescriptComponent: React.FunctionComponent<MyTypescriptComponentProps> = (props) => {
    const { name, color = Color.NEUTRAL } = props;

    return <div style={{ color: mapColorToHex[color] }}>The name is {name}!</div>;
};

export default MyTypescriptComponent;
