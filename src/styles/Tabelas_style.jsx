import { createGlobalStyle } from "styled-components";

const Tabelas_style = createGlobalStyle `
    .Pag-relacao-discos {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to right, #000000, #784d40, #000000);
        width: 100%;
        align-items: center;
    }

    .Pag-relacao-discos main {
        width: 95%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: fit-content;
        height: calc(100vh - 60px);
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;
    }

    .nav-classificacoes {
        display: inline-flex;
        width: 100%;
        justify-content: space-between;
    }

    .nav-classificacoes div {
        display: inline-flex;
        align-items: center;
        gap: 15px;
    }

    .nav-classificacoes div a, .btn-carregar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: #c47d69;
        border: 2px solid #c47d69;
        font-size: 1.35vw;
        min-width: 6vw;
        height: 50px;
        text-align: center;
        padding: 0 25px;
        border-radius: 15px;
        transition: border, 0.3s;
    }

    .btn-carregar {
        width: fit-content;
        margin-top: 25px
    }

    .nav-classificacoes div a:hover, .btn-carregar:hover {
        border: 2px solid white;
        transition: border, 0.3s;
        background-color: #aa6b5a;
    }

    /* estilizacao da tabela */
    .Pag-relacao-discos table {
        border-collapse: collapse;
        width: 100%;
        /* border: 1px solid white; */
        border-radius: 15px;
    }

    .div-da-table {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .cell-title th {
        background-color: #c47d69;
        padding: 10px;
        color: white;
        font-size: 1.65vw;
        font-weight: 500;
        border: 1px solid black;
    }

    .cabecalho {
        border: 1px solid black;
        background-color: #c47d69;
    }

    .cabecalho th {
        border: 1px solid black;
        color: white;
        font-weight: 300;
        padding: 5px;
    }

    tbody tr td {
        border: 1px solid black;
        background-color: white;
        text-align: center;
    }

    .cabecalho th, tbody tr td {
        font-size: 1.05vw;
    }

    .carregamento {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        // background-color: red;
        width: 100%;
        height: 50px;
    }

    @media (min-width: 1500px) {
        .nav-classificacoes div a, .btn-carregar {
            font-size: 1vw;
        }

        .cell-title th {
            font-size: 1.65vw;
        }

        .cabecalho th, tbody tr td {
            font-size: 0.85vw;
        }
    }
`

export default Tabelas_style;