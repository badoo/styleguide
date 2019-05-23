import React from 'react';
import PropTypes from 'prop-types';

import './search-field.scss';

function SearchField(props) {
    return (
        <div className={'styleguide-search-field'}>
            <input
                className="styleguide-search-field__input"
                value={props.value}
                type="text"
                onChange={props.onChange}
                autoComplete="off"
                placeholder="Search component name"
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

SearchField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

SearchField.defaultProps = {
    value: '',
};

export default SearchField;
