import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase-config'
import { useAuth } from '../AuthContext';
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { tailChase } from 'ldrs';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card_img from '../assets/card-img.png'
import Swal from 'sweetalert2';

const Perfil_logado = () => {
    const { user, loading } = useAuth();
    const [ diferencaData, setDiferencaData ] = useState(0);
    const [ carregando, setCarregando ] = useState(false);
    const [ ultimosDiscos, setUltimosDiscos ] = useState([]);
    const queryClient = useQueryClient();
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

            pegarUltimosDiscos();
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

    const handleLogout = () => {
        Swal.fire({
            icon: "question",
            title: "Confirmação",
            text: "Você tem certeza que deseja sair da sua conta?",
            showConfirmButton: true,
            showCancelButton: true,
        })
        .then(async(result) => {
            if (result.isConfirmed) {
                // Remove qualquer cache relacionado a discos que tiver no navegador do usuário
                queryClient.clear();

                await signOut(auth);
            }
        })
    }

    // recuperando infos dos discos
    const pegarUltimosDiscos = async () => {
        try {
            setCarregando(true)

            const discosRef = collection(db, "Discos");
            const q = query(
                discosRef, 
                orderBy("Criado_em", "desc"),
                where("User_id", "==", user.uid),
                limit(3),
            );

            const querySnapshot = await getDocs(q);
            const discos = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return setUltimosDiscos(discos);
        } catch (error) {
            console.log(error)            
        } finally {
            setCarregando(false)
        }
    }

    return (
        <section className='section-perfil'>
            <section className='perfil-infos'>
                <div className="img-temporario">
                    .
                </div>
                {/* IMAGEM DO PERFIL */}

                <div className='infos-up'>
                    <h1>{userProfile.User_name}</h1>
                    <p className='destaque'>{userProfile.Estado}. {userProfile.Cidade}</p>

                    <div className='div-infos-btns'>
                        <button onClick={() => handleLogout()} className='btn-logout'>Logout</button>
                        <Link to={'/perfil/editar'} className='btn-logout'>Editar</Link>
                        <Link to={'/perfil/mudar-senha'} className='btn-logout'>Mudar senha</Link>
                    </div>
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
                    {ultimosDiscos.map((disco) => (
                        <div className="card" key={disco.id}>
                            <img src={Card_img} alt="Imagem do cartão" />

                            <h1 className='card-title'>{disco.Titulo_album}</h1>

                            <Link className='btn-card' to={`/editar-disco/${disco.id}`}>Editar</Link>
                        </div>
                    ))}
                </section>
            </section>
        </section>
    )

    // Pegando os dados do perfil armazenados em cache:
            // <p>Nome de usuário: </p>
            // <p>Tell: {userProfile.Tell}</p>
            // <p>Criado em: {Criado_em_convertido}</p>
    
    // Btn de logout:
            // 
}

export default Perfil_logado;