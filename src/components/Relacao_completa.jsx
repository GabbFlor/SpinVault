import { getFirestore, collection, query, orderBy, limit, startAfter, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../firebase-config";
import { dotWave } from "ldrs";

const Relacao_completa = ({ consulta }) => {
    const [discos, setDiscos] = useState([]);
    const [ultimoDoc, setUltimoDoc] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const { user, loading } = useAuth();
    const [ sumirBtn, setSumirBtn] = useState(false);
    dotWave.register();

    let q;
    const pegarDadosIniciais = async () => {
        setCarregando(true);

        try {
            if (consulta == "Ano") {
                q = query(
                    collection(db, "Discos"),
                    where("User_id", "==", user.uid),
                    orderBy(consulta, "desc"),
                    limit(20)
                );
            } else {
                q = query(
                    collection(db, "Discos"),
                    where("User_id", "==", user.uid),
                    orderBy(consulta),
                    limit(20)
                );
            }

            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setDiscos(data);
            setUltimoDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            // console.log("dados recuperados com sucesso!")
        } catch (error) {
            console.error(`Erro ao buscar dados: ${error}`);
        }
        setCarregando(false);
    };

    const carregarProximaPagina = async () => {
        if (!ultimoDoc) return;
        
        setCarregando(true);

        try {
            const q = query(
                collection(db, "Discos"),
                where("User_id", "==", user.uid),
                orderBy("Titulo_album"),
                startAfter(ultimoDoc),
                limit(20)
            )

            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) =>({ id: doc.id, ...doc.data() }));

            if (data.length === 0) {
                alert(`Não há mais nenhum conteúdo para ser carregado.`)
                setSumirBtn(true)
            } else {
                setDiscos((prevDiscos => [...prevDiscos, ...data]));
                setUltimoDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            }
        } catch(error) {
            console.error(`Erro ao os dados da proxima pagina: ${error}`);
        }
        setCarregando(false);
    }

    useEffect(() => {
        pegarDadosIniciais();

        console.log(consulta)
    }, [consulta])

    return (
        <div className="div-da-table">
            <table>
                <thead>
                    <tr className="cell-title">
                        <th colSpan="12">Relação completa de discos 
                            {consulta == "Titulo_album" ? (
                                " (Titulo)"
                            ) : consulta == "Origem_disco" ? (
                                " (Origem dos discos)"
                            ) : consulta == "Nome_artista" ? (
                                " (Artista)"
                            ) : consulta == "Ano" ? (
                                " (Ano)"
                            ) : ("")}
                        </th>
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
                    {discos.map((disco) => (
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
                    ))}
                </tbody>
            </table>
            
            {!carregando && ultimoDoc && sumirBtn == false && (
                <button onClick={carregarProximaPagina} className="btn-carregar">Carregar mais</button>
            )}

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

export default Relacao_completa;