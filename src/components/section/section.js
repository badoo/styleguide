import React from 'react';
import classNames from 'classnames';

import Component from '../component/component';

import './section.scss';

import config from '__GLOBAL__CONFIG__';
const styles = {};
styles.minWidth = typeof config.sandboxMinWidth !== 'undefined' && config.sandboxMinWidth;
styles.maxWidth = typeof config.sandboxMaxWidth !== 'undefined' && config.sandboxMaxWidth;

function Section(props) {
    const { list, isVrtEnabled } = props;

    const classnames = classNames({
        'styleguide-section': true,
        vrt: isVrtEnabled,
    });

    return (
        <section className={classnames}>
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
}

Section.defaultProps = {
    list: [],
};

export default Section;
