import { Link } from 'react-router-dom'
import UseCategoriesHook from '../../hooks/CategoriasHook'
import ErrorPage from '../error/ErrorPage'

const CategoriesPage = () => {
  const { categorias, error } = UseCategoriesHook()

  return (
    <>
      {error ? (
        <ErrorPage message='Parece que las categorias no han podido cargar vuelva a intentarlo!' />
      ) : (
        <div className='flex flex-col items-center justify-center gap-4'>
          <h1 className='text-4xl font-semibold'>Categorias</h1>
          <Link
            to={'/'}
            className='rounded-md p-2 text-lg text-center text-white font-bold bg-[#83a65b] cursor-pointer hover:underline'
          >
            Volver
          </Link>
          <div className='grid grid-rows-2 grid-cols-1 gap-4 sm:grid-flow-col'>
            {categorias.map(({ id, nombre }) => {
              return (
                <Link
                  key={id}
                  to={`/categoria/${id}`}
                  className='bg-[#6d7ab4] rounded-md p-4 text-xl text-white font-bold text-center'
                >
                  {nombre}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default CategoriesPage
