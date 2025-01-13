import Form_mudar_senha from "../components/Form_mudar_senha";
import Header from "../components/Header";
import Perfil_style from "../styles/Perfil_style";

const Mudar_senha = () => {
    return(
        <div className="Pag-mudar-senha">
            <Perfil_style />

            <Header />

            <main>
                <section className="section-mudar-senha">
                    <div className="img-temporario">
                        .
                    </div>

                    <Form_mudar_senha />
                </section>
            </main>
        </div>
    )
}

export default Mudar_senha;