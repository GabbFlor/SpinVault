import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './routes/Home.jsx'
import Geral from './styles/Geral.jsx'
import Cadastrar_discos from './routes/Cadastrar_discos.jsx'
import Informacoes_gerais from './routes/Informacoes_gerais.jsx'
import Registro from './routes/Registro.jsx'
import Login from './routes/Login.jsx'
import { AuthProvider } from './AuthContext.jsx'
import ProtectedRoute from './ProtectedRoutes.jsx'
import Perfil from './routes/Perfil.jsx'

// .css que armazena o import das fontes do site
import '../src/styles/fonts.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Editar_perfil from './routes/Editar_perfil.jsx'
import Mudar_senha from './routes/Mudar_senha.jsx'
import Error_page from './routes/ErrorPage.jsx'
import Relacao_discos from './routes/Relacao-discos.jsx'
import Relacao_especifica from './routes/Relacao_especifica.jsx'
import Relacao_busca_inteligente from './routes/Relacao_busca_inteligente.jsx'
import Editar_disco from './routes/Editar_disco.jsx'


const routes = createBrowserRouter([
  {
    path: "/",

    element: <App />,

    errorElement: <Error_page />,

    children: [
      // rotas publicas (podem ser acessadas por qualquer um)
      {
        path: "/auth/registro",
        element: <Registro />
      },
      {
        path: "/auth/login",
        element: <Login />
      },
      
      // rotas protegidas (só podem ser acessadas por usuários autenticados)
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: "/cadastrar-discos",
        element: (
          <ProtectedRoute>
            <Cadastrar_discos />
          </ProtectedRoute>
        )
      },
      {
        path: "/informacoes-gerais",
        element: (
          <ProtectedRoute>
            <Informacoes_gerais />
          </ProtectedRoute>
        )
      },
      {
        path: "/perfil",
        element: (
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        )
      },
      {
        path: "/perfil/editar",
        element: (
          <ProtectedRoute>
            <Editar_perfil />
          </ProtectedRoute>
        )
      },
      {
        path: "/perfil/:profile_id",
        element: (
          <ProtectedRoute>
            <Perfil /> 
          </ProtectedRoute>
        )
      },
      {
        path: "/perfil/mudar-senha",
        element: (
          <ProtectedRoute>
            <Mudar_senha /> 
          </ProtectedRoute>
        )
      },
      {
        path: "/relacao/:argumento",
        element: (
          <ProtectedRoute>
            <Relacao_discos /> 
          </ProtectedRoute>
        )
      },
      {
        path: "/relacao-especifica/:argumento",
        element: (
          <ProtectedRoute>
            <Relacao_especifica /> 
          </ProtectedRoute>
        )
      },
      {
        path: "/busca-inteligente",
        element: (
          <ProtectedRoute>
            <Relacao_busca_inteligente /> 
          </ProtectedRoute>
        )
      },
      {
        path: "/busca-inteligente/:busca",
        element: (
          <ProtectedRoute>
            <Relacao_busca_inteligente /> 
          </ProtectedRoute>
        )
      },
      {
        path: "/editar-disco/:id",
        element: (
          <ProtectedRoute>
            <Editar_disco /> 
          </ProtectedRoute>
        )
      },
    ]
  }
])

// cria o react query
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Geral />
        <RouterProvider router={routes} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
