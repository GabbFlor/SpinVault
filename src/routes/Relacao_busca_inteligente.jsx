import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Tabelas_style from "../styles/Tabelas_style";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Relacao_pesquisa from "../components/Relacao_pesquisa";

const Relacao_busca_inteligente = () => {
    const { busca } = useParams();
    const navigate = useNavigate();
    const [pesquisa, setPesquisa] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate(`/busca-inteligente/${pesquisa}`)
    }

    useEffect(() => {
        if(busca) {
            setPesquisa(busca);
        }
    }, [busca])

    return(
        <div className="Div-busca-inteligente Pag-relacao-discos">
            <Tabelas_style />

            <Header />

            <main>
                <nav className="nav-classificacoes">
                    <div>
                        <Link to={'/'}>HOME</Link>
                    </div>

                    <div>
                        <form className="form-pesquisar-artista" onSubmit={handleSubmit}>
                            <input 
                                type="text"
                                value={pesquisa}
                                onChange={(e) => setPesquisa(e.target.value.toLowerCase())}
                                className="input-pesquisa"
                                placeholder="Procure pelo nome do artista..."
                            />
                            <button type="submit" title="Pesquisar"><BsSearch/></button>
                        </form>
                    </div>
                </nav>

                <Relacao_pesquisa busca={busca}/>
            </main>
        </div>
    )
}

export default Relacao_busca_inteligente;