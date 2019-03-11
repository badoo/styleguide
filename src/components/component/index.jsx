import React, { Component } from 'react';
import Sandbox from '../sandbox';
import classNames from 'classnames';

import config from '__GLOBAL__CONFIG__';

import './index.scss';

class ComponentBlock extends Component {
    constructor() {
        super();

        this.state = {
            isPropsCollapsed: false,
        };
    }

    handlePropsClick() {
        this.setState({ isPropsCollapsed: !this.state.isPropsCollapsed });
    }

    render() {
        const { data } = this.props;

        const classnames = {
            handler: classNames({
                'styleguide-component__props-handler': true,
                'is-collapsed': this.state.isPropsCollapsed,
            }),
        };

        const Wrapper = config.getComponentWrapper ? config.getComponentWrapper() : React.Fragment;

        return (
            <article className="styleguide-component" id={data.name.toLowerCase()}>
                <header className="styleguide-component__header">
                    <h1 className="styleguide-component__title">{data.name}</h1>
                    <div className="styleguide-component__description">{data.description}</div>
                </header>

                {data.propTypes ? (
                    <div className="styleguide-component__props">
                        <div className="styleguide-component__props-controls">
                            <span
                                role="button"
                                className={classnames.handler}
                                onClick={this.handlePropsClick.bind(this)}
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
                                        {Object.keys(data.propTypes).map(key => {
                                            const prop = data.propTypes[key];

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

                <div className="styleguide-component__tests">
                    {data.tests.map(({ name, Component }, key) => (
                        <div className="styleguide-component__sandbox" key={key}>
                            <Sandbox title={name} name={name}>
                                <Wrapper>
                                    <Component />
                                </Wrapper>
                            </Sandbox>
                        </div>
                    ))}
                </div>
            </article>
        );
    }
}

export default ComponentBlock;
