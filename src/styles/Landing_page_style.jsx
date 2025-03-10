import { createGlobalStyle } from "styled-components";

const Landing_page_style = createGlobalStyle `
    .Pag_landing_page {
        display: flex;
        flex-direction: column;
        /* background: linear-gradient(180deg, #c47d69 0%, #000000 60%); */
        width: 100%;
    }

    .Pag_landing_page main {
        width: 100%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: fit-content;
        height: calc(100vh - 60px);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .banner_section {
        width: 100%;
        height: calc(fit-content - 50px);
    }

    .banner_section img {
        width: 100%;
        height: 100%;
    }

    .text_section {
        background-color: black;
        color: white;
        padding: 25px 25px 60px 25px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }

    .text_section div {
        /* background-color: red; */
        width: 40%;
        text-align: center;
    }

    .text_section div h1 {
        font-size: 2vw;
    }

    .text_section div p {
        font-family: Michroma, sans-serif;
        font-size: 1vw;
    }

    .grid-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: linear-gradient(90deg,#000000 , #a56958 , #000000 );
        color: white;
        gap: 35px;
        width: 100%;
        padding: 0 15px 100px 15px;
    }

    .mini-disco-div {
        display: inline-flex;
        background-color: black;
        border-radius: 100%;
        justify-content: center;
        align-items: center;
        padding: 5px;
        margin-top: -35px;
    }

    .grid-section h1 {
        font-size: 2vw;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }

    .grid div {
        background-color: #C47D69;
        font-family: Michroma, sans-serif;
        font-size: 0.90vw;
        width: 35vw;
        padding: 15px;
        border-radius: 10px;
    }

    .grid-color {
        background-color: #7A4B3D !important;
    }

    footer {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 13.5vw;
        background-color: black;
    }

    footer img {
        width: 20vw;
        margin-top: -100px;
    }

    footer div h1 {
        font-size: 3vw;
        color: white;
    }

    footer div a {
        color: #C47D69;
    }

    footer div a:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    @media (max-width: 800px) {
        .text_section div {
            width: 75%;
        }

        .text_section div h1, .grid-section h1 {
            font-size: 4.5vw;
        }

        .text_section div p, .grid div {
            font-size: 1.75vw;
        }

        .mini-disco-div {
            padding: 5px;
            margin-top: -35px;
            width: 20vw;
            height: 20vw;
        }

        .mini-disco-div img {
            width: 20vw;
            height: 20vw;
        }

        .grid {
            grid-template-columns: repeat(1, 1fr);
        }

        .grid div {
            width: 75vw;
        }

        footer div h1 {
            font-size: 4.5vw;
        }

        footer img {
            width: 30vw;
            margin-top: -100px;
        }
    }
`

export default Landing_page_style;