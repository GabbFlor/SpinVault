import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tailChase } from 'ldrs';
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import Card_img from '../assets/card-img.png'

const Perfil_por_id = ({ profile_id }) => {
    const [ diferencaData, setDiferencaData ] = useState(0);
    const [ profile, setProfile ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();
    tailChase.register()

    const catchUserProfile = async (profile_id) => {
        try {
            const userDoc = doc(db, "Users", profile_id);
            const userSnapshot = await getDoc(userDoc);
    
            if(userSnapshot.exists()) {
                setProfile(userSnapshot.data());

                setLoading(false)
            } else {
                navigate('/error')
            }
        } catch(error) {
            console.error(error.message)
        }
        
    };

    useEffect(() => {
        catchUserProfile(profile_id);
    }, [])

    // calcula e converte a data em dias
    useEffect(() => {
        if (profile && profile.Criado_em) {
            const calcularDiferenca = () => {
                const now = Date.now();

                const CriadoEm = profile.Criado_em.toMillis();

                const diferencaEmMs = now - CriadoEm;
                const segundos = Math.floor(diferencaEmMs / 1000);
                const minutos = Math.floor(segundos / 60);
                const horas = Math.floor(minutos / 60);
                const dias = Math.floor(horas / 24);

                setDiferencaData(dias)
            }

            calcularDiferenca();
        }
    }, [profile])

    if (loading == true) return (
        <div className="carregamento-perfil-page">
            <l-tail-chase
                size="80"
                speed="1.75" 
                color="#fff"  
            ></l-tail-chase>
        </div>
    );

    return (
        <section className="section-perfil">
            <section className='perfil-infos'>
                <div className="img-temporario">
                    .
                </div>
                {/* IMAGEM DO PERFIL */}

                <div className='infos-up'>
                    <h1>{profile.User_name}</h1>
                    <p className='destaque'>{profile.Estado}. {profile.Cidade}</p>
                </div>

                <div className='sub-perfil-info'>
                    <div>
                        <p>Tempo de conta</p>

                        <p><span>{diferencaData}</span> {diferencaData > 1 ? ("dias") : ("dia")}</p>
                    </div>

                    <div>
                        <p>Adicionados</p>

                        <span>12</span>
                    </div>
                </div>
            </section>

            <section className='perfil-add-disks'>
                <h1>Adicionados</h1>

                <section className="cards-disks">
                    <div className="card">
                    <img src={Card_img} alt="Imagem do cartão" />

                        <h1 className='card-title'>Vinil</h1>

                        <button className='btn-card'>Editar</button>
                    </div>

                    <div className="card">
                    <img src={Card_img} alt="Imagem do cartão" />

                        <h1 className='card-title'>Vinil</h1>

                        <button className='btn-card'>Editar</button>
                    </div>

                    <div className="card">
                    <img src={Card_img} alt="Imagem do cartão" />

                        <h1 className='card-title'>Vinil</h1>

                        <button className='btn-card'>Editar</button>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default Perfil_por_id;