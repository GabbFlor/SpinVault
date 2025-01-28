import { getFirestore, collection, query, orderBy, limit, startAfter, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../firebase-config";
import { dotWave } from "ldrs";
import { useQueryClient, useQuery } from '@tanstack/react-query'

const Relacao_completa = ({ consulta }) => {
    const [carregando, setCarregando] = useState(false);
    const { user, loading } = useAuth();
    const [ sumirBtn, setSumirBtn] = useState(false);
    const queryClient = useQueryClient();
    let q;
    dotWave.register();

    const pegarDadosIniciais = async () => {
        if(!user || !user.uid) {
            console.warn(`Usuário não está pronto ainda!`);
            return [];
        }

        setCarregando(true);

        try {
            q = query(
                collection(db, "Discos"),
                where("User_id", "==", user.uid),
                orderBy("Titulo_album"),
                limit(20)
            );

            const querySnapshot = await getDocs(q);
            const discos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            // Armazena o ultimoDoc no cache para ele permanecer mesmo dps de trocar de rota
            queryClient.setQueryData(['ultimoDoc'], querySnapshot.docs[querySnapshot.docs.length - 1]);

            console.log("dados recuperados com sucesso!")
            return discos;
        } catch (error) {
            console.error(`Erro ao buscar dados: ${error}`);
            throw error;
        } finally {
            setCarregando(false)
        }
    };

    // executa a query e armazena os discos no cache
    const { data: discos, isLoading, error } = useQuery({
        queryKey: ['discos'],
        queryFn: pegarDadosIniciais,
        enabled: !!user?.uid,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    const carregarProximaPagina = async () => {
        // Acessa o ultimoDocCache do cache antes de qualquer verificação
        const ultimoDocCache = queryClient.getQueryData(['ultimoDoc']);
    
        // impede que o resto do comando seja executado se o ultimoDocCache ainda não estiver disponível
        if (!ultimoDocCache) {
            console.log("Último documento não encontrado. Não há mais dados para carregar.");
            return;
        }
    
        setCarregando(true);
    
        try {
            const q = query(
                collection(db, "Discos"),
                where("User_id", "==", user.uid),
                orderBy("Titulo_album"),
                startAfter(ultimoDocCache),
                limit(20)
            );
    
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
            if (data.length === 0) {
                alert("Não há mais nenhum conteúdo para ser carregado.");
                setSumirBtn(true);
            } else {
                // Atualiza o cache com os novos discos
                queryClient.setQueryData(['discos'], (oldDiscos = []) => {
                    // aqui filtramos tirando os discos com o id já existente (evitar conflitos)
                    const IDsExistentes = new Set(oldDiscos.map((disco) => disco.id));
                    const discosFiltrados = data.filter((disco) => !IDsExistentes.has(disco.id));
                    return [...oldDiscos, ...discosFiltrados];
                });
    
                // Atualiza o ultimoDoc no cache para persistência
                queryClient.setQueryData(['ultimoDoc'], querySnapshot.docs[querySnapshot.docs.length - 1]);

            }
        } catch (error) {
            console.error("Erro ao carregar dados da próxima página:", error);
        } finally {
            setCarregando(false);
        }
    };

    const handleUpdate = () => {
        queryClient.invalidateQueries(['discos']);
        queryClient.invalidateQueries(['ultimoDoc']);
        setSumirBtn(false)
    }

    // codigo para reogranizar as infos da tabela pelo parametro da url
    useEffect(() => {
        if (consulta === "Nome_artista") {
            queryClient.setQueryData(['discos'], (oldData = []) => {
                return [...oldData].sort((a, b) => {
                    return a.Nome_artista.localeCompare(b.Nome_artista);
                });
            });
        }
    
        if (consulta === "Titulo_album") {
            queryClient.setQueryData(['discos'], (oldData = []) => {
                return [...oldData].sort((a, b) => {
                    return a.Titulo_album.localeCompare(b.Titulo_album);
                });
            });
        }
    
        if (consulta === "Origem_disco") {
            queryClient.setQueryData(['discos'], (oldData = []) => {
                return [...oldData].sort((a, b) => {
                    return a.Origem_disco.localeCompare(b.Origem_disco);
                });
            });
        }
    
        if (consulta === "Ano") {
            queryClient.setQueryData(['discos'], (oldData = []) => {
                return [...oldData].sort((a, b) => {
                    return b.Ano - a.Ano; // Ordenação decrescente por Ano
                });
            });
        }
    }, [consulta]);    


    if (isLoading) return <p>Carregando...</p>;

    if (error) return <p>Erro: {error.message}</p>;

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

export default Relacao_completa;