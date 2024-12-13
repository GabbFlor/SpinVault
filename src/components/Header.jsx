import Icon_disk_img from '../assets/icon_disk.png'
import { BsPersonFill, BsSearch } from "react-icons/bs";
import Header_Style from '../styles/Header_Style';
import logo_Site from '../assets/logo_escrita.png'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Header_Style />

            <Link to={"/"} className='header-logo' title='Início'><img src={logo_Site} alt="Logo" /></Link>

            <section className="section-search">
                <form>
                    <input 
                        type="text"
                        placeholder="Pesquisar disco..."
                    />
                    <button type="submit"><BsSearch/></button>
                </form>

                <div className="disk-counter">
                    <img src={Icon_disk_img} alt="" />

                    <div>
                        <p>1000</p>
                    </div>
                </div>
            </section>

            <BsPersonFill className='icon-person' />
        </header>
    )
}

export default Header;