import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import config from '__GLOBAL__CONFIG__';

const StyleGuideDefaultStyles = `
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        color: #6a6a6a;
    }

    h1 {
        font-weight: 400;
    }

    code {
        font-family: Consolas, "Liberation Mono", Menlo, monospace;
    }
`;

const useDefaultGlobalStyles = !config.noDefaultGlobalStyles;
const useDefaultStyleguideStyles = !config.noDefaultStyleguideStyles;
const useDefaultNormalize = !config.noDefaultNormalize;

console.log(useDefaultGlobalStyles);
console.log(useDefaultStyleguideStyles);
console.log(useDefaultNormalize);

const GlobalStyle = useDefaultGlobalStyles
    ? createGlobalStyle`
    ${useDefaultStyleguideStyles ? StyleGuideDefaultStyles : null}

    ${useDefaultNormalize ? normalize : null}
`
    : createGlobalStyle``;

export default GlobalStyle;
