import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl'>Bienvenido</h1>
      <Link
        to={'/normal'}
        className='border rounded-md p-4 text-xl'
      >
        Normal
      </Link>
      <Link
        to={'/infinito'}
        className='border rounded-md p-4 text-xl'
      >
        Infinito
      </Link>
      <Link
        to={'/categorias'}
        className='border rounded-md p-4 text-xl'
      >
        Categorias
      </Link>
    </div>
  )
}

export default HomePage
