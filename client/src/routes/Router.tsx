import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '../pages/home/HomePage'
import ErrorPage from '../pages/error/ErrorPage'
import GamePage from '../pages/game/GamePage'
import CategoriesPage from '../pages/categories/CategoriesPage'
import CustomFormPage from '../pages/custom/CustomFormPage'
import CustomListPage from '../pages/custom/CustomListPage'
const Router = () => {
  const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/normal', element: <GamePage mode='normal' /> },
    { path: '/infinito', element: <GamePage mode='infinito' /> },
    { path: '/custom', element: <GamePage mode='custom' /> },
    { path: '/custom/:customid', element: <GamePage mode='custom' /> },
    { path: '/categoria/:categoriaId', element: <GamePage mode='categoria' /> },
    { path: '/categorias', element: <CategoriesPage /> },
    { path: '/custom-list', element: <CustomListPage /> },
    { path: '/custom-form/', element: <CustomFormPage /> },
    { path: '/custom-form/:listid', element: <CustomFormPage /> },

    {
      path: '*',
      element: (
        <ErrorPage message='Error la pagina que esta buscando no se encuentra.' />
      ),
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
