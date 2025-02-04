import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";

const Relacao_especifica = () => {
    const { argumento } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(argumento != "discos-nacionais" && argumento != "discos-internacionais") {
            navigate(`/error-not-found`)
        }
    })

    return (
        <div className="div-Relacao_especifica">
            {/* Style aqui */}

            <Header />

            <main>
                {argumento == "discos-nacionais" ? (
                    <h1>Apenas discos NACIONAIS aqui!</h1>
                ) : (
                    <h1>Apenas discos INTERNACIONAIS aqui!</h1>
                )}
            </main>
        </div>
    )
}

export default Relacao_especifica;