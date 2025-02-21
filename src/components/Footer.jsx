import Logo from "../assets/logo_footer.png"
import { BsInstagram, BsFacebook, BsTwitterX } from "react-icons/bs"
import Footer_style from "../styles/Footer_style";

const Footer = () => {
    return (
        <footer>
            <Footer_style />

            <div className="div-img">
                <img src={Logo} alt="logo" />
            </div>

            <div className="grey-line">
                {/* linha cinza */}
            </div>

            <div className="div-redes-sociais">
                <p>Siga:</p>

                <nav>
                    <p><BsInstagram /></p>
                    <p><BsFacebook /></p>
                    <p><BsTwitterX /></p>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;