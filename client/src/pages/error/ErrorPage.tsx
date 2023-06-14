import { Link } from 'react-router-dom'
import { ErrorPageProps } from '../../types/types'

const ErrorPage = ({ message }: ErrorPageProps) => {
  return (
    <div className='flex items-center justify-center flex-col gap-3'>
      <h1 className='text-4xl font-semibold'>{message}</h1>
      <Link
        to={'/'}
        className='rounded-md p-2 text-2xl text-center text-white font-bold bg-[#83a65b] cursor-pointer hover:underline'
      >
        Volver
      </Link>
    </div>
  )
}

export default ErrorPage
