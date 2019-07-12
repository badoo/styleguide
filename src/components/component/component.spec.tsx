import React from 'react';
import Component from './component';

export const SpecComponentEmpty: React.FunctionComponent = () => {
    return <Component name={'BasicComponent'} />;
};

export const SpecComponentPropTypes: React.FunctionComponent = () => {
    return (
        <Component
            name={'BasicComponent'}
            propTypes={{
                name: {
                    type: 'string',
                    required: true,
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, nemo!',
                },
            }}
        />
    );
};

export const SpecComponentFull: React.FunctionComponent = () => {
    return (
        <Component
            name={'BasicComponent'}
            propTypes={{
                name: {
                    type: 'string',
                    required: true,
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, nemo!',
                },
            }}
            tests={[
                {
                    name: 'SpecComponentEmpty',
                    Component: SpecComponentEmpty,
                },
            ]}
        />
    );
};
