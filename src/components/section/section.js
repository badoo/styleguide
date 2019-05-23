import React from 'react';
import classNames from 'classnames';

import Component from '../component/component';

import './section.scss';

function Section(props) {
    const { list, isVrtEnabled } = props;

    const classnames = classNames({
        'styleguide-section': true,
        vrt: isVrtEnabled,
    });

    return (
        <section className={classnames}>
            <div className="styleguide-section__content">
                {list.filter(Boolean).map((item, key) => (
                    <div className="styleguide-section__component" key={item.url}>
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
}

Section.defaultProps = {
    list: [],
};

export default Section;
