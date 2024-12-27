import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { BsLock, BsUnlock } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import Swal from "sweetalert2";

const Form_login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [typePassW, setTypePassW] = useState("password")
    const [iconPassW, setIconPassW] = useState(<BsLock />)

    const navigate = useNavigate();

    const handleShowPassword = () => {
        if (typePassW == "password") {
            setTypePassW("text")
            setIconPassW(<BsUnlock />)
        } else {
            setTypePassW("password")
            setIconPassW(<BsLock />)
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);

            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Login realizado com sucesso!",
                timer: 1000, 
            })
            .then(() => {
                navigate('/');
            })
        } catch(error) {
            let errorMessage;

            switch(error.message) {
                case "Firebase: Error (auth/invalid-credential).":
                    errorMessage = "Email ou senha incorretos.";
                    break;
                default:
                    errorMessage = `Erro desconhecido: ${error.message}`;
                    break
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

            <button 
                type="submit" 
                className="btn-submit-registro"
                disabled={email == "" || password == ""}
                >
                    Criar conta!
            </button>
            <label>Não tem uma conta? <Link to={'/auth/registro'}>Crie aqui!</Link></label>
        </form>
    )
}

export default Form_login;