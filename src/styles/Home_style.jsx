import { createGlobalStyle } from "styled-components";

const Home_Style = createGlobalStyle `
    @import url('https://fonts.googleapis.com/css2?family=Jockey+One&family=Michroma&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

    .Pag-Home {
        display: flex;
        flex-direction: column;
        background: linear-gradient(180deg, #c47d69 0%, #000000 60%);
        width: 100%;
    }

    .Pag-Home main {
        width: 100%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: fit-content;
        height: calc(100vh - 60px);
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .Pag-Home main h1 {
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        color: white;
        font-size: 2.95vw;
        text-align: center;
        padding-top: 25px;
        padding-bottom: 50px;
    }

    .container-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 25px;
        justify-items: center;
        width: 65%;
    }

    .item-grid {
        background-color: white;
        width: 13vw;
        height: 30vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5px;
        gap: 5%;
    }

    .item-grid img {
        width: 11vw;
    }

    .item-grid a {
        background-color: black;
        color: white;
        font-size: 1.25vw;
        padding: 1.5px 25px;
        border-radius: 25px;
        text-decoration: none;
        transition: background-color 0.3s ease;
    }

    .item-grid a:hover {
        background-color: #555;
    }

`

export default Home_Style;