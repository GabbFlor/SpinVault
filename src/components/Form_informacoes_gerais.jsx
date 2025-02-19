import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ring2 } from "ldrs";

const Form_informacoes_gerais = () => {
    const { user, loading } = useAuth();
    const queryClient = useQueryClient();
    ring2.register()

    // recuperando todas as informações
    const carregarDados = async () => {
        const q = query(collection(db, "Discos"), where("User_id", "==", user.uid));
        const querySnapshot = await getDocs(q);

        let contadores = {
            totalDiscos: 0,
            nacionais: 0,
            internacionais: 0,
            simples: 0,
            duplos: 0,
            triplos: 0,
            decada50: 0,
            decada60: 0,
            decada70: 0,
            decada80: 0,
            decada90: 0,
            ano2000: 0,
        };

        // adicionando discos aos contadores 
        querySnapshot.forEach((doc) => {
            const disco = doc.data();
            contadores.totalDiscos++;

            if (disco.Origem_artista == "nacional") {
                contadores.nacionais++;
            } else {
                contadores.internacionais++;
            }

            if (disco.Tipo === "simples") contadores.simples++;
            if (disco.Tipo === "duplo") contadores.duplos++;
            if (disco.Tipo === "triplo") contadores.triplos++;

            const ano = parseInt(disco.Ano);
            if (ano >= 1950 && ano < 1960) contadores.decada50++;
            if (ano >= 1960 && ano < 1970) contadores.decada60++;
            if (ano >= 1970 && ano < 1980) contadores.decada70++;
            if (ano >= 1980 && ano < 1990) contadores.decada80++;
            if (ano >= 1990 && ano < 2000) contadores.decada90++;
            if (ano === 2000) contadores.ano2000++;
        });

        // console.log("Query realizada.")
        return contadores;
    };

    // armazenando os dados em cache
    const { data: infosGerais, isLoading, error, refetch } = useQuery({
        queryKey: ['infosGerais', user.uid],
        queryFn: () => carregarDados(),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })

    if (isLoading) return (
        <form className="form-direita" style={{
            height: "90vh",
        }}>
            <div className="carregamento2">
            <l-ring-2
                size="80"
                stroke="5"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8" 
                color="#C47D69" 
            ></l-ring-2>
        </div>
        </form>
    );

    if (error) return <p>Erro ao carregar os dados.</p>;

    const handleRefetch = () => {
        queryClient.invalidateQueries(['infosGerais', user.uid]);
    }

    return (
        <form className="form-direita">
            <h1 className='title-mobile'>Edição ou descarte de discos do Spin Vault</h1>

            <div>
                <button type="button" className="btn-refetch" onClick={() => handleRefetch()}>Atualizar</button>
            </div>

            <div>
                <label htmlFor="qtd_discos">Quantidade de discos:</label>
                <input 
                    type="text" 
                    name="qtd_discos" 
                    value={infosGerais?.totalDiscos}
                    disabled
                />
            </div>

            <div>
                <label htmlFor="qtd_discos_artistas_nacionais">Discos de artistas nacionais:</label>
                <input 
                    type="text" 
                    name="qtd_discos_artistas_nacionais" 
                    value={infosGerais?.nacionais}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="qtd_discos_artistas_internacionais">Discos de artistas internacionais:</label>
                <input 
                    type="text" 
                    name="qtd_discos_artistas_internacionais" 
                    value={infosGerais?.internacionais}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="qtd_discos_simples">Quantidade de discos simples:</label>
                <input 
                    type="text" 
                    name="qtd_discos_simples" 
                    value={infosGerais?.simples}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="qtd_discos_duplos">Quantidade de discos duplos:</label>
                <input 
                    type="text" 
                    name="qtd_discos_duplos" 
                    value={infosGerais?.duplos}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="qtd_discos_triplos">Quantidade de discos triplos:</label>
                <input 
                    type="text" 
                    name="qtd_discos_triplos" 
                    value={infosGerais?.triplos}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_50">Década de 50:</label>
                <input 
                    type="text" 
                    name="decada_50" 
                    value={infosGerais?.decada50}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_60">Década de 60:</label>
                <input 
                    type="text" 
                    name="decada_60" 
                    value={infosGerais?.decada60}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_70">Década de 70:</label>
                <input 
                    type="text" 
                    name="decada_70" 
                    value={infosGerais?.decada70}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_80">Década de 80:</label>
                <input 
                    type="text" 
                    name="decada_80" 
                    value={infosGerais?.decada80}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_90">Década de 90:</label>
                <input 
                    type="text" 
                    name="decada_90" 
                    value={infosGerais?.decada90}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="anos_2000">Anos 2000:</label>
                <input 
                    type="text" 
                    name="anos_2000" 
                    value={infosGerais?.ano2000}
                    disabled
                />
            </div>
            
        </form>
    )
}

export default Form_informacoes_gerais;