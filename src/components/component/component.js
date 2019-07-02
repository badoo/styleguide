import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import config from '__GLOBAL__CONFIG__';
import Sandbox from '../sandbox/sandbox';

import './component.scss';

class Component extends React.Component {
    constructor(props) {
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
            handler: classNames({
                'styleguide-component__props-handler': true,
                'is-collapsed': this.state.isPropsCollapsed,
            }),
        };

        const Wrapper = config.getComponentWrapper ? config.getComponentWrapper() : React.Fragment;

        return (
            <article className="styleguide-component" id={name.toLowerCase()}>
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
                        {tests.map(({ name: sandboxName, Component: SandboxComponent }, key) => (
                            <div className="styleguide-component__sandbox" key={key}>
                                <Sandbox title={sandboxName} name={sandboxName}>
                                    <Wrapper>
                                        <SandboxComponent />
                                    </Wrapper>
                                </Sandbox>
                            </div>
                        ))}
                    </div>
                ) : null}
            </article>
        );
    }
}

Component.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    propTypes: PropTypes.objectOf(
        PropTypes.shape({
            type: PropTypes.string,
            required: PropTypes.bool,
            defaultValue: PropTypes.any,
            description: PropTypes.string,
        })
    ),
    tests: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            Component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        })
    ),
};

export default Component;
