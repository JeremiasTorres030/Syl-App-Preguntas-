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
          <h1 className='text-3xl'>Respondiste todas las preguntas!</h1>
          <button
            onClick={continuar}
            className='text-xl border p-3 rounded-md'
          >
            Continuar (Se repetiran las preguntas)
          </button>
          <button
            onClick={reiniciar}
            className='text-xl border p-3 rounded-md'
          >
            Reiniciar
          </button>
          <Link
            to={'/'}
            className='text-xl border p-3 rounded-md'
          >
            Volver
          </Link>
        </div>
      ) : (
        <div className='flex items-center justify-center flex-col gap-3'>
          <h1 className='text-3xl'>Fin del juego</h1>
          <button
            onClick={reiniciar}
            className='text-xl border p-3 rounded-md'
          >
            Reintentar
          </button>
          <Link
            to={'/'}
            className='text-xl border p-3 rounded-md'
          >
            Volver
          </Link>
        </div>
      )}
    </>
  )
}

export default FinDelJuegoComponent
