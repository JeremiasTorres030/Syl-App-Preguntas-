import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl'>Preguntas</h1>
      <h2>Seleccione un modo de juego</h2>
      <Link
        to={'/normal'}
        className='border rounded-md p-4 text-xl w-40 text-center'
      >
        Normal
      </Link>
      <Link
        to={'/infinito'}
        className='border rounded-md p-4 text-xl w-40 text-center'
      >
        Infinito
      </Link>
      <Link
        to={'/categorias'}
        className='border rounded-md p-4 text-xl w-40 text-center'
      >
        Categorías
      </Link>
      <Link
        to={'/custom-list'}
        className='border rounded-md p-4 text-xl w-40 text-center'
      >
        Personalizado
      </Link>
    </div>
  )
}

export default HomePage
