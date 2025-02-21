import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
import Tabelas_style from "../styles/Tabelas_style";
import Relacao_nacionais_e_internacionais from "../components/Relacao_nacionais_e_internacionais";
import Footer from "../components/Footer";

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
                <nav className="nav-classificacoes">
                    <div>
                        <Link to={'/'}>HOME</Link>
                    </div>

                    <div></div>
                </nav>

                <Relacao_nacionais_e_internacionais consulta={argumento} />
            </main>

            <Footer />
        </div>
    )
}

export default Relacao_especifica;