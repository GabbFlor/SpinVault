import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
import Tabelas_style from "../styles/Tabelas_style";
import Relacao_nacionais_e_internacionais from "../components/Relacao_nacionais_e_internacionais";

const Relacao_especifica = () => {
    const { argumento } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(argumento != "discos-nacionais" && argumento != "discos-internacionais") {
            navigate(`/error-not-found`)
        }
    })

    return (
        <div className="Pag-relacao-especifica Pag-relacao-discos">
            <Tabelas_style />

            <Header />

            <main>
                <Relacao_nacionais_e_internacionais consulta={argumento} />
            </main>
        </div>
    )
}

export default Relacao_especifica;