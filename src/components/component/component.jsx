import React from 'react';
import cx from 'classnames';

import './component.scss';
import Sandbox from '../sandbox/sandbox';

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

        const classnames = {
            handler: cx({
                'styleguide-component__props-handler': true,
                'is-collapsed': this.state.isPropsCollapsed,
            }),
        };

        const id = name ? name.toLowerCase() : undefined;
        const onClick = () => this.toggleProps(this.state.isPropsCollapsed);

        return (
            <article className="styleguide-component" id={id}>
                <header className="styleguide-component__header">
                    <h1 className="styleguide-component__title">{name}</h1>
                    <div className="styleguide-component__description">{description}</div>
                </header>

                {propTypes ? (
                    <div className="styleguide-component__props">
                        <div className="styleguide-component__props-controls">
                            <span role="button" className={classnames.handler} onClick={onClick}>
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
                            </div>
                        ) : null}
                    </div>
                ) : null}

                {tests ? (
                    <div className="styleguide-component__tests">
                        {tests.map(
                            (test, key) => {
                                const { name: sandboxName, Component: SandboxComponent } = test;

                                const name = sandboxName ? sandboxName : 'empty sandboxName';

                                return (
                                    <div className="styleguide-component__sandbox" key={key}>
                                        <Sandbox title={sandboxName} name={name}>
                                            <SandboxComponent />
                                        </Sandbox>
                                    </div>
                                );
                            }
                        )}
                    </div>
                ) : null}
            </article>
        );
    }
}

export default Component;
