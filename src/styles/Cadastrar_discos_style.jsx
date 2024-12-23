import { createGlobalStyle } from "styled-components";
import backgroundImage from '../assets/form-backgroundjpeg.jpeg'

const Cadastrar_discos_style = createGlobalStyle `
    .Pag-cadastrar-discos {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to right, #000000, #c47d69, #000000);
        width: 100%;
    }

    .Pag-cadastrar-discos main {
        width: 100%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: fit-content;
        height: calc(100vh - 60px);
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .section-form-add-disks {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 65vw;
        max-height: 82.5vh;
        background-color: white;
        border-radius: 20px;
        overflow: hidden;
    }

    .form-esquerda {
        position: relative;
        width: 50%;
        height: 100%;
        color: white;
        z-index: 1;
        padding: 5.75%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .form-esquerda::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(${backgroundImage});
        background-size: cover;
        background-position: bottom;
        filter: brightness(0.35);
        z-index: 0;
    }

    .form-esquerda h1, .form-esquerda p {
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        position: relative;
    }

    .form-esquerda h1 {
        font-size: 3vw;
    }

    .form-esquerda p {
        font-size: 1.05vw;
    }

    .form-direita {
        background-color: white;
        width: 50%;
        height: 100%;
        padding: 25px;
        box-sizing: border-box;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 15px;
    }

    .div-type, .div-select {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .div-type label, .div-select label {
        cursor: text;
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        font-size: 1vw;
    }

    .div-type input {
        outline: none;
        padding: 2.5px 0 2.5px 10px;
        border-radius: 2.5px;
        border: 1px solid #ccc;
        height: 38px;
        width: 100%;
        font-size: 12.5px;
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        font-size: 1vw;
        color: rgb(105, 105, 105);
    }

    .div-type input:hover {
        border: 1px solid #C47D69;
    }

    .div-type input:focus {
        box-shadow: 0 0 0 1px #C47D69;
        border: 1px solid #C47D69;
    }

    .div-type input::placeholder {
        color: #888;
    }

    .btn-submit-disk {
        background-color: #C47D69;
        color: black;
        border: none;
        outline: none;
        width: fit-content;
        padding: 10px 5px 10px 5px;
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        font-size: 1vw;
        border-radius: 3px;
        transition: 0.3s ease background-color;
    }

    .btn-submit-disk:hover {
        cursor: pointer;
        background-color: #da8c77;
        transition: 0.23 ease background-color;
    }

    @media (min-width: 1500px) {
        .form-esquerda h1 {
            font-size: 2.5vw;
        }
        
        .form-esquerda p {
            font-size: 0.85vw;
        }

        .div-type label, .div-select label {
            font-size:0.75vw;
        }

        .div-type input {
            font-size: 0.75vw;
        }

        .btn-submit-disk {
            font-size: 0.75vw;
        }
    }
`

export default Cadastrar_discos_style;