import React from 'react';
import cx from 'classnames';

import './section.scss';

import Component, { ComponentProps } from '../component/component';

import config from '__GLOBAL__CONFIG__';

let styles = {
    minWidth: typeof config.sandboxMinWidth != 'undefined' ? config.sandboxMinWidth : undefined,
    maxWidth: typeof config.sandboxMaxWidth != 'undefined' ? config.sandboxMaxWidth : undefined,
};

interface SectionProps {
    list: ComponentProps[];
    isVrtEnabled: boolean;
}

const Section: React.FunctionComponent<SectionProps> = props => {
    const { list, isVrtEnabled } = props;

    const classnames = {
        block: cx({
            'styleguide-section': true,
            vrt: isVrtEnabled,
        }),
    };

    return (
        <section className={classnames.block}>
            <div className="styleguide-section__content">
                {list.filter(Boolean).map(item => (
                    <div className="styleguide-section__component" style={styles} key={item.url}>
                        {typeof item !== undefined && typeof item !== null ? (
                            <Component
                                name={item.name}
                                description={item.description}
                                propTypes={item.propTypes}
                                tests={item.tests}
                            />
                        ) : null}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Section;
