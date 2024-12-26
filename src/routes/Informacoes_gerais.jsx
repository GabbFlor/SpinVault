import Form_informacoes_gerais from "../components/Form_informacoes_gerais";
import Header from "../components/Header";
import { BsCardList } from "react-icons/bs";
import Informacoes_gerais_style from "../styles/Informacoes_gerais_style";

const Informacoes_gerais = () => {
    return (
        <div className="Pag-informacoes-gerais">
            <Informacoes_gerais_style />

            <Header />

            <main>
                <section className="section-form-infos-gerais">
                    <div className="form-esquerda">
                        <h1>Informações<br /> Gerais <BsCardList /></h1>
                    </div>

                    <Form_informacoes_gerais />
                </section>
            </main>
        </div>
    )
}

export default Informacoes_gerais;