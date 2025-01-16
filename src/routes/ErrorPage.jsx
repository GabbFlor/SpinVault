import { Link } from 'react-router-dom';
import Error_img from '../assets/favicon.png'
import '../styles/Error_page_style.css'

const Error_page = () => {
    return (
        <div className="Pag-error">
            <img src={Error_img} alt="Logo" />

            <section>
                <h1>Página não encontrada!</h1>
                
                <div>
                    <p>Clique aqui para voltar para a <Link to={'/'}>Página inicial</Link></p>
                    <p>Ou clique aqui para ir a <Link to={'/auth/login'}>Página de login</Link></p>
                </div>
            </section>
        </div>
    )
}

export default Error_page;