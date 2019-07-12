import React from 'react';

import Icon, { IconName, IconSize } from '../icon/icon';

import './search-field.scss';

interface SearchFieldProps {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchField: React.FunctionComponent<SearchFieldProps> = (props) => {
    const {
        value = '',
        onChange,
    } = props
    return (
        <div className={'styleguide-search-field'}>
            <input
                className="styleguide-search-field__input"
                value={value}
                type="text"
                onChange={onChange}
                autoComplete="off"
                placeholder="Search component name"
            />

            <div className="styleguide-search-field__icon">
                <Icon name={IconName.SEARCH} size={IconSize.LARGE} />
            </div>
        </div>
    );
}

export default SearchField;
