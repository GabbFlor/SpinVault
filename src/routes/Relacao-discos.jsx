import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Relacao_completa from "../components/Relacao_completa";
import Tabelas_style from "../styles/Tabelas_style";

const Relacao_discos = () => {
    const { argumento } = useParams();

    return(
        <div className="Pag-relacao-discos">
            <Tabelas_style />

            <Header />

            <main>
                <nav className="nav-classificacoes">
                    <div>
                        <Link to={'/'}>MENU</Link>
                    </div>

                    <div>
                        <Link to={'/'}>Classificar <br />Artista</Link>

                        <Link to={'/'}>Classificar <br />Titulo</Link>

                        <Link to={'/'}>Classificar <br />Ano (p)</Link>

                        <Link to={'/'}>Classificar <br />Nac/Inter</Link>
                    </div>
                </nav>

                {argumento == "completa" ? (
                    <Relacao_completa />
                ) : argumento == "discos-nacionais" ? (
                    "Discos nacionais aqui!"
                ) : argumento == "discos-internacionais" ? (
                    "Discos internacionais aqui!"
                ) : argumento == "busca-inteligente"? (
                    "Busca inteligente aqui"
                ) : (
                    "Argumento desconhecido, mandar para a pag de erro aqui"
                )}
            </main>
        </div>
    )
}

export default Relacao_discos;