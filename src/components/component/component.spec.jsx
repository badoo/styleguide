import React from 'react';
import Component from './component';
import {
    StyleguideDeviceFrame,
    StyleguideCell,
    StyleguideGroup,
    StyleguideDeviceRange,
    StyleguidePlaceholder,
} from '../../../index';

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

export const SpecComponentInGroupCell = () => {
    return (
        <StyleguideGroup>
            <StyleguideCell>
                <SpecComponentPropTypes />
            </StyleguideCell>
            <StyleguideCell>
                <SpecComponentPropTypes />
            </StyleguideCell>
            <StyleguideCell>
                <SpecComponentPropTypes />
            </StyleguideCell>
        </StyleguideGroup>
    );
};

export const SpecComponentInGroupCellwithLegends = () => {
    const fontSize = 20;
    return (
        <StyleguideGroup>
            <StyleguideCell legend="cell 1" fontSize={fontSize}>
                <SpecComponentPropTypes />
            </StyleguideCell>
            <StyleguideCell legend="cell 2" fontSize={fontSize}>
                <SpecComponentPropTypes />
            </StyleguideCell>
            <StyleguideCell legend="cell 3" fontSize={fontSize}>
                <SpecComponentPropTypes />
            </StyleguideCell>
        </StyleguideGroup>
    );
};

export const SpecComponentInGroupCellwithPlaceholder = () => {
    const fontSize = 20;
    return (
        <StyleguideGroup>
            <StyleguideCell legend="cell 1" fontSize={fontSize}>
                <StyleguidePlaceholder
                    placeholder="Component 1"
                    fontSize={fontSize}
                    backgroundColor="#ffddee"
                />
            </StyleguideCell>
            <StyleguideCell legend="cell 2" fontSize={fontSize}>
                <StyleguidePlaceholder
                    placeholder="Component 2"
                    fontSize={fontSize}
                    backgroundColor="#ddeeff"
                />
            </StyleguideCell>
            <StyleguideCell legend="cell 3" fontSize={fontSize}>
                <StyleguidePlaceholder
                    placeholder="Component 3 with default font-size"
                    backgroundColor="#ffeedd"
                />
            </StyleguideCell>

            <StyleguideCell legend="cell 4 with default font-size">
                <StyleguidePlaceholder
                    placeholder="Component 4 with default font-size"
                    backgroundColor="#ffeedd"
                />
            </StyleguideCell>
        </StyleguideGroup>
    );
};

export const SpecComponentDeviceRange = () => {
    const fontSize = 20;
    return (
        <StyleguideDeviceRange fontSize={fontSize}>
            <StyleguideCell legend="Cloned cell across devices" fontSize={fontSize}>
                <StyleguidePlaceholder
                    placeholder="Cloned component across devices"
                    fontSize={fontSize}
                    backgroundColor="#ffddee"
                />
            </StyleguideCell>
        </StyleguideDeviceRange>
    );
};
