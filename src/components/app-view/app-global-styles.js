import { css, createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import config from '__GLOBAL__CONFIG__';
import { deviceSizes } from '../../utilities';

const StyleGuideDefaultStyles = `
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        height: 100%;
    }

    html, body {
        min-height: 100%;
    }

    code {
        font-family: Consolas, "Liberation Mono", Menlo, monospace;
    }
`;

const visualRegressionImprovedStyles = `
    input,
    textarea {
        caret-color: transparent !important;
    }
`;

const useDefaultGlobalStyles = !config.noDefaultGlobalStyles;
const useDefaultStyleguideStyles = !config.noDefaultStyleguideStyles;
const useDefaultNormalize = !config.noDefaultNormalize;
const useStylesForVRT = config.useStylesForVRT;

const GlobalStyle = useDefaultGlobalStyles
    ? createGlobalStyle`
    ${useDefaultStyleguideStyles ? StyleGuideDefaultStyles : null}

    ${useDefaultNormalize ? normalize : null}

    ${useStylesForVRT ? visualRegressionImprovedStyles : null}
`
    : createGlobalStyle`

    ${useStylesForVRT ? visualRegressionImprovedStyles : null}

    `;

/**
 * @type {typeof deviceSizes}
 * @return {string}
 * Media query helper for "styled-components"
 */
export const respondTo = Object.keys(deviceSizes).reduce((accumulator, label) => {
    /** @type {function(...args)} */
    accumulator[label] = (...args) => css`
        @media (min-width: ${deviceSizes[label]}px) {
            ${css(...args)};
        }
    `;
    return accumulator;
}, {});

export default GlobalStyle;
