import { getFirestore, collection, query, orderBy, limit, startAfter, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dotWave } from "ldrs";
import { db } from "../firebase-config";

const Relacao_nacionais_e_internacionais = ({ consulta }) => {
    const [carregando, setCarregando] = useState(false);
    const { user, loading } = useAuth();
    const [ sumirBtn, setSumirBtn] = useState(false);
    const queryClient = useQueryClient();
    let q;
    dotWave.register();

    const pegarDadosIniciais = async () => {
        if(!user || !user.uid) {
            console .warn(`Usuário não está pronto ainda!`);
            return[];
        }

        setCarregando(true);

        try{
            if(consulta == "discos-nacionais") {
                q = query(
                    collection(db, "Discos"),
                    where("User_id", "==", user.uid),
                    where("Origem_disco", "==", "nacional"),
                    orderBy("Titulo_album"),
                    limit(20)
                );
            } else if (consulta == "discos-internacionais") {
                q = query(
                    collection(db, "Discos"),
                    where("User_id", "==", user.uid),
                    where("Origem_disco", "==", "internacional"),
                    orderBy("Titulo_album"),
                    limit(20)
                );
            } else {
                console.error("Arumento inválido para query.");
            }

            const querySnapshot = await getDocs(q);
            const discosInterAndNac = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            queryClient.setQueryData([`ultimoDocDiscosNacAndInterN`], querySnapshot.docs[querySnapshot.docs.length - 1]);

            console.log("Dados recuperados com sucesso!");

            return discosInterAndNac;
        } catch(error) {
            console.error(`Erro ao buscar dados: ${error}`);
            throw error;
        } finally {
            setCarregando(false);
        }
    };

    const carregarProximaPagina = async () => {
        const ultimoDocCache = queryClient.getQueryData(['ultimoDocDiscosNacAndInterN']);

        if (!ultimoDocCache) {
            console.log("Ultimo documento não encontrado, não há mais nada para carregar.");
            return;
        }

        setCarregando(true);

        try {
            if(consulta == "discos-nacionais") {
                q = query(
                    collection(db, "Discos"),
                    where("User_id", "==", user.uid),
                    where("Origem_disco", "==", "nacional"),
                    orderBy("Titulo_album"),
                    startAfter(ultimoDocCache),
                    limit(20)
                );
            } else if (consulta == "discos-internacionais") {
                q = query(
                    collection(db, "Discos"),
                    where("User_id", "==", user.uid),
                    where("Origem_disco", "==", "internacional"),
                    orderBy("Titulo_album"),
                    startAfter(ultimoDocCache),
                    limit(20)
                );
            } else {
                console.error("Arumento inválido para query.");
            }

            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            if (data.length === 0) {
                alert("Não há mais nenhum conteúdo para ser carregado.");
                setSumirBtn(true);
            } else {
                queryClient.setQueryData(['discosInterAndNac'], (oldDiscos = []) => {
                    const IDsExistentes = new Set(oldDiscos.map((disco) => disco.id));
                    const discosFIltrados = data.filter((disco) => !IDsExistentes.has(disco.id));
                    return [...oldDiscos, ...discosFIltrados];
                })

                queryClient.setQueryData(['ultimoDocDiscosNacAndInterN'], querySnapshot.docs[querySnapshot.docs.length - 1]);
            }
        }  catch (error) {
            console.error(`Erro ao carregar os dados da próxima página: ${error}`);
        } finally {
            setCarregando(false);
        }
    }

    const { data: discosInterAndNac, isLoading, error } = useQuery({
        queryKey: ['discosInterAndNac'],
        queryFn: pegarDadosIniciais,
        enabled: !!user?.uid,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })

    const handleUpdate= () => {
        queryClient.invalidateQueries(['discosInterAndNac']);
        queryClient.invalidateQueries(['ultimoDocDiscosNacAndInterN']);
        setSumirBtn(false)
    }

    if (isLoading) return <p>Carregando...</p>;

    if (error) return <p>Erro: {error.message}</p>;

    return (
        <div className="div-da-table">
            <table>
                <thead>
                    <tr className="cell-title">
                        <th colSpan="12">{consulta == "discos-nacionais" ? (
                            "Apenas discos nacionais"
                        ) : (
                            "Apenas discos internacionais"
                        )}</th>
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
                    {discosInterAndNac.map((discoInterAndNac) => (
                        <tr key={discoInterAndNac.id}>
                            <td>{discoInterAndNac.Nome_artista}</td>
                            <td>{discoInterAndNac.Titulo_album}</td>
                            <td>{discoInterAndNac.Tamanho}</td>
                            <td>{discoInterAndNac.Ano}</td>
                            <td>{discoInterAndNac.Origem_artista}</td>
                            <td>{discoInterAndNac.Origem_disco}</td>
                            <td>{discoInterAndNac.Situacao_disco}</td>
                            <td>{discoInterAndNac.Situacao_capa}</td>
                            <td>{discoInterAndNac.Estilo}</td>
                            <td>{discoInterAndNac.Tipo}</td>
                            <td>{discoInterAndNac.Encarte}</td>
                            <td>{discoInterAndNac.Observacoes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="div-btns">
                <button onClick={handleUpdate} className="btn-carregar">Atualizar</button>

                {sumirBtn == false ? (
                    <button onClick={carregarProximaPagina} className="btn-carregar">Carregar mais</button>
                ) : ("")}
            </div>

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

export default Relacao_nacionais_e_internacionais;