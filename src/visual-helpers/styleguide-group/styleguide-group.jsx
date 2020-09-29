import * as React from 'react';
import PropTypes from 'prop-types';
import View from '../styleguide-view';

const propTypes = {
    children: PropTypes.node,
    fullWidthItems: PropTypes.bool,
};

function StyleguideGroup(props) {
    const { fullWidthItems, children } = props;

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}
        >
            {React.Children.map(children, (child, key) => (
                <View
                    style={{
                        width: fullWidthItems ? '100%' : 'auto',
                        marginTop: 10,
                        marginRight: !fullWidthItems ? 20 : 0,
                        marginBottom: 10,
                    }}
                    key={`StyleguideGroup-0${key}`}
                >
                    {React.cloneElement(child)}
                </View>
            ))}
        </View>
    );
}

StyleguideGroup.propTypes = propTypes;

export default StyleguideGroup;
