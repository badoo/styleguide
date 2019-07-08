import React from 'react';
import cx from 'classnames';

import Sandbox from '../sandbox/sandbox';

import './component.scss';

interface TestProps {
    name?: string,
    Component?: any
}

interface NameProps {
    defaultValue?: React.ReactNode;
    type?: string;
    required?: boolean;
    description?: string;
};

interface IncompingComponentProps {
    [key: string]: any;
    name: NameProps;
};

export interface ComponentProps {
    name: string;
    description?: string;
    propTypes?: IncompingComponentProps;
    tests?: TestProps[];
    url?: string;
};

interface ComponentState {
    isPropsCollapsed: boolean
};

class Component extends React.Component<ComponentProps, ComponentState> {
    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            isPropsCollapsed: false,
        };

        this.handlePropsClick = this.handlePropsClick.bind(this);
    }

    handlePropsClick() {
        this.setState({ isPropsCollapsed: !this.state.isPropsCollapsed });
    }

    render() {
        const { name, description, propTypes, tests } = this.props;

        const classnames = {
            handler: cx({
                'styleguide-component__props-handler': true,
                'is-collapsed': this.state.isPropsCollapsed,
            }),
        };

        const id = (name)? name.toLowerCase() : undefined;

        return (
            <article className="styleguide-component" id={id}>
                <header className="styleguide-component__header">
                    <h1 className="styleguide-component__title">{name}</h1>
                    <div className="styleguide-component__description">{description}</div>
                </header>

                {propTypes ? (
                    <div className="styleguide-component__props">
                        <div className="styleguide-component__props-controls">
                            <span
                                role="button"
                                className={classnames.handler}
                                onClick={this.handlePropsClick}
                            >
                                PROPERTIES
                            </span>
                        </div>

                        {this.state.isPropsCollapsed ? (
                            <div className="styleguide-component__props-data">
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
                                        {Object.keys(propTypes)
                                            .map(key => {
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
                            </div>
                        ) : null}
                    </div>
                ) : null}

                {tests ? (
                    <div className="styleguide-component__tests">
                        {tests.map(
                            (
                                {
                                    name: sandboxName,
                                    Component: SandboxComponent
                                },
                                key
                            ): React.ReactNode => {
                                return (
                                    <div className="styleguide-component__sandbox" key={key}>
                                        <Sandbox title={sandboxName} name={sandboxName}>
                                            <SandboxComponent/>
                                        </Sandbox>
                                    </div>
                                )
                            })}
                    </div>
                ) : null}
            </article>
        );
    }
}

export default Component;
