import Icon_disk_img from '../assets/icon_disk.png'
import { BsPersonFill, BsSearch } from "react-icons/bs";
import Header_Style from '../styles/Header_Style';

const Header = () => {
    return (
        <header>
            <Header_Style />

            <div>icon do site aqui</div>

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