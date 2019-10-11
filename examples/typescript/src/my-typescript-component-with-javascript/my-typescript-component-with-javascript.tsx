import React from 'react';
import MyJavascriptComponent from 'my-javascript-component/my-javascript-component';

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

const MyTypescriptComponentWithJavascript: React.FunctionComponent<
    MyTypescriptComponentProps
> = props => {
    const { name, color = Color.NEUTRAL } = props;

    return (
        <div style={{ color: mapColorToHex[color] }}>
            The name is {name}!
            <MyJavascriptComponent name="Lorem From Javascript Component" />
        </div>
    );
};

export default MyTypescriptComponentWithJavascript;
