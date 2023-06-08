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
          <h1 className='text-4xl'>Categorias</h1>
          <Link
            to={'/'}
            className='border p-1 rounded-md'
          >
            Volver
          </Link>
          <div className='grid grid-rows-2 grid-cols-1 gap-4 sm:grid-flow-col'>
            {categorias.map(({ id, nombre }) => {
              return (
                <Link
                  key={id}
                  to={`/categoria/${id}`}
                  className='border rounded-md p-4 text-xl text-center'
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
