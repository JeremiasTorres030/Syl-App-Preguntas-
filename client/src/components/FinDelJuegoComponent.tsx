import { Link } from 'react-router-dom'
import { FinDelJuegoProps } from '../types/types'

const FinDelJuegoComponent = ({
  reiniciar,
  victoria,
  continuar,
}: FinDelJuegoProps) => {
  return (
    <>
      {victoria ? (
        <div className='flex items-center justify-center flex-col gap-3'>
          <h1 className='text-4xl font-semibold'>
            Respondiste todas las preguntas!
          </h1>
          <button
            onClick={continuar}
            className='rounded-md p-2 text-2xl text-center text-white font-bold bg-[#c59660] cursor-pointer hover:underline'
          >
            Continuar (Se repetiran las preguntas)
          </button>
          <button
            onClick={reiniciar}
            className='rounded-md p-2 text-2xl text-center text-white font-bold bg-[#6d7ab4] cursor-pointer hover:underline'
          >
            Reiniciar
          </button>
          <Link
            to={'/'}
            className='rounded-md p-2 text-2xl text-center text-white font-bold bg-[#83a65b] cursor-pointer hover:underline'
          >
            Volver
          </Link>
        </div>
      ) : (
        <div className='flex items-center justify-center flex-col gap-3'>
          <h1 className='text-4xl font-semibold'>Fin del juego</h1>
          <button
            onClick={reiniciar}
            className='rounded-md p-2 text-2xl text-center text-white font-bold bg-[#6d7ab4] cursor-pointer hover:underline'
          >
            Reintentar
          </button>
          <Link
            to={'/'}
            className='rounded-md p-2 text-2xl text-center text-white font-bold bg-[#83a65b] cursor-pointer hover:underline'
          >
            Volver
          </Link>
        </div>
      )}
    </>
  )
}

export default FinDelJuegoComponent
