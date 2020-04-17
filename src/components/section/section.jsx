import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import config from '__GLOBAL__CONFIG__';
import Component from '../component/component';

export const setWidth = value => (typeof value === 'number' ? `${value}px` : value);

const SectionBlock = styled.section`
    & + & {
        margin-top: 32px;
    }
`;

const SectionContent = styled.div`
    max-width: ${typeof config.sandboxMaxWidth !== 'undefined'
        ? setWidth(config.sandboxMaxWidth)
        : '960px'};
    min-width: ${typeof config.sandboxMinWidth !== 'undefined'
        ? setWidth(config.sandboxMinWidth)
        : '320px'};
    margin: auto;
`;

const SectionComponent = styled.div`
    & + & {
        margin-top: 40px;
    }
`;

const Section = props => {
    const { content } = props;

    return (
        <SectionBlock>
            <SectionContent>
                <SectionComponent key={content.url}>
                    <Component
                        name={content.name}
                        description={content.description}
                        propTypes={content.propTypes}
                        tests={content.tests}
                    />
                </SectionComponent>
            </SectionContent>
        </SectionBlock>
    );
};

Section.propTypes = {
    content: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        propTypes: PropTypes.arrayOf({
            name: PropTypes.shape({
                type: PropTypes.string,
                required: PropTypes.bool,
                description: PropTypes.string,
            }),
        }),
        tests: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                Component: PropTypes.func,
            })
        ),
    }),
};

export default Section;
