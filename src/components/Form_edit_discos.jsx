import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useMediaQuery } from '@mui/material'
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase-config'
import Swal from 'sweetalert2'
import { useAuth } from '../AuthContext'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ring2 } from 'ldrs'

const Tamanhos = [
    { value: 12, label: 12 },
    { value: 10, label: 10 },
    { value: 7, label: 7 }
]

const Origem_artista = [
    { value: "interacional", label: "Internacional" },
    { value: "nacional", label: "Nacional" },
    { value: "outra", label: "Outra" }
]

const Origem_disco = [
    { value: "internacional", label: "Internacional" },
    { value: "nacional", label: "Nacional" },
]

const Situacao_disco = [
    { value: "riscos profundos", label: "Riscos profundos" },
    { value: "muitos riscos", label: "Muitos riscos" },
    { value: "poucos riscos", label: "Poucos riscos" },
    { value: "riscos superficiais", label: "Riscos superficiais" },
    { value: "sem riscos", label: "Sem riscos" },
]

const Situacao_capa = [
    { value: "sem capa", label: "Sem capa" },
    { value: "capa ruim", label: "Capa ruim" },
    { value: "capa regular", label: "Capa regular" },
    { value: "capa boa", label: "Capa boa" },
    { value: "capa otima", label: "Capa ótima" },
]

const Estilo = [
    { value: "rock", label: "Rock (todos os estilos)" },
    { value: "clássica", label: "Música Clássica" },
    { value: "MPB", label: "MPB" },
    { value: "eletronico", label: "Eletrônico" },
    { value: "outro", label: "Outro" },
]

const Tipo = [
    { value: "simples", label: "Simples" },
    { value: "duplo", label: "Duplo" },
    { value: "triplo", label: "Triplo" },
]

const Encarte = [
    { value: "sim", label: "Sim" },
    { value: "nao", label: "Não" },
]

