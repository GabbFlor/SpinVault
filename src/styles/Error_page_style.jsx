import { createGlobalStyle } from "styled-components";

const Error_page_style = createGlobalStyle `
    .Pag-error {
    height: 100vh;
    width: 100vw;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    }

    .Pag-error img {
        height: 50vh;
        filter: grayscale(1);
    }

    .Pag-error section {
        display: flex;
        flex-direction: column;
    }

    .Pag-error section h1 {
        font-size: 3vw;
        font-weight: 500;
    }

    .Pag-error section p {
        font-size: 1.25vw;
    }

    .Pag-error section a {
        color: #8f422d;
    }

    .Pag-error section a:hover {
        text-decoration: underline;
    }
`

export default Error_page_style;