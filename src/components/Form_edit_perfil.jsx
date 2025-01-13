import { Link, useNavigate } from 'react-router-dom';
import Select from "react-select"
import axios from "axios"
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../AuthContext';
import Swal from 'sweetalert2';
import Profile_default from "../assets/img-profile-default.png"

const Form_edit_perfil = () => {
    const { user, loading } = useAuth();
    const [userName, setUserName] = useState("");
    const [telefone, setTelefone] = useState("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // useState para seleção de localidade
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);
    const [cidadeSelecionado, setCidadeSelecionado] = useState(null);

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
            color: 'black',
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

    // recuperando os dados do cache
    const catchUserProfile = async (uid) => {
        const userDoc = doc(db, "Users", uid);
        const userSnapshot = await getDoc(userDoc);

        if(userSnapshot.exists()) {
            return userSnapshot.data();
        } else {
            throw new Error("Usuario nao encontrado.")
        }
    };
    const { data: userProfile, isLoading, error } = useQuery({
        queryKey: ['userProfile', user.uid],

        queryFn: () => catchUserProfile(user.uid),

        staleTime: 1000 * 60 * 5,
    });

    // Carregar os estados e as cidades da API do IBGE
    useEffect(() => {
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then(response => {
                // formatando os etados para o React Select poder ler
                const estadosFormatados = response.data.map(estado => ({
                    value: estado.sigla,
                    label: estado.nome
                }));
                setEstados(estadosFormatados);
            })
            .catch(err => console.error(`Erro ao carregar os estados: ${err}`))
    }, [userProfile])

    useEffect(() => {
        if(estadoSelecionado) {
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
            .then(response => {
                const cidadesFormatadas = response.data.map(cidade => ({
                    value: cidade.nome,
                    label: cidade.nome
                }));
                setCidades(cidadesFormatadas)
                
                if(userProfile?.Cidade) {
                    const cidadeEncontrada = cidadesFormatadas.find(cidade => cidade.value === userProfile.Cidade);
                    setCidadeSelecionado(cidadeEncontrada ? cidadeEncontrada.value : null)
                }
            })
            .catch(err => console.error(`Erro ao carregar as cidades: ${err}`));
        } else {
            setCidades([]);
        }
    }, [estadoSelecionado, userProfile]);

    // setando as informações para os valores já existentes do perfil do usuário
    useEffect(() => {
        if (userProfile) {
            setUserName(userProfile.User_name || isLoading);
            setTelefone(userProfile.Tell || isLoading)
            setEstadoSelecionado(userProfile.Estado || isLoading);
            setCidadeSelecionado(userProfile.Cidade || isLoading);
        }
    }, [userProfile]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateDoc(doc(db, "Users", user.uid), {
                User_name: userName,
                Estado: estadoSelecionado,
                Cidade: cidadeSelecionado,
                Tell: telefone
            });
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Os dados da sua conta foram atualizados com sucesso.",
                timer: 1000,
                showCancelButton: false,
                showConfirmButton: false
            })
            .then(() => {
                // atualiza as infos direto no cache para economizar requests do firebase
                queryClient.setQueryData(['userProfile'], (oldData) => ({
                    ...oldData,
                    User_name: userName,
                    Tell: telefone,
                    Estado: estadoSelecionado,
                    Cidade: cidadeSelecionado
                }));

                // invalida o cache anterior de userProfile
                queryClient.invalidateQueries(['userProfile', user.uid]);

                navigate('/perfil')
            })
        } catch(error) {
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: `Erro ao alterar as informações da sua conta: ${error.message}`,
                showConfirmButton: true,
                showCancelButton: false
            })
        }
    }
    
    return (
        <section className="perfil-infos edit-perfil-section">

            <div className='img-temporario'>
                .
            </div>

            <form className='form-edit-perfil' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="NomeUser">Nome de usuário</label>
                    <input 
                        type="NomeUser" 
                        placeholder={isLoading ? ("Carregando...") : ("Digitar nome de usuário...")} 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="Tell">Telefone</label>
                    <input 
                        type="text" 
                        placeholder={isLoading ? ("Carregando...") : ("Digitar telefone...")} 
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>

                <div className='div-select'>
                    <label htmlFor="Estado">Estado</label>
                    <Select
                        options={estados}
                        value={estados.find(option => option.value === estadoSelecionado) || null}
                        onChange={(e) => setEstadoSelecionado(e ? e.value : null)}
                        placeholder={isLoading ? ("Carregando...") : ("Selecione...")} 
                        styles={customStyleSelect}
                    />
                </div>

                <div className='div-select'>
                    <label htmlFor="Cidade">Cidade</label>
                    <Select
                        options={cidades}
                        value={cidades.find(option => option.value === cidadeSelecionado) || null}
                        onChange={(e) => setCidadeSelecionado(e ? e.value : null)}
                        placeholder={isLoading ? ("Carregando...") : ("Selecione...")}
                        styles={customStyleSelect}
                    />
                </div>

                <div className="div-btns-form-edit">
                    <Link to={'/perfil'}>Voltar</Link>

                    <button type='submit'>Pronto</button>
                </div>
            </form>
        </section>
    )
}

export default Form_edit_perfil;