const Form_edit_discos = ({ id_disco }) => {
    const [nomeArtista, setNomeArtista] = useState("");
    const [tituloAlbum, setTituloAlbum] = useState("");
    const [tamanhoDisco, setTamanhoDisco] = useState(null);
    const [anoDisco, setAnoDisco] = useState(0);
    const [origemArtista, setOrigemArtista] = useState(null);
    const [origemDisco, setOrigemDisco] = useState(null);
    const [situacaoDisco, setSituacaoDisco] = useState(null);
    const [situacaoCapa, setSituacaoCapa] = useState(null);
    const [estilo, setEstilo] = useState(null);
    const [tipo, setTipo] = useState(null);
    const [encarte, setEncarte] = useState(null);
    const [observacoes, setObservacoes] = useState("");
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [ carregando, setCarregando ] = useState(false);
    ring2.register()


    // pegando as infos do usuario
    const { user, loading } = useAuth();

    const HandleSubmit = async (e) => {
            e.preventDefault();
        
            if (nomeArtista !== "" && tituloAlbum !== "" && anoDisco !== "" && tamanhoDisco !== null && origemArtista !== null &&
                origemDisco !== null && situacaoDisco !== null && situacaoCapa !== null && estilo !== null && tipo !== null && encarte !== null) {
                
                try {
                    await updateDoc(doc(db, "Discos", id_disco), {
                        User_id: user.uid,
                        Nome_artista: nomeArtista,
                        Titulo_album: tituloAlbum,
                        Tamanho: tamanhoDisco,
                        Ano: Number(anoDisco),
                        Origem_artista: origemArtista,
                        Origem_disco: origemDisco,
                        Situacao_disco: situacaoDisco,
                        Situacao_capa: situacaoCapa,
                        Estilo: estilo,
                        Tipo: tipo,
                        Encarte: encarte,
                        Observacoes: observacoes,
                        Criado_em: new Date(),
                    })
    
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso!",
                        text: `O álbum ${tituloAlbum} foi editado com sucesso!`,
                        timer: 1000,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                    .then(() => {
                        // limpa todo o cache para atualizar os discos
                        queryClient.clear();

                        navigate(`/relacao/titulo-album`)
                    })
                } catch(error) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro!",
                        text: `Erro ao editar o álbum: ${error.message}, contate algum administrador do sistema.`,
                        showConfirmButton: true,
                    })
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: `Todos os campos do formulário devem estar preenchidos!`,
                    showConfirmButton: true,
                })
            }
    };

    const handleDeleteDisk = async (id) => {
        Swal.fire({
            title: "Você tem certeza?",
            text: "Após deletar, não será possível recuperar os dados do álbum.",
            confirmButtonText: "Deletar",
            icon: "question",
            denyButtonText: `Não`,
            showDenyButton: true,
        }).then(async (result) => { // Transformamos essa função em async
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, "Discos", id));

                    Swal.fire({
                        title: "Disco deletado com sucesso!",
                        icon: "success"
                    }).then (() => { 
                        navigate("/relacao/titulo-album");
                    })
                    
                } catch (error) {
                    console.error(error);
                    Swal.fire("Erro ao deletar", "Tente novamente mais tarde.", "error");
                }
            } else if (result.isDenied) {
                console.log(`Ação "deletar disco" cancelada.`)
            }
        });
    };

    // usando o media query para ajustar a fonte
    const isLargeScreen = useMediaQuery('(min-width:1500px)');
    const fontSize = isLargeScreen ? '0.75vw' : '1vw'

    const customStyleSelect = {
        // se refere ao Select no estado padrao, sem nada selecionado
        control: (base, { isFocused }) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            border: isFocused ? '1px solid #C47D69' : '1px solid #ccc',
            boxShadow: isFocused ? ' 0 0 0 1px #C47D69' : 'none',
            '&:hover': {
                border: '1px solid #C47D69',
            }
        }),
        // se refere a quando tem um valor selecionado no select
        singleValue: (base) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            color: 'rgb(74, 74, 74)',
        }),
        placeholder: (base) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            color: '#888',
        }),
        option: (base, { isSelected }) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            backgroundColor: isSelected ? '#C47D69' : 'white',
            color: isSelected ? 'black' : '#333',
            ':hover': {
                backgroundColor: '#c47d699a',
                color: 'black',
                boxShadow: '0 0 0 1px #c47d699a'
            },
        }),
    };

    // recupera os dados do disco da URL
    const buscarDisco = async (disco, user_uid) => {
        try {
            setCarregando(true);
            const docRef = doc(db, "Discos", disco);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                
                // verifica se o disco é mesmo do usuário
                if(data.User_id === user_uid) {
                    setNomeArtista(data.Nome_artista);
                    setTituloAlbum(data.Titulo_album);
                    setTamanhoDisco(data.Tamanho);
                    setAnoDisco(data.Ano);
                    setOrigemArtista(data.Origem_artista);
                    setOrigemDisco(data.Origem_disco);
                    setSituacaoDisco(data.Situacao_disco);
                    setSituacaoCapa(data.Situacao_capa);
                    setEstilo(data.Estilo);
                    setTipo(data.Tipo);
                    setEncarte(data.Encarte);
                    setObservacoes(data.Observacoes);
                    
                } else {
                    navigate(`/error-not-found`)
                    
                }
            } else {
                navigate(`/error-not-found`)
                
            }
        } catch (error) {
            console.error(`Erro no try/catch: ${error}`);
        } finally {
            setCarregando(false);
        }
    }
    useEffect(() => {
        buscarDisco(id_disco, user.uid);
    }, [id_disco])


    if (carregando) return (
        <form className="form-direita-carregando" 
            style={{ 
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "50%"
            }}>
            <l-ring-2
                size="80"
                stroke="5"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8" 
                color="#C47D69" 
            ></l-ring-2>
        </form>
    )

    return (
        <form className='form-direita' onSubmit={HandleSubmit}>
            <div className='div-type'>
                <label htmlFor="Nome-artista">Nome do Artista</label>
                <input 
                    type="text" 
                    name="Nome-artista" 
                    value={nomeArtista}
                    onChange={(e) => setNomeArtista(e.target.value.toLowerCase())}
                    placeholder='Digite...'
                />
            </div>

            <div className='div-type'>
                <label htmlFor="Titulo-album">Titulo do Álbum</label>
                <input 
                    type="text" 
                    name="Titulo-album" 
                    value={tituloAlbum}
                    onChange={(e) => setTituloAlbum(e.target.value)}
                    placeholder='Digite...'
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Tamanho-disco">Tamanho</label>
                <Select 
                    options={Tamanhos} 
                    value={Tamanhos.find(option => option.value === tamanhoDisco) || null}
                    onChange={(e) => setTamanhoDisco(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                />
            </div>

            <div className='div-type'>
                <label htmlFor="Ano-disco">Ano</label>
                <input 
                    type="number" 
                    name="Ano-disco" 
                    value={anoDisco}
                    onChange={(e) => setAnoDisco(e.target.value)}
                    placeholder='Digite...'
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Origem-artista">Origem do Artista</label>
                <Select 
                    options={Origem_artista} 
                    value={Origem_artista.find(option => option.value === origemArtista) || null}
                    onChange={(e) => setOrigemArtista(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Origem-disco">Origem do Disco</label>
                <Select 
                    options={Origem_disco} 
                    value={Origem_disco.find(option => option.value === origemDisco) || null}
                    onChange={(e) => setOrigemDisco(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Situacao-disco">Situação do Disco</label>
                <Select 
                    options={Situacao_disco} 
                    value={Situacao_disco.find(option => option.value === situacaoDisco) || null}
                    onChange={(e) => setSituacaoDisco(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Situacao-capa">Situação da Capa</label>
                <Select 
                    options={Situacao_capa} 
                    value={Situacao_capa.find(option => option.value === situacaoCapa) || null}
                    onChange={(e) => setSituacaoCapa(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Estilo">Estilo</label>
                <Select 
                    options={Estilo} 
                    value={Estilo.find(option => option.value === estilo) || null}
                    onChange={(e) => setEstilo(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Tipo">Tipo</label>
                <Select 
                    options={Tipo} 
                    value={Tipo.find(option => option.value === tipo) || null}
                    onChange={(e) => setTipo(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Encarte">Encarte</label>
                <Select 
                    options={Encarte} 
                    value={Encarte.find(option => option.value === encarte) || null}
                    onChange={(e) => setEncarte(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                />
            </div>

            <div className='div-type'>
                <label htmlFor="Observacoes">Observações</label>
                <input 
                    type="text" 
                    name="Observacoes" 
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder='Digite...'
                />
            </div>

            <div className="div-buttons-form">
                <button type="button" className="btn-submit-disk delete-disk" onClick={() => handleDeleteDisk(id_disco)}>Deletar disco</button>

                <button type="submit" className="btn-submit-disk">Aplicar mudanças</button>
            </div>
        </form>
    )
}

export default Form_edit_discos;