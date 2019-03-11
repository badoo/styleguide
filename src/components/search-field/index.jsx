import React from 'react';
import classNames from 'classnames';
import './index.scss';

class SearchField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasFocus: false,
        };
    }

    componentDidMount() {
        this.setState({
            hasFocus: true,
        });
    }

    render() {
        const classnames = {
            block: classNames({
                'styleguide-search-field': true,
                'has-focus': this.state.hasFocus,
            }),
        };

        return (
            <div className={classnames.block}>
                <input
                    className="styleguide-search-field__input"
                    value={this.props.value}
                    type="text"
                    onChange={this.props.onChange}
                    onKeyPress={this.props.onKeyPress}
                    onInput={this.props.onInput}
                    onBlur={() => this.setState({ hasFocus: false })}
                    onFocus={() => this.setState({ hasFocus: true })}
                    autoComplete="off"
                    autoFocus={true}
                    placeholder="Search comp"
                />

                <div className="styleguide-search-field__icon">
                    <i className="icon">
                        <svg
                            className="icon__svg"
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.5 20.92l7.62 7.67-1.43 1.4-7.72-7.79A10.83 10.83 0 0 1 2 13.28v-.45a10.84 10.84 0 0 1 21.67 0v.45c0 2.98-1.21 5.68-3.16 7.64zM4 12.82v.46a8.83 8.83 0 0 0 17.67 0v-.45a8.83 8.83 0 0 0-17.67 0z"
                                fillRule="evenodd"
                            />
                        </svg>
                    </i>
                </div>
            </div>
        );
    }
}

export default SearchField;
