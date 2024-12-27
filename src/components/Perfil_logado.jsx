import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config'
import { Navigate } from 'react-router-dom';

const Perfil_logado = () => {
    const handleLogout = async() => {
        await signOut(auth);
    }

    return (
        <section>
            <h1>Área de testes por enquanto</h1>

            <button onClick={() => handleLogout()}>Logout</button>
        </section>
    )
}

export default Perfil_logado;