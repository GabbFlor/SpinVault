import { createGlobalStyle } from "styled-components";

const Geral = createGlobalStyle `
    * {
        padding: 0;
        margin: 0;
        text-decoration: none;
        box-sizing: border-box;

        font-family: "Jockey One", sans-serif;
        font-style: normal;
    }

    html, body {
        width: 100%;
        height: 100%;
    }

    #root {
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
    }
`

export default Geral;