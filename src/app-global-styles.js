import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
    ${normalize}

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


    .styleguide {
        background: #fff;
        display: grid;
        grid-template-columns: 300px auto;
    }
`;

export default GlobalStyle;
