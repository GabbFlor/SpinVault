import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase-config'
import { useAuth } from '../AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { tailChase } from 'ldrs';
import { Link } from 'react-router-dom';

const Perfil_logado = () => {
    const { user, loading } = useAuth();
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

    // converte o campo Criado_em (atualmente no tipo Timestamp) para String
    const Criado_em_convertido = userProfile?.Criado_em?.toDate().toLocaleDateString('pt-BR');

    if (isLoading) return (
        <div className="carregamento-perfil-page">
            <l-tail-chase
                size="80"
                speed="1.75" 
                color="#C47D69"  
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
                {/* IMAGEM DO PERFIL */}

                <div>
                    <h1>Nome do perfil</h1>
                    <p>Localização do usuário</p>
                </div>

                <div className='sub-perfil-info'>
                    <div>
                        <p>Tempo de conta</p>

                        <p><span>XX</span> dias</p>
                    </div>

                    <div>
                        <p>Adicionados</p>

                        {/* usar fonte maior do span de cima */}
                        <p>XX</p>
                    </div>
                </div>
            </section>

            <section className='perfil-add-disks'>

            </section>
        </section>
    )

    // Pegando os dados do perfil armazenados em cache:
            // <p>Nome de usuário: {userProfile.User_name}</p>
            // <p>Tell: {userProfile.Tell}</p>
            // <p>Criado em: {Criado_em_convertido}</p>
    
    // Btn de logout:
            // <button onClick={() => handleLogout()}>Logout</button>
}

export default Perfil_logado;