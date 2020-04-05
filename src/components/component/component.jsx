import React from 'react';
import styled from 'styled-components';

import Sandbox from '../sandbox/sandbox';
import config from '__GLOBAL__CONFIG__';

const ComponentBlock = styled.article`
    padding-top: 32px;
`;

const ComponentTitle = styled.h1`
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 32px;
    color: #000;
    font-family: sans-serif;
    word-break: break-word;
`;

const ComponentDescription = styled.div`
    font-family: sans-serif;
    font-size: 16px;
    color: #a0a0a0;
    margin-bottom: 16px;
    max-width: 50%;
`;

const ComponentTests = styled.div`
    margin-top: 16px;
`;

const ComponentProps = styled.div`
    font-size: 14px;
    font-family: sans-serif;

    table {
        width: 100%;
        border-collapse: collapse;
        border-radius: 4px;
        text-align: left;
    }

    thead {
        tr {
            border-bottom: 1px solid #7000e3;
        }
        th {
            padding: 0 16px 8px 4px;
        }
    }

    tbody {
        tr:nth-child(2n) {
            background: #f0f0f0;
        }

        tr {
            td:nth-child(2) {
                font-style: italic;
                color: #303030;
            }

            td:nth-child(1) {
                font-weight: 600;
            }

            td:nth-child(4) {
                width: 45%;
            }
        }
    }

    td {
        padding: 8px 16px 8px 4px;
    }
`;

const ComponentPropsControls = styled.div`
    & + .styleguide-component__props-data {
        margin-top: 16px;
    }
`;

const ComponentPropsHandler = styled.span`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    user-select: none;
    font-family: sans-serif;

    &::before {
        margin-right: 4px;
        display: block;
        background: #7000e3;
        color: #fff;
        width: 14px;
        height: 14px;
        line-height: 12px;
        text-align: center;
    }

    ${props =>
        props.isCollapsed
            ? `
        &::before {
            content: '–';
        }
    `
            : `
        &::before {
            content: '+';
        }
    `}
`;

const ComponentPropsData = styled.div`
    margin-bottom: 32px;
`;

const ComponentSandbox = styled.div`
    & + & {
        margin-top: 32px;
    }
`;

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPropsCollapsed: false,
        };
    }

    toggleProps(isPropsCollapsed) {
        this.setState({ isPropsCollapsed: !isPropsCollapsed });
    }

    render() {
        const { name, description, propTypes, tests } = this.props;

        const id = name ? name.toLowerCase() : undefined;
        const onClick = () => this.toggleProps(this.state.isPropsCollapsed);
        const Wrapper = config.getComponentWrapper ? config.getComponentWrapper() : React.Fragment;

        return (
            <ComponentBlock id={id}>
                <header className="styleguide-component__header">
                    <ComponentTitle>{name}</ComponentTitle>
                    <ComponentDescription>{description}</ComponentDescription>
                </header>

                {propTypes ? (
                    <ComponentProps>
                        <ComponentPropsControls>
                            <ComponentPropsHandler
                                isCollapsed={this.state.isPropsCollapsed}
                                onClick={onClick}
                                role="button"
                            >
                                PROPERTIES
                            </ComponentPropsHandler>
                        </ComponentPropsControls>

                        {this.state.isPropsCollapsed ? (
                            <ComponentPropsData className="styleguide-component__props-data">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>PropType</th>
                                            <th>Type</th>
                                            <th>Default</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {Object.keys(propTypes).map(key => {
                                            const prop = propTypes[key];

                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        <code>{key}</code>
                                                    </td>
                                                    <td>
                                                        <code>{prop.type}</code>
                                                    </td>
                                                    <td>
                                                        <code>
                                                            {prop.required
                                                                ? 'Required'
                                                                : prop.defaultValue}
                                                        </code>
                                                    </td>
                                                    <td>{prop.description}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </ComponentPropsData>
                        ) : null}
                    </ComponentProps>
                ) : null}

                {tests ? (
                    <ComponentTests>
                        {tests.map((test, key) => {
                            const { name: sandboxName, Component: SandboxComponent } = test;

                            return (
                                <ComponentSandbox key={key}>
                                    <Sandbox title={sandboxName}>
                                        <Wrapper>
                                            <SandboxComponent />
                                        </Wrapper>
                                    </Sandbox>
                                </ComponentSandbox>
                            );
                        })}
                    </ComponentTests>
                ) : null}
            </ComponentBlock>
        );
    }

    componentDidMount() {
        if (config.actionOnRender) {
            config.actionOnRender();
        }
    }

    componentDidUpdate() {
        if (config.actionOnRender) {
            config.actionOnRender();
        }
    }
}

export default Component;
