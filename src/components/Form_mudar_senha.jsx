import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { BsLock, BsUnlock } from "react-icons/bs"
import { signOut, updatePassword } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../firebase-config";

const Form_mudar_senha = () => {
    const [ email, setEmail ] = useState("");
    const [ novaSenha, setNovaSenha ] = useState("");
    const [ confirmNovaSenha, setConfirmNovaSenha ] = useState("");
    const [ iconLockPassW, setIconLockPassW ] = useState(<BsLock />);
    const [ iconConfirmLockPassW, setIconConfirmLockPassW ] = useState(<BsLock />);
    const [ typePassW, setTypePassW ] = useState("password");
    const [ typeConfirmPassW, setTypeConfirmPassW ] = useState("password");
    const [ verificPassW, setVerificPassW ] = useState(null);
    const { user, loading} = useAuth();

    useEffect(() => {
        setEmail(user.email)
    }, [])

    const handleShowPassword = () => {
        if (typePassW == "password") {
            setTypePassW("text")
            setIconLockPassW(<BsUnlock />)
        } else {
            setTypePassW("password")
            setIconLockPassW(<BsLock />)
        }
    }
    const handleShowConfirmPassword = () => {
        if (typeConfirmPassW == "password") {
            setTypeConfirmPassW("text")
            setIconConfirmLockPassW(<BsUnlock />)
        } else {
            setTypeConfirmPassW("password")
            setIconConfirmLockPassW(<BsLock />)
        }
    }

    // verificando se as duas senhas são iguais
    useEffect(() => {
        if (novaSenha == "" && confirmNovaSenha == "") {
            setVerificPassW(null)
        } else if (novaSenha == confirmNovaSenha && novaSenha !== "" && confirmNovaSenha !== "") {
            setVerificPassW(true)
        } else {
            setVerificPassW(false)
        };
    }, [novaSenha, confirmNovaSenha])

    const handleChangePassword = async (e) => {
        e.preventDefault();

        try {
            await updatePassword(user, novaSenha);

            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Sua senha foi atualizada com sucesso, entre na sua conta novamente.",
                showConfirmButton: true
            })
            .then(() => {
                signOut(auth);
            })
        } catch (error) {
            if(error.code === 'auth/requires-recent-login') {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: `Para mudar de senha, é preciso um login recente, saia e entre da sua conta e tente novamente.`,
                    showConfirmButton: true
                })
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: `Erro ao mudar a sua senha: ${error.message}`,
                    showConfirmButton: true
                })
            }
        }
    }

    return (
        <form className="form-mudar-senha" onSubmit={handleChangePassword}>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    style={{ textDecoration: "underline" }}
                />
            </div>
            
            <div className="div-password">
                <label htmlFor="nova-senha">Nova senha</label>
                <input 
                    type={typePassW} 
                    placeholder="Digite a nova senha..."
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)} 
                />
                <button type="button" className="btn-show-passw" onClick={handleShowPassword}>
                    {iconLockPassW}
                </button>
            </div>

            <div className="div-password">
                <label htmlFor="confirm-nova-senha">Confirmação da nova senha</label>
                <input 
                    type={typeConfirmPassW} 
                    placeholder="Confirme a senha..."
                    value={confirmNovaSenha}
                    onChange={(e) => setConfirmNovaSenha(e.target.value)} 
                />
                <button type="button" className="btn-show-passw" onClick={handleShowConfirmPassword}>
                    {iconConfirmLockPassW}
                </button>
            </div>

            {verificPassW == true ? (
                <label htmlFor="verificacao" style={{ color: "#00a2ff" }}>As senhas coincidem.</label>
            ) : verificPassW == false ? (
                <label htmlFor="verificacao" style={{ color: "#c91302" }}>As senhas não coincidem.</label>
            ) : ""}

            <div className="div-buttons-edit-perfil">
                <Link to={"/perfil"}>Voltar</Link>

                <button 
                    type="submit"
                    disabled={
                        verificPassW == false || verificPassW == null ||
                        novaSenha == "" || confirmNovaSenha == ""
                    }
                    className="btn-confirm-nova-senha"
                >Confirmar</button>
            </div>
        </form>
    )
}

export default Form_mudar_senha;