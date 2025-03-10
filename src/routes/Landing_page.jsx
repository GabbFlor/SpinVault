import Header_apresentacao from "../components/Header_apresentacao";
import banner from "../assets/banner.png"
import Mini_disco from "../assets/Mini_disco.png"
import clique_aqui from "../assets/imagem_cliqueaqui.png"
import { Link } from "react-router-dom";
import Landing_page_style from "../styles/Landing_page_style";

const Landing_page = () => {
    return (
        <div className="Pag_landing_page">
            <Landing_page_style />

            <Header_apresentacao />

            <main>
                {/* banner */}
                <section className="banner_section">
                    <img src={banner} alt="Banner" />
                </section>

                {/* textinho top */}
                <section className="text_section">
                    <div>
                        <h1>Vinil</h1>
                        <p>O Som que Nunca Sai de Moda Apaixonado 
                            por vinil? Então você vai adorar nossa 
                            plataforma! Com um catálogo que vai de 
                            clássicos atemporais a discos obscuros e 
                            raros, temos algo para todos os gostos. 
                            Navegue, descubra e reviva a magia do vinil. 
                            Afinal, música boa nunca sai de moda.</p>
                    </div>
                </section>

                <section className="grid-section">
                    <div className="mini-disco-div">
                        <img src={Mini_disco} alt="Mini disco" />
                    </div>

                    <h1>O que você vai encontrar?</h1>

                    <section className="grid">
                        <div className="grid-color">
                            Sinta o prazer de ouvir seus artistas favoritos em vinil! Nossa biblioteca digital oferece discos de todos os estilos, desde os mais tradicionais até os mais modernos. Ouça e experimente a profundidade sonora do vinil. Cada clique é uma viagem musical única.
                        </div>

                        <div className="grid-color">
                            Se você é um verdadeiro fã de vinil, sabe que cada disco é uma história. Com nossa seleção curada, você encontrará álbuns essenciais para sua coleção, além de surpresas para expandir seus horizontes musicais. É hora de reviver as boas vibrações da agulha no disco!
                        </div>

                        <div>
                            Na nossa biblioteca de vinil, não importa o seu gosto musical: temos discos para todos. Do rock clássico ao jazz, do hip hop ao MPB, explore uma variedade imensa de opções e descubra novos álbuns para adicionar à sua coleção. Venha se perder em um mundo de músicas incríveis!
                        </div>

                        <div>
                            Para quem é apaixonado por vinil, cada álbum é uma história por si só. Nossa coleção selecionada traz os discos imprescindíveis para sua estante, além de novidades que vão ampliar sua jornada musical. É o momento perfeito para reviver as sensações da agulha tocando o vinil!
                        </div>
                    </section>
                </section>
            </main>
            <footer>
                <img src={clique_aqui} alt="img clique aqui" />

                <div>
                    <h1>Clique <Link to={"/auth/registro"}>aqui</Link> para <br />fazer o seu cadastro</h1>
                </div>
            </footer>
        </div>
    )
}

export default Landing_page;