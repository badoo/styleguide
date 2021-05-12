import React from 'react';
import renderer from 'react-test-renderer';
import SearchField from '../../../components/search-field/search-field';
import 'jest-styled-components';

describe('SearchField generic tests', () => {
    let component = renderer.create(
        <SearchField value={'comp'} onChange={(event) => `we test output of ${event}`} />
    );

    it('When we search', () => {
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
    });
});
