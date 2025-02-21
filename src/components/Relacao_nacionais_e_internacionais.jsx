import { getFirestore, collection, query, orderBy, limit, startAfter, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dotWave } from "ldrs";
import { db } from "../firebase-config";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Pop_up_disco from "./Pop_up_disco";

const Relacao_nacionais_e_internacionais = ({ consulta }) => {
    const [carregando, setCarregando] = useState(false);
    const { user, loading } = useAuth();
    const [ sumirBtn, setSumirBtn] = useState(false);
    const [discosFiltrados, setDiscosFiltrados] = useState([]);
    const queryClient = useQueryClient();
    let q;
    dotWave.register();
    // coisas do pop-up responsividade
    const [mostrarPopUp, setMostrarPopUp] = useState(false);
    const [dadosSelecionados, setDadosSelecionados] = useState(null);
    
    const abrirPopUp = (dado) => {
        setDadosSelecionados(dado);
        setMostrarPopUp(true);
    }

    // responsividade
    const isNormalScreen = useMediaQuery({ minWidth: 800 })

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

            // console.log("dados recuperados com sucesso!")
            return discos;
        } catch (error) {
            console.error(`Erro ao buscar dados: ${error}`);
            throw error;
        } finally {
            setCarregando(false)
        }
    };

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

    // executa a query e armazena os discos no cache
    const { data: discos, isLoading, error } = useQuery({
        queryKey: ['discos'],
        queryFn: pegarDadosIniciais,
        enabled: !!user?.uid,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    const handleUpdate = () => {
        queryClient.invalidateQueries(['discos']);
        queryClient.invalidateQueries(['ultimoDoc']);
        setSumirBtn(false)
    }

    useEffect(() => {
        if (!discos || discos.length === 0) return;
    
        if (consulta === "discos-nacionais") {
            const filtrados = discos.filter(disco => disco.Origem_disco === "nacional");
            setDiscosFiltrados(filtrados);
        } else if (consulta === "discos-internacionais") {
            const filtrados = discos.filter(disco => disco.Origem_disco === "internacional");
            setDiscosFiltrados(filtrados);
        }
    }, [consulta, discos]);
    
    

    if (isLoading) return <div className="carregamento">
                            <l-dot-wave
                                size="60"
                                speed="1" 
                                color="white" 
                            ></l-dot-wave>
                        </div>;

    if (error) return <p>Erro: {error.message}</p>;

    if (isNormalScreen) {
        return (
            <div className="div-da-table">
                <table>
                    <thead>
                        <tr className="cell-title">
                            <th colSpan="13">{consulta == "discos-nacionais" ? (
                                "Discos nacionais"
                            ) : (
                                "Discos internacionais"
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discosFiltrados.map((discoFiltrado) => (
                            <tr key={discoFiltrado.id}>
                                <td>{discoFiltrado.Nome_artista}</td>
                                <td>{discoFiltrado.Titulo_album}</td>
                                <td>{discoFiltrado.Tamanho}</td>
                                <td>{discoFiltrado.Ano}</td>
                                <td>{discoFiltrado.Origem_artista}</td>
                                <td>{discoFiltrado.Origem_disco}</td>
                                <td>{discoFiltrado.Situacao_disco}</td>
                                <td>{discoFiltrado.Situacao_capa}</td>
                                <td>{discoFiltrado.Estilo}</td>
                                <td>{discoFiltrado.Tipo}</td>
                                <td>{discoFiltrado.Encarte}</td>
                                <td>{discoFiltrado.Observacoes}</td>
                                <td><Link to={`/editar-disco/${discoFiltrado.id}`}>Editar</Link></td>
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
    } else {
        return (
            <div className="div-da-table">
                {mostrarPopUp && (
                    <Pop_up_disco dados={dadosSelecionados} fechar={() => setMostrarPopUp(false)}/>
                )}

                <table>
                    <thead>
                        <tr className="cell-title">
                            <th colSpan="5">{consulta == "discos-nacionais" ? (
                                "Discos nacionais"
                            ) : (
                                "Discos internacionais"
                            )}</th>
                        </tr>
                        <tr className="cabecalho">
                            <th>Artista</th>
                            <th>Título</th>
                            <th>Ano(P)</th>
                            <th>Origem Disco</th>
                            <th>Visualização completa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discosFiltrados.map((discoFiltrado) => (
                            <tr key={discoFiltrado.id}>
                                <td>{discoFiltrado.Nome_artista}</td>
                                <td>{discoFiltrado.Titulo_album}</td>
                                <td>{discoFiltrado.Ano}</td>
                                <td>{discoFiltrado.Origem_disco}</td>
                                <td><button type="button" className="btn-ver-mais" onClick={() => abrirPopUp(discoFiltrado)}>Ver mais</button></td>
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
}

export default Relacao_nacionais_e_internacionais;