import React, { PureComponent } from 'react';
import './index.scss';

class Icon extends PureComponent {
    render() {
        return (
            <div className="styleguide-icon" role="presentation">
                {this.props.src}
            </div>
        );
    }
}

export default Icon;
