import React from 'react';
import styled from 'styled-components';
import config from '__GLOBAL__CONFIG__';
import Component from '../component/component';

const setWidth = value => (typeof value === 'number' ? `${value}px` : value);

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
    const { list = [] } = props;

    return (
        <SectionBlock>
            <SectionContent>
                {list.filter(Boolean).map(item => (
                    <SectionComponent key={item.url}>
                        <Component
                            name={item.name}
                            description={item.description}
                            propTypes={item.propTypes}
                            tests={item.tests}
                        />
                    </SectionComponent>
                ))}
            </SectionContent>
        </SectionBlock>
    );
};

export default Section;
