import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body{
        background: #2E2D2D;
        color: #FFFFFF;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button{
        font-family: 'Roboto Mono', serif;
        font-size: 16px;
    }

    h1, h2, h3, h4, h5, h6, strong{
        font-weight: 500;
        margin-bottom: 30px;
    }

    button{
        cursor: pointer;
    }
`;