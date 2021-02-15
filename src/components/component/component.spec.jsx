import React from 'react';
import Component from './component';
import { StyleguideDeviceFrame } from '@/visual-helpers';

export const SpecComponentEmpty = () => {
    return <Component name={'BasicComponent'} />;
};

export const SpecComponentPropTypes = () => {
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

export const SpecComponentFull = () => {
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

export const SpecComponentInFrame = () => {
    return (
        <StyleguideDeviceFrame size={StyleguideDeviceFrame.SIZE.MEDIUM} isIframe={true}>
            <div
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                >
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
                </div>
            </div>
        </StyleguideDeviceFrame>
    );
};
