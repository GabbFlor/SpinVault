import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"
import { ring2 } from 'ldrs'

const ProtectedRoute = ({ children }) => {
    ring2.register()

    // puxa as infos do user (se existir)
    const { user, loading } = useAuth();

    // exibe uma tela de carregamento
    if (loading) return (
        <div className="carregamento">
            <l-ring-2
                size="80"
                stroke="5"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8" 
                color="#C47D69" 
            ></l-ring-2>
        </div>
    )

    // retorna o componente certo caso estiver logado, se nao envia para /login
    return user ? children : <Navigate to="/auth/login" />
}

export default ProtectedRoute;