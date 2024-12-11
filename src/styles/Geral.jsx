import { createGlobalStyle } from "styled-components";

const Geral = createGlobalStyle `
    @import url('https://fonts.googleapis.com/css2?family=Jockey+One&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

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