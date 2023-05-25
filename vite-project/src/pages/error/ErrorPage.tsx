import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='flex items-center justify-center flex-col gap-3'>
      <h1 className='text-3xl'>
        Error la pagina que esta buscando no se encuentra.
      </h1>
      <Link
        to={'/'}
        className='text-xl border p-3 rounded-md'
      >
        Volver
      </Link>
    </div>
  )
}

export default ErrorPage
