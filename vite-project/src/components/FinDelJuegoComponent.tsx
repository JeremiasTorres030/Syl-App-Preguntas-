import { Link } from 'react-router-dom'

const FinDelJuegoComponent = ({ reiniciar }: { reiniciar: () => void }) => {
  return (
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
  )
}

export default FinDelJuegoComponent
