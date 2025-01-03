import { createGlobalStyle } from "styled-components";

const Perfil_style = createGlobalStyle `
    .Pag-perfil {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to right, #000000, #c47d69, #000000);
        width: 100%;
    }

    .Pag-perfil main {
        width: 100%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: fit-content;
        height: calc(100vh - 60px);
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .section-perfil {
        display: flex;
        flex-direction: column;
        gap: 35px;
        align-items: center;
    }

    .perfil-infos {
        background-color: #232323;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50vw;
        gap: 25px;
        padding: 50px 25px 25px 25px;
        border-radius: 10px;

        margin-top: 100px;
        position: relative;
    }

    .perfil-infos h1, .perfil-infos p, .perfil-infos span, .perfil-add-disks h1, .btn-card {
        font-family: "Michroma", serif;
        font-weight: 400;
    }

    .perfil-infos h1 {
        font-size: 1.75vw;
        text-align: center;
    }

    .destaque {
        font-size: 1.70vw;
        color: #C47D69;
        text-align: center;
    }

    .perfil-infos p:not(.destaque) {
        font-size: 1vw;
    }

    .perfil-infos span {
        font-size: 3vw;
    }

    .sub-perfil-info {
        display: inline-flex;
        width: 100%;
        justify-content: space-evenly;
    }

    .sub-perfil-info div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .img-temporario {
        background-color: white;
        width: 12.5vw;
        height: 12.5vw;
        border-radius: 100%;

        margin-top: -125px;
        text-align: center;
    }

    .perfil-add-disks {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .perfil-add-disks h1 {
        color: white;
        font-size: 1.75vw;
        font-weight: 600;
    }

    .card {
        background-color: #232323;
        width: fit-content;
        padding-bottom: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 7.5px;
    }

    .card img {
        width: 15vw;
    }

    .card-title {
        font-weight: 400 !important;
        text-align: center;
        margin-bottom: 20px;
    }

    .btn-card {
        background-color: white;
        border: none;
        outline: none;
        font-size: 1.30vw;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
    }

    .cards-disks {
        display: inline-flex;
        gap: 5vw;
    }

    .infos-up {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .btn-logout {
        outline: none;
        border: 1px solid #C47D69;
        color: #C47D69;
        background-color: transparent;
        font-size: 1.30vw;
        padding: 5px;
        border-radius: 5px;
        width: fit-content;
        margin-top: 10px;
        cursor: pointer;
        transition: color 0.3s, background-color 0.3s;
    }

    .btn-logout:hover {
        background-color: #C47D69;
        color: black;
        transition: color 0.3s, background-color 0.3s;
    }

    @media (min-width: 1500px) {
        .perfil-infos h1, .perfil-add-disks h1 {
            font-size: 1.40vw;
        }

        .destaque {
            font-size: 1.55vw;
        }

        .perfil-infos p:not(.destaque) {
            font-size: 0.75vw;
        }

        .perfil-infos span {
            font-size: 2.75vw;
        }

        .card-title {
            font-size: 1.30vw !important;
        }

        .btn-card {
            font-size: 1.20vw ;
        }
    }
`

export default Perfil_style;
