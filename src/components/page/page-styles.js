import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import config from '__GLOBAL__CONFIG__';

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

const Pagestyles = useDefaultGlobalStyles
    ? createGlobalStyle`
    ${useDefaultStyleguideStyles ? StyleGuideDefaultStyles : null}

    ${useDefaultNormalize ? normalize : null}

    ${useStylesForVRT ? visualRegressionImprovedStyles : null}
`
    : createGlobalStyle`

    ${useStylesForVRT ? visualRegressionImprovedStyles : null}

    `;

export default Pagestyles;
