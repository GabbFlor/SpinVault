import Icon_disk_img from '../assets/icon_disk.png'
import { BsPersonFill, BsSearch } from "react-icons/bs";
import Header_Style from '../styles/Header_Style';
import logo_Site from '../assets/logo_escrita.png'
import { Link } from 'react-router-dom';
import { db } from "../firebase-config"
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../AuthContext';

const Header = () => {
    const { user, loading } = useAuth();

    // funcao que retorna a quantidade de discos que o usuario adicionou
    const contadorDeDiscos = async (userUid) => {
        try {
            const discosRef = collection(db, "Discos");
            const consulta = query(discosRef, where("User_id", "==", userUid));
            const querySnapshot = await getDocs(consulta);

            return querySnapshot.size;
        } catch(error) {
            console.error(`Erro ao buscar discos: ${error}`)
            return 0;
        }
    }

    // adiciona a quantidade de discos ao cache
    const { data: countDisks, isLoading, error } = useQuery({
        queryKey: ['countDisks', user.uid],

        queryFn: () => contadorDeDiscos(user.uid),

        staleTime: 1000 * 60 * 5,
    });
    
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
                        <p>{isLoading ? ("...") : (countDisks)}</p>
                    </div>
                </div>
            </section>

            <Link to={"/perfil"} title='Perfil'><BsPersonFill className='icon-person' /></Link>
        </header>
    )
}

export default Header;