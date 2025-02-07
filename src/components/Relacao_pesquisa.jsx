import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { dotWave } from "ldrs";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

const Relacao_pesquisa = ({ busca }) => {
    const [carregando, setCarregando] = useState(false);
    const { user, loading } = useAuth();
    const [ sumirBtn, setSumirBtn] = useState(false);
    const [ discos, setDiscos ] = useState([]);
    let q;
    dotWave.register();

    const pesquisarDados = async () => {
        if(!user || !user.uid) {
            console.warn(`Usuário não está pronto ainda.`)
            return [];
        }

        setCarregando(true)

        try {
            q = query(
                collection(db, "Discos"),
                where("User_id", "==", user.uid),
                where("Nome_artista", "==", busca),
                orderBy("Titulo_album"),
            )

            const querySnapshot = await getDocs(q);
            const discos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            setDiscos(discos);
        } catch(error) {
            console.error(`Erro ao buscar discos: ${error}`)
            throw error;
        } finally {
            setCarregando(false)
        }
    };

    useEffect(() => {
        if(busca) {
            pesquisarDados()
        }
    }, [busca])

    return (
        <div className="div-da-table">
            <table>
            <thead>
                    <tr className="cell-title">
                        <th colSpan="12">Pesquisa inteligente</th>
                    </tr>
                    <tr className="cabecalho">
                        <th>Artista</th>
                        <th>Título</th>
                        <th>Tamanho</th>
                        <th>Ano(P)</th>
                        <th>Origem Artista</th>
                        <th>Origem Disco</th>
                        <th>Situação Disco</th>
                        <th>Situação Capa</th>
                        <th>Estilo</th>
                        <th>Tipo</th>
                        <th>Encarte</th>
                        <th>Obs.</th>
                    </tr>
                </thead>
                <tbody>
                {busca ? (
                    discos.length > 0 ? (
                        discos.map((disco) => (
                            <tr key={disco.id}>
                                <td>{disco.Nome_artista}</td>
                                <td>{disco.Titulo_album}</td>
                                <td>{disco.Tamanho}</td>
                                <td>{disco.Ano}</td>
                                <td>{disco.Origem_artista}</td>
                                <td>{disco.Origem_disco}</td>
                                <td>{disco.Situacao_disco}</td>
                                <td>{disco.Situacao_capa}</td>
                                <td>{disco.Estilo}</td>
                                <td>{disco.Tipo}</td>
                                <td>{disco.Encarte}</td>
                                <td>{disco.Observacoes}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12">Nenhum restuldado com "{busca}" foi encontrado.</td>
                        </tr>
                    )
                ) : (
                    <tr>
                        <td colSpan="12">Aguargando pesquisa...</td>
                    </tr>
                )}
                </tbody>
            </table>

            {carregando && (
                <div className="carregamento">
                    <l-dot-wave
                        size="60"
                        speed="1" 
                        color="white" 
                    ></l-dot-wave>
                </div>
            )}
        </div>
    )
}

export default Relacao_pesquisa;