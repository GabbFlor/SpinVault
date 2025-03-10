import { useEffect, useState } from "react"
import { BsLock, BsUnlock } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase-config"
import { doc, setDoc } from "firebase/firestore"
import { useAuth } from "../AuthContext"
import Swal from "sweetalert2"
import axios from "axios"
import Select from "react-select"
import { useMediaQuery } from '@mui/material'

const Form_registro = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [tell, setTell] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [typePassW, setTypePassW] = useState("password")
    const [iconPassW, setIconPassW] = useState(<BsLock />)
    const [typeConfirmPassW, setTypeConfirmPassW] = useState("password")
    const [iconConfirmPassW, setIconConfirmPassW] = useState(<BsLock />)
    const [verificPassW, setVerificPassW] = useState(null);

    // useState para seleção de localidade
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);
    const [cidadeSelecionado, setCidadeSelecionado] = useState(null);

    const navigate = useNavigate();

    // pegar as infos do usuário
    const { user, loading } = useAuth();

    const handleShowPassword = () => {
        if (typePassW == "password") {
            setTypePassW("text")
            setIconPassW(<BsUnlock />)
        } else {
            setTypePassW("password")
            setIconPassW(<BsLock />)
        };
    }
    const handleShowConfirmPassword = () => {
        if (typeConfirmPassW == "password") {
            setTypeConfirmPassW("text")
            setIconConfirmPassW(<BsUnlock />)
        } else {
            setTypeConfirmPassW("password")
            setIconConfirmPassW(<BsLock />)
        };
    }

    // campo para verificar se as senhas sao iguais
    useEffect(() => {
        if (password == "" && confirmPassword == "") {
            setVerificPassW(null)
        } else if(password == confirmPassword && password !== "" && confirmPassword !== "") {
            setVerificPassW(true)
        } else (
            setVerificPassW(false)
        );
    }, [password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const credenciaisDoUsuario = await createUserWithEmailAndPassword(auth, email, password);

            // armazenando as infos do usuario logo apos a criação para evitar problemas com a ordem de execução
            const novoUser = credenciaisDoUsuario.user;

            // cria a query adicionando o id do user como título do documento
            await setDoc(doc(db, "Users", novoUser.uid), {
                User_name: userName,
                Email: email,
                Tell: tell,
                Estado: estadoSelecionado,
                Cidade: cidadeSelecionado,
                Criado_em: new Date(),
            });

            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: `O usuário "${userName}" foi registrado com sucesso!`,
                timer: 1000
            })
            .then(() => {
                navigate('/');
            })
        } catch(error) {
            let errorMessage;

            switch(error.message) {
                case "Firebase: Error (auth/email-already-in-use).":
                    errorMessage = "Esse email já está sendo usado por outro usuário.";
                    break;
                case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                    errorMessage = "A senha fornecida é muito curta, é necessário ao menos 6 caracteres."
                    break;
                case "Firebase: Error (auth/invalid-password).":
                    errorMessage = "A senha é inválida, tente outra."
                    break;
                default:
                    errorMessage = `Ocorreu um erro desconhecido: ${error.message}`
                    break;
            }
            
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: errorMessage,
                showConfirmButton: true
            })
        }
    }

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
    }, [])
    useEffect(() => {
        if(estadoSelecionado) {
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
            .then(response => {
                const cidadesFormatadas = response.data.map(cidade => ({
                    value: cidade.nome,
                    label: cidade.nome
                }));
                setCidades(cidadesFormatadas)
            })
            .catch(err => console.error(`Erro ao carregar as cidades: ${err}`));
        } else {
            setCidades([]);
        }
    }, [estadoSelecionado]);

    // estilos do React Select (ctrl + c, ctrl + v do form add discos)

    // usando o media query para ajustar a fonte
    const isLargeScreen = useMediaQuery('(min-width:1500px)');
    const isMediumScreen = useMediaQuery('(min-width: 500px) and (max-width: 800px)')
    const isSmallScreen = useMediaQuery('(max-width: 500px)');
    const fontSize = isSmallScreen ? "3vw" : isMediumScreen ? '2.5vw' : isLargeScreen ? '0.75vw' : '1vw';

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
        <form className="form-direita" onSubmit={handleSubmit}>
            
            <h1 className="title-mobile">Entre na sua conta.</h1>

            <div>
                <label htmlFor="userName">Usuário</label>
                <input 
                    type="text"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Digite..."
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite..."
                    required
                />
            </div>
            <div>
                <label htmlFor="tell">Telefone</label>
                <input 
                    type="tel"
                    name="tell"
                    value={tell}
                    onChange={(e) => setTell(e.target.value)}
                    placeholder="Digite..."
                    required
                />
            </div>
            <div className="div-select">
                <label htmlFor="estado">Estado</label>
                <Select
                    options={estados}
                    value={estados.find(option => option.value === estadoSelecionado) || null}
                    onChange={(e) => setEstadoSelecionado(e ? e.value : null)}
                    placeholder="Selecione..."
                    styles={customStyleSelect}
                />
            </div>
            <div className="div-select">
                <label htmlFor="cidade">Cidade</label>
                <Select
                    options={cidades}
                    value={cidades.find(option => option.value === cidadeSelecionado) || null}
                    onChange={(e) => setCidadeSelecionado(e ? e.value : null)}
                    placeholder="Selecione..."
                    styles={customStyleSelect}
                />
            </div>
            <div className="input-senha">
                <label htmlFor="senha">Senha</label>
                <input 
                    type={typePassW}
                    name="senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite..."
                    required
                />
                <button type="button" className="btn-show-passw" onClick={handleShowPassword}>
                    {iconPassW}
                </button>
            </div>

            <div className="input-senha">
                <label htmlFor="confirm-senha">Confirme a senha</label>
                <input 
                    type={typeConfirmPassW}
                    name="confirm-senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Digite..."
                    required
                />
                <button type="button" className="btn-show-passw" onClick={handleShowConfirmPassword}>
                    {iconConfirmPassW}
                </button>
            </div>

            {verificPassW == true ? (
                <label htmlFor="verificação" style={{color: "blue"}}>As senhas coincidem</label>
            ) : verificPassW == false ? (
                <label htmlFor="verificação" style={{color: "#750101"}}>As senhas não coincidem</label>
            ) : ""}

            <button 
                type="submit" 
                className="btn-submit-registro"
                disabled={
                    verificPassW == false || verificPassW == null ||
                    userName == "" || email == "" || tell == "" ||
                    estadoSelecionado == null || cidadeSelecionado == null
                }
                >
                    Criar conta!
            </button>
            <label>Já tem uma conta? <Link to={'/auth/login'}>Entre aqui!</Link></label>
        </form>
    )
}

export default Form_registro