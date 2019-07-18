import React from 'react';
import cx from 'classnames';

import './navigation-section.scss';

class NavigationSection extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: props.isOpened,
        };
    }

    componentDidUpdate(prevProps) {
        const { isOpened } = this.props;

        if (isOpened !== prevProps.isOpened || isOpened) {
            this.setState({
                isOpened: this.props.isOpened,
            });
        }
    }

    render() {
        const { name, components } = this.props;

        const classNames = {
            components: cx({
                'styleguide-navigation-section__components': true,
                'is-hidden': !this.state.isOpened,
            }),
        };

        const onClickHandler = () =>
            this.setState(prevState => ({ isOpened: !prevState.isOpened }));

        return (
            <div className="styleguide-navigation-section">
                <div className="styleguide-navigation-section__name" onClick={onClickHandler}>
                    {name}
                </div>
                <div className={classNames.components}>
                    {components
                        ? components.map((link, index) => {
                              const { name, url, isActive } = link;
                              const classNames = cx({
                                  'styleguide-navigation-section__link': true,
                                  'is-active': isActive,
                              });
                              const key = url || index;

                              return (
                                  <div className="styleguide-navigation-section__item" key={key}>
                                      <a
                                          className={classNames}
                                          data-vrt-locator={'link'}
                                          href={`#${url}`}
                                      >
                                          {name}
                                      </a>
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        );
    }
}

export default NavigationSection;
