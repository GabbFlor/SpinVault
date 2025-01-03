import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Perfil_logado from "../components/Perfil_logado";
import Perfil_por_id from "../components/Perfil_por_id";
import Perfil_style from "../styles/Perfil_style";

const Perfil = () => {
    const { profile_id } = useParams();

    return (
        <div className="Pag-perfil">
            <Perfil_style />

            <Header />

            <main>
                <h1>{profile_id != null ? (<Perfil_por_id profile_id={profile_id}/>) : (<Perfil_logado />)}</h1>
            </main>
        </div>
    )
}

export default Perfil;