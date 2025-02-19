import React, { useState } from 'react'
import Select from 'react-select'
import { useMediaQuery } from '@mui/material'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase-config'
import Swal from 'sweetalert2'
import { useAuth } from '../AuthContext'
import { useQueryClient } from '@tanstack/react-query'

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

const Form_add_discos = () => {
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

    // pegando as infos do usuario
    const { user, loading } = useAuth();

    const HandleSubmit = async (e) => {
        e.preventDefault();
    
        if (nomeArtista !== "" && tituloAlbum !== "" && anoDisco !== "" && tamanhoDisco !== null && origemArtista !== null &&
            origemDisco !== null && situacaoDisco !== null && situacaoCapa !== null && estilo !== null && tipo !== null && encarte !== null) {

            try {
                await addDoc(collection(db, "Discos"), {
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
                });

                Swal.fire({
                    icon: "success",
                    title: "Sucesso!",
                    text: `O álbum ${tituloAlbum} foi adicionado com sucesso!`,
                    timer: 1000,
                    showCancelButton: false,
                    showConfirmButton: false
                })
                .then(() => {
                    setNomeArtista("");
                    setTituloAlbum("");
                    setTamanhoDisco(null);
                    setAnoDisco(0)
                    setOrigemArtista(null)
                    setOrigemDisco(null);
                    setSituacaoDisco(null);
                    setSituacaoCapa(null);
                    setEstilo(null);
                    setTipo(null);
                    setEncarte(null);
                    setObservacoes("")

                    queryClient.invalidateQueries(['countDisks', user.uid]);
                })
            } catch(error) {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: `Erro ao adicionar o álbum: ${error.message}, contate algum administrador do sistema.`,
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

    // usando o media query para ajustar a fonte
    const isLargeScreen = useMediaQuery('(min-width:1500px)');
    const isMediumScreen = useMediaQuery('(min-width: 370px) and (max-width: 800px)')
    const isSmallScreen = useMediaQuery('(max-width: 370px)');
    const fontSize = isSmallScreen ? "2vw" : isMediumScreen ? '1.75vw' : isLargeScreen ? '0.75vw' : '1vw';

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

    return (
        <form className='form-direita' onSubmit={HandleSubmit}>
            <h1 className='title-mobile'>Cadastro de discos do Spin Vault</h1>

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

            <button type="submit" className="btn-submit-disk">Cadastrar disco</button>
        </form>
    )
}

export default Form_add_discos;