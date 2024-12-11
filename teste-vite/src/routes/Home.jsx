import Grid_home from "../components/Grid_home";
import Header from "../components/Header";
import "../styles/Home_style.css"

const Home = () => {
    return (
        <div className="Pag-Home">
            <Header />
            
            <main>
                <h1>Controle de discos de vinil</h1>

                <Grid_home />
            </main>
        </div>
    )
}

export default Home;