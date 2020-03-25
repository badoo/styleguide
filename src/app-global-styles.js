import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
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

    ${normalize}
`;

export default GlobalStyle;
