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


const routes = createBrowserRouter([
  {
    path: "/",

    element: <App />,

    // errorElement

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
        path: "/perfil/:profile_id",
        element: (
          <ProtectedRoute>
            <Perfil /> 
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
