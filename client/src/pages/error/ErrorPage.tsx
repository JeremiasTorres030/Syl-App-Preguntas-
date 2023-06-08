import { Link } from 'react-router-dom'
import { ErrorPageProps } from '../../types/types'

const ErrorPage = ({ message }: ErrorPageProps) => {
  return (
    <div className='flex items-center justify-center flex-col gap-3'>
      <h1 className='text-3xl'>{message}</h1>
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
