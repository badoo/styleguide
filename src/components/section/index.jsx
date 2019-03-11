import React from 'react';
import classNames from 'classnames';
import Component from '../component';

import './index.scss';

function Section(props) {
    const { list, isVrtEnabled } = props;

    const classnames = classNames({
        'styleguide-section': true,
        vrt: isVrtEnabled,
    });

    return (
        <section className={classnames}>
            <div className="styleguide-section__content">
                {list.map((item, key) => (
                    <div className="styleguide-section__component" key={key}>
                        <Component data={item} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Section;
