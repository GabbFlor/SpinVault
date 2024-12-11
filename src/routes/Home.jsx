import Grid_home from "../components/Grid_home";
import Header from "../components/Header";
import Home_Style from "../styles/Home_style";

const Home = () => {
    return (
        <div className="Pag-Home">
            <Home_Style />

            <Header />
            
            <main>
                <h1>Controle de discos de vinil</h1>

                <Grid_home />
            </main>
        </div>
    )
}

export default Home;