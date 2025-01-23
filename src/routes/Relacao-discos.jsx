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
                        <Link to={'/'}>HOME</Link>
                    </div>

                    <div>
                        <Link to={'/relacao/artista'} title="Nome do artista (A - Z)">Classificar <br />Artista</Link>

                        <Link to={'/relacao/titulo-album'} title="Titulo do album (A - Z)">Classificar <br />Titulo</Link>

                        <Link to={'/relacao/ano'}  title="Ano (mais atual primeiro)">Classificar <br />Ano (p)</Link>

                        <Link to={'/relacao/origem-disco'} title="Internacionais primeiro">Classificar <br />Inter/Nac</Link>
                    </div>
                </nav>

                {argumento == "titulo-album" ? (
                    <Relacao_completa consulta={"Titulo_album"} />
                ) : argumento == "origem-disco" ? (
                    // ARRUMAR ESSA BOMBA DPS
                    <Relacao_completa consulta={"Origem_disco"} />
                ) : argumento == "artista" ? (
                    <Relacao_completa consulta={"Nome_artista"}/>
                ) : argumento == "ano" ? (
                    <Relacao_completa consulta={"Ano"}/>
                ) : argumento == "busca-inteligente" ? (
                    <Relacao_completa consulta={"busca-inteligente"} />
                ) : (
                    "Argumento desconhecido, mandar para a pag de erro aqui"
                )}
            </main>
        </div>
    )
}

export default Relacao_discos;