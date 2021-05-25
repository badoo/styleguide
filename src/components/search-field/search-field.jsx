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
    background-size: cover;

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

    &::-webkit-search-cancel-button {
        height: 24px;
        width: 24px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        background-image: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M15 2.41L13.59 1 8 6.59 2.41 1 1 2.41 6.59 8 1 13.59 2.41 15 8 9.41 13.59 15 15 13.59 9.41 8z" fill="currentColor" /></svg>');
        background-size: 12px 12px;
        background-position: center;
        background-repeat: no-repeat;
        appearance: none;
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
                type="search"
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
