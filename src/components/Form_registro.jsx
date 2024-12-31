import { useEffect, useState } from "react"
import { BsLock, BsUnlock } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase-config"
import { doc, setDoc } from "firebase/firestore"
import { useAuth } from "../AuthContext"
import Swal from "sweetalert2"

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

    return (
        <form className="form-direita" onSubmit={handleSubmit}>
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
                    userName == "" || email == "" || tell == ""
                }
                >
                    Criar conta!
            </button>
            <label>Já tem uma conta? <Link to={'/auth/login'}>Entre aqui!</Link></label>
        </form>
    )
}

export default Form_registro