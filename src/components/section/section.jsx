import React from 'react';

import './section.scss';

import config from '__GLOBAL__CONFIG__';
import Component from '../component/component';

let styles = {
    minWidth: typeof config.sandboxMinWidth != 'undefined' ? config.sandboxMinWidth : undefined,
    maxWidth: typeof config.sandboxMaxWidth != 'undefined' ? config.sandboxMaxWidth : undefined,
};

const Section = props => {
    const { list = [] } = props;

    return (
        <section className="styleguide-section">
            <div className="styleguide-section__content">
                {list.filter(Boolean).map(item => (
                    <div className="styleguide-section__component" style={styles} key={item.url}>
                        <Component
                            name={item.name}
                            description={item.description}
                            propTypes={item.propTypes}
                            tests={item.tests}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Section;
