import React from 'react';
import Component from './index';

export function SpecComponentEmpty() {
    return (
        <Component
            name={'BasicComponent'}
        />
    );
}

export function SpecComponentPropTypes() {
    return (
        <Component
            name={'BasicComponent'}
            propTypes={{
                name: {
                    type: 'string',
                    required: true,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, nemo!'
                }
            }}
        />
    );
}

export function SpecComponentFull() {
    return (
        <Component
            name={'BasicComponent'}
            propTypes={{
                name: {
                    type: 'string',
                    required: true,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, nemo!'
                }
            }}
            tests={[
                { name: 'SpecComponentEmpty', Component: SpecComponentEmpty },
            ]}
        />
    );
}
