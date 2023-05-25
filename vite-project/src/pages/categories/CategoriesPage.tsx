import { Link } from 'react-router-dom'
import UseCategoriesHook from '../../hooks/CategoriasHook'

const CategoriesPage = () => {
  const { categorias } = UseCategoriesHook()

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h1>Categorias</h1>
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
  )
}

export default CategoriesPage
