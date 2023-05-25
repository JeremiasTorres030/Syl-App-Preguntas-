import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../pages/home/HomePage'
import ErrorPage from '../pages/error/ErrorPage'
import GamePage from '../pages/game/GamePage'
import CategoriesPage from '../pages/categories/CategoriesPage'
const Router = () => {
  const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/normal', element: <GamePage mode='normal' /> },
    { path: '/infinito', element: <GamePage mode='infinito' /> },
    { path: '/categoria/:categoriaId', element: <GamePage mode='categoria' /> },
    { path: '/categorias', element: <CategoriesPage /> },
    { path: '*', element: <ErrorPage /> },
  ])

  return <RouterProvider router={router} />
}

export default Router
