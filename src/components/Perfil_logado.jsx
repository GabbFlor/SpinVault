import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase-config'
import { useAuth } from '../AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { tailChase } from 'ldrs';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card_img from '../assets/card-img.png'

const Perfil_logado = () => {
    const { user, loading } = useAuth();
    const [ diferencaData, setDiferencaData ] = useState(0);
    tailChase.register()

    // função para pegar o perfil do usuario logado
    const catchUserProfile = async (uid) => {
        const userDoc = doc(db, "Users", uid);
        const userSnapshot = await getDoc(userDoc);

        if(userSnapshot.exists()) {
            return userSnapshot.data();
        } else {
            throw new Error("Usuario nao encontrado.")
        }
    };

    // chamando o react query para puxar as infos do user e armazenar no cache
    const { data: userProfile, isLoading, error } = useQuery({
        // chave que referencia onde vai ser armazenado os dados da query
        queryKey: ['userProfile', user.uid],

        // chama a função para pegar o perfil do user
        queryFn: () => catchUserProfile(user.uid),

        // diz o tempo que os dados ficam armazenados, nesse caso, 5 mins
        staleTime: 1000 * 60 * 5,
    });

    // calcula a diferença entre a data de criação do perfil do usuário e a atual
    useEffect(() => {
        if (userProfile && userProfile.Criado_em) {
            const calcularDiferenca = () => {
                const now = Date.now();

                // converte o Timestamp do firestore para MS para fazer a operação corretamente
                const CriadoEm = userProfile.Criado_em.toMillis();
    
                const diferencaEmMs = now - CriadoEm;
                const segundos = Math.floor(diferencaEmMs / 1000);
                const minutos = Math.floor(segundos / 60);
                const horas = Math.floor(minutos / 60);
                const dias = Math.floor(horas / 24);
    
                setDiferencaData(dias)
            };
    
            calcularDiferenca();
        }
    }, [userProfile]);

    if (isLoading) return (
        <div className="carregamento-perfil-page">
            <l-tail-chase
                size="80"
                speed="1.75" 
                color="#fff"  
            ></l-tail-chase>
        </div>
    );

    if (error) return (
        <div style={{ textAlign: "center" }}>
            <h1>Ocorreu um erro desconhecido</h1>
            <Link to={'/'} style={{ textDecoration: "underline" }}>Clique aqui para voltar para a página inicial</Link>
        </div>
    );

    const handleLogout = async() => {
        await signOut(auth);
    }

    return (
        <section className='section-perfil'>
            <section className='perfil-infos'>
                <div className="img-temporario">
                    .
                </div>
                {/* IMAGEM DO PERFIL */}

                <div>
                    <h1>{userProfile.User_name}</h1>
                    <p className='destaque'>Sp. Santo André</p>
                </div>

                <div className='sub-perfil-info'>
                    <div>
                        <p>Tempo de conta</p>

                        <p><span>{diferencaData}</span> {diferencaData > 1 ? ("dias") : ("dia")}</p>
                    </div>

                    <div>
                        <p>Adicionados</p>

                        {/* usar fonte maior do span de cima */}
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

    // Pegando os dados do perfil armazenados em cache:
            // <p>Nome de usuário: </p>
            // <p>Tell: {userProfile.Tell}</p>
            // <p>Criado em: {Criado_em_convertido}</p>
    
    // Btn de logout:
            // <button onClick={() => handleLogout()}>Logout</button>
}

export default Perfil_logado;