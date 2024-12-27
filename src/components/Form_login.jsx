import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { BsLock, BsUnlock } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

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
            navigate('/');
        } catch(error) {
            alert(`Erro ao fazer login: ${error.message}`)
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