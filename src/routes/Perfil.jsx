import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Perfil_logado from "../components/Perfil_logado";
import Perfil_por_id from "../components/Perfil_por_id";
import '../styles/Perfil.css';

const Perfil = () => {
    const { profile_id } = useParams();

    return (
        <div className="Pag-perfil">
            {/* style aqui */}

            <Header />

            <main>
                <h1>{profile_id != null ? (<Perfil_por_id profile_id={profile_id}/>) : (<Perfil_logado />)}</h1>
            </main>
        </div>
    )
}

export default Perfil;