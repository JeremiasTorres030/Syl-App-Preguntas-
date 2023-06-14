import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='flex items-center gap-3 pr-14'>
        <div className=' bg-[#83a65b] rounded-md text-white text-4xl font-bold p-2'>
          JT
        </div>
        <h1 className='text-5xl font-bold text-[#83a65b]'>Syl</h1>
      </div>
      <h2 className='text-lg'>Seleccione un modo de juego</h2>
      <Link
        to={'/normal'}
        className='rounded-md p-4 text-2xl w-[12rem] text-center text-white font-bold bg-[#c59660] cursor-pointer hover:underline'
      >
        Normal
      </Link>
      <Link
        to={'/infinito'}
        className='rounded-md p-4 text-2xl w-[12rem] text-center text-white font-bold bg-[#6d7ab4] cursor-pointer hover:underline'
      >
        Infinito
      </Link>
      <Link
        to={'/categorias'}
        className='rounded-md p-4 text-2xl w-[12rem] text-center text-white font-bold bg-[#b04237] cursor-pointer hover:underline'
      >
        Categorías
      </Link>
      <Link
        to={'/custom-list'}
        className='rounded-md p-4 text-2xl w-[12rem] text-center text-white font-bold bg-[#83a65b] cursor-pointer hover:underline'
      >
        Personalizado
      </Link>
    </div>
  )
}

export default HomePage
