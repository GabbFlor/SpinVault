import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './routes/Home.jsx'
import Geral from './styles/Geral.jsx'
import Cadastrar_discos from './routes/Cadastrar_discos.jsx'

const routes = createBrowserRouter([
  {
    path: "/",

    element: <App />,

    // errorElement

    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/cadastrar-discos",
        element: <Cadastrar_discos />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Geral />

    <RouterProvider router={routes} />
  </StrictMode>,
)
