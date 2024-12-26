import { useEffect, useState } from "react"
import { BsLock, BsUnlock } from "react-icons/bs"
import { Link } from "react-router-dom"

const Form_registro = () => {
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [tell, setTell] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [typePassW, setTypePassW] = useState("password")
    const [iconPassW, setIconPassW] = useState(<BsLock />)
    const [typeConfirmPassW, setTypeConfirmPassW] = useState("password")
    const [iconConfirmPassW, setIconConfirmPassW] = useState(<BsLock />)
    const [verificPassW, setVerificPassW] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user !== "" && email !== "" && tell !== "" && password !== "") {
            console.log(`tudo enviado: ${user}, ${email}, ${tell}, ${password}`)
        } else {
            alert(`Nenhum dos campos podem estar vazios!`)
        }
    }

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

    return (
        <form className="form-direita" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="user">Usuário</label>
                <input 
                    type="text"
                    name="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
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
                    user == "" || email == "" || tell == ""
                }
                >
                    Criar conta!
            </button>
            <label>Já tem uma conta? <Link to={'/auth/login'}>Entre aqui!</Link></label>
        </form>
    )
}

export default Form_registro