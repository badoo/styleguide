import React from 'react';
import styled from 'styled-components';
import Icon, { IconName, IconSize } from '../icon/icon';

const SEARCH_FIELD_COLOR = '#ccc';

const SearchFieldBlock = styled.div`
    position: relative;
    color: ${SEARCH_FIELD_COLOR};
    font-family: sans-serif;

    &:focus-within {
        color: #000;
    }
`;

const SearchFieldInput = styled.input`
    background-color: #fff;
    width: 100%;
    display: block;
    font-size: 16px;
    color: #303030;
    height: 40px;
    line-height: 32px;
    padding-left: calc(24px + 12px);
    border: 1px solid #ccc;
    appearance: none;
    outline: none;

    &:focus {
        border-color: #000;
    }

    &::-webkit-input-placeholder {
        color: ${SEARCH_FIELD_COLOR};
        opacity: 1;
    }

    &:-moz-placeholder {
        color: ${SEARCH_FIELD_COLOR};
        opacity: 1;
    }

    &::-moz-placeholder {
        color: ${SEARCH_FIELD_COLOR};
        opacity: 1;
    }

    &:-ms-input-placeholder {
        color: ${SEARCH_FIELD_COLOR};
        opacity: 1;
    }
`;

const SearchFieldIcon = styled.div`
    position: absolute;
    top: 50%;
    left: 8px;
    display: flex;
    transform: translateY(-50%);
    color: inherit;
`;

const SearchField = (props) => {
    const { value = '', onChange, onFocus, onBlur, inputRef } = props;

    return (
        <SearchFieldBlock>
            <SearchFieldInput
                value={value}
                type="text"
                onFocus={onFocus}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="off"
                placeholder="Search component name"
                ref={inputRef}
            />

            <SearchFieldIcon>
                <Icon name={IconName.SEARCH} size={IconSize.LARGE} />
            </SearchFieldIcon>
        </SearchFieldBlock>
    );
};

export default SearchField;